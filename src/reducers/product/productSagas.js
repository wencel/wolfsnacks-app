import {
  textConstants,
  errorSuccessConstants,
  urlConstants,
} from 'appConstants';
import { userTokenSelector } from 'reducers/user/userSelectors';
import { call, delay, put, select, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import request from 'utils/request';
import { makeErrorMessage } from 'utils/utils';
import {
  failureCreateEditProductAction,
  failureProductsListAction,
  failureDeleteProductAction,
  failureFetchProductAction,
  setProductLoadingAction,
  setProductsLoadingAction,
  setProductsListAction,
  successCreateEditProductAction,
  successProductsListAction,
  successDeleteProductAction,
  successFetchProductAction,
  setPresentationsAction,
  setProductTypesAction,
} from './productActions';

import productConstatns from './productConstants';
import { setSnackbarAction } from 'reducers/misc/miscActions';
import { productsListSelector } from './productSelectors';

function* requestPresentationsSaga() {
  try {
    const data = yield call(request, [urlConstants.product.GET_PRESENTATIONS]);
    yield put(setPresentationsAction(data));
  } catch (e) {
    yield put(setPresentationsAction([]));
  }
}

function* requestProductTypesSaga() {
  try {
    const data = yield call(request, [urlConstants.product.GET_PRODUCT_TYPES]);
    yield put(setProductTypesAction(data));
  } catch (e) {
    yield put(setProductTypesAction([]));
  }
}

function* requestCreateEditProductSaga(action) {
  try {
    yield put(setProductLoadingAction());
    const {
      name,
      presentation,
      weight,
      basePrice,
      sellingPrice,
      _id: id,
    } = action.payload;
    delete action.payload._id;
    if (!(name && presentation && weight && basePrice && sellingPrice) && !id) {
      //Wait 10 ms so the state of the reducer wil reset and show the error
      yield delay(10);
      yield put(
        setSnackbarAction(
          `${errorSuccessConstants.MANDATORY_FIELDS} ${textConstants.product.NAME}, ${textConstants.product.PRESENTATION}, ${textConstants.product.WEIGHT}, ${textConstants.product.BASE_PRICE} y ${textConstants.product.SELLING_PRICE}`
        )
      );
      yield put(failureCreateEditProductAction());
      return;
    }
    const userToken = yield select(userTokenSelector);
    const product = yield call(
      request,
      id
        ? `${urlConstants.product.PRODUCT_URL}/${id}`
        : urlConstants.product.PRODUCT_URL,
      {
        method: id ? 'PATCH' : 'POST',
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      },
      action.payload
    );
    if (!product) {
      yield put(setSnackbarAction(makeErrorMessage()));
      yield put(failureCreateEditProductAction());
    } else if (product.error) {
      yield put(setSnackbarAction(makeErrorMessage(product.error)));
      yield put(failureCreateEditProductAction());
    } else {
      yield put(setSnackbarAction(errorSuccessConstants.SAVED_PRODUCT));
      yield put(successCreateEditProductAction(product));
      yield put(push(`/products/${product._id}`));
    }
  } catch (e) {
    yield put(setSnackbarAction(makeErrorMessage(e)));
    yield put(failureCreateEditProductAction());
  }
}

function* requestProductsListSaga(action) {
  console.log(action);
  try {
    yield put(setProductsLoadingAction());
    const userToken = yield select(userTokenSelector);
    const queryParams = Object.entries(action.payload).reduce(
      (accumulator, q) => {
        if (q[1]) return `${accumulator}${q[0]}=${q[1]}&`;
        return accumulator;
      },
      '?'
    );
    const products = yield call(
      request,
      urlConstants.product.PRODUCT_URL + queryParams,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    if (!products) {
      yield put(setSnackbarAction(makeErrorMessage()));
      yield put(failureProductsListAction());
    } else if (products.error) {
      yield put(setSnackbarAction(makeErrorMessage(products.error)));
      yield put(failureProductsListAction());
    } else {
      yield put(successProductsListAction(products));
    }
  } catch (e) {
    yield put(setSnackbarAction(makeErrorMessage(e)));
    yield put(failureProductsListAction());
  }
}

function* requestFetchProductSaga(action) {
  try {
    yield put(setProductLoadingAction());
    const id = action.payload;
    const userToken = yield select(userTokenSelector);
    const product = yield call(
      request,
      `${urlConstants.product.PRODUCT_URL}/${id}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    if (!product) {
      yield put(setSnackbarAction(makeErrorMessage()));
      yield put(failureFetchProductAction());
    } else if (product.error) {
      yield put(setSnackbarAction(makeErrorMessage(product.error)));
      yield put(failureFetchProductAction());
    } else {
      yield put(successFetchProductAction(product));
    }
  } catch (e) {
    yield put(setSnackbarAction(makeErrorMessage(e)));
    yield put(failureFetchProductAction());
  }
}

function* requestDeleteProductSaga(action) {
  try {
    yield put(setProductLoadingAction());
    const id = action.payload;
    const userToken = yield select(userTokenSelector);
    const product = yield call(
      request,
      `${urlConstants.product.PRODUCT_URL}/${id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    if (!product) {
      yield put(setSnackbarAction(makeErrorMessage()));
      yield put(failureDeleteProductAction());
    } else if (product.error) {
      yield put(setSnackbarAction(makeErrorMessage(product.error)));
      yield put(failureDeleteProductAction());
    } else {
      const products = yield select(productsListSelector);

      yield put(
        setSnackbarAction(
          makeErrorMessage(textConstants.productPage.DELETE_SUCCESS)
        )
      );
      yield put(successDeleteProductAction());
      yield put(setProductsListAction(products.filter(c => c._id !== id)));
      yield put(push(`/products`));
    }
  } catch (e) {
    yield put(setSnackbarAction(makeErrorMessage(e)));
    yield put(failureDeleteProductAction());
  }
}

export default function* productSagas() {
  yield takeLatest(
    productConstatns.REQUEST_PRESENTATIONS,
    requestPresentationsSaga
  );
  yield takeLatest(
    productConstatns.REQUEST_PRODUCT_TYPES,
    requestProductTypesSaga
  );
  yield takeLatest(
    productConstatns.REQUEST_CREATE_EDIT_PRODUCT,
    requestCreateEditProductSaga
  );
  yield takeLatest(
    productConstatns.REQUEST_PRODUCTS_LIST,
    requestProductsListSaga
  );
  yield takeLatest(
    productConstatns.REQUEST_FETCH_PRODUCT,
    requestFetchProductSaga
  );
  yield takeLatest(
    productConstatns.REQUEST_DELETE_PRODUCT,
    requestDeleteProductSaga
  );
}
