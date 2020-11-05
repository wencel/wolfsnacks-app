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
  failureCreateEditSaleAction,
  failureSalesListAction,
  failureDeleteSaleAction,
  failureFetchSaleAction,
  setSaleLoadingAction,
  setSalesLoadingAction,
  setSalesListAction,
  successCreateEditSaleAction,
  successSalesListAction,
  successDeleteSaleAction,
  successFetchSaleAction,
} from './saleActions';

import saleConstatns from './saleConstants';
import { setSnackbarAction } from 'reducers/misc/miscActions';
import { salesListSelector } from './saleSelectors';

function* requestCreateEditSaleSaga(action) {
  try {
    yield put(setSaleLoadingAction());
    const {
      isThirteenDozen,
      owes,
      partialPayment,
      customer,
      totalPrice,
      products,
      _id: id,
    } = action.payload;
    delete action.payload._id;
    if (
      (!totalPrice && Number.isNaN(totalPrice)) ||
      (!partialPayment && Number.isNaN(partialPayment)) ||
      !products ||
      typeof isThirteenDozen !== 'boolean' ||
      typeof owes !== 'boolean' ||
      !customer
    ) {
      //Wait 10 ms so the state of the reducer wil reset and show the error
      yield delay(10);
      yield put(
        setSnackbarAction(
          `${errorSuccessConstants.MANDATORY_FIELDS} ${textConstants.sale.TOTAL_PRICE}, ${textConstants.sale.PRODUCTS}, ${textConstants.sale.PARTIAL_PAYMENT}, ${textConstants.sale.CUSTOMER}`
        )
      );
      yield put(failureCreateEditSaleAction());
      return;
    }
    if (products.length === 0) {
      //Wait 10 ms so the state of the reducer wil reset and show the error
      yield delay(10);
      yield put(setSnackbarAction(errorSuccessConstants.NO_EMPTY_PRODUCTS));
      yield put(failureCreateEditSaleAction());
      return;
    }
    let noProductError = false;
    let noQuantityError = false;
    let noDuplicatedError = false;
    products.forEach(product => {
      if (!product.product) noProductError = true;
      if (!product.quantity) noQuantityError = true;
      const duplicatedProducts = products.filter(
        p => p.product === product.product
      );
      if (duplicatedProducts.length > 1) noDuplicatedError = true;
    });
    if (noProductError) {
      //Wait 10 ms so the state of the reducer wil reset and show the error
      yield delay(10);
      yield put(setSnackbarAction(errorSuccessConstants.NO_PRODUCT));
      yield put(failureCreateEditSaleAction());
      return;
    }
    if (noQuantityError) {
      //Wait 10 ms so the state of the reducer wil reset and show the error
      yield delay(10);
      yield put(setSnackbarAction(errorSuccessConstants.NO_QUANTITY));
      yield put(failureCreateEditSaleAction());
      return;
    }
    if (noDuplicatedError) {
      //Wait 10 ms so the state of the reducer wil reset and show the error
      yield delay(10);
      yield put(
        setSnackbarAction(errorSuccessConstants.NO_DUPLICATED_PRODUCTS)
      );
      yield put(failureCreateEditSaleAction());
      return;
    }
    const userToken = yield select(userTokenSelector);
    const sale = yield call(
      request,
      id ? `${urlConstants.sale.SALE_URL}/${id}` : urlConstants.sale.SALE_URL,
      {
        method: id ? 'PATCH' : 'POST',
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      },
      action.payload
    );
    if (!sale) {
      yield put(setSnackbarAction(makeErrorMessage()));
      yield put(failureCreateEditSaleAction());
    } else if (sale.error) {
      yield put(setSnackbarAction(makeErrorMessage(sale.error)));
      yield put(failureCreateEditSaleAction());
    } else {
      yield put(setSnackbarAction(errorSuccessConstants.SAVED_SALE));
      yield put(successCreateEditSaleAction(sale));
      yield put(push(`/sales/${sale._id}`));
    }
  } catch (e) {
    yield put(setSnackbarAction(makeErrorMessage(e)));
    yield put(failureCreateEditSaleAction());
  }
}

function* requestSalesListSaga(action) {
  try {
    yield put(setSalesLoadingAction());
    const userToken = yield select(userTokenSelector);
    const queryParams = Object.entries(action.payload).reduce(
      (accumulator, q) => {
        if (q[1] || typeof q[1] === 'boolean')
          return `${accumulator}${q[0]}=${q[1]}&`;
        return accumulator;
      },
      '?'
    );
    const sales = yield call(
      request,
      urlConstants.sale.SALE_URL + queryParams,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    if (!sales) {
      yield put(setSnackbarAction(makeErrorMessage()));
      yield put(failureSalesListAction());
    } else if (sales.error) {
      yield put(setSnackbarAction(makeErrorMessage(sales.error)));
      yield put(failureSalesListAction());
    } else {
      yield put(successSalesListAction(sales));
    }
  } catch (e) {
    yield put(setSnackbarAction(makeErrorMessage(e)));
    yield put(failureSalesListAction());
  }
}

function* requestFetchSaleSaga(action) {
  try {
    yield put(setSaleLoadingAction());
    const id = action.payload;
    const userToken = yield select(userTokenSelector);
    const sale = yield call(request, `${urlConstants.sale.SALE_URL}/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    if (!sale) {
      yield put(setSnackbarAction(makeErrorMessage()));
      yield put(failureFetchSaleAction());
    } else if (sale.error) {
      yield put(setSnackbarAction(makeErrorMessage(sale.error)));
      yield put(failureFetchSaleAction());
    } else {
      yield put(successFetchSaleAction(sale));
    }
  } catch (e) {
    yield put(setSnackbarAction(makeErrorMessage(e)));
    yield put(failureFetchSaleAction());
  }
}

function* requestDeleteSaleSaga(action) {
  try {
    yield put(setSaleLoadingAction());
    const id = action.payload;
    const userToken = yield select(userTokenSelector);
    const sale = yield call(request, `${urlConstants.sale.SALE_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    if (!sale) {
      yield put(setSnackbarAction(makeErrorMessage()));
      yield put(failureDeleteSaleAction());
    } else if (sale.error) {
      yield put(setSnackbarAction(makeErrorMessage(sale.error)));
      yield put(failureDeleteSaleAction());
    } else {
      const sales = yield select(salesListSelector);

      yield put(
        setSnackbarAction(
          makeErrorMessage(textConstants.salePage.DELETE_SUCCESS)
        )
      );
      yield put(successDeleteSaleAction());
      yield put(setSalesListAction(sales.filter(c => c._id !== id)));
      yield put(push(`/sales`));
    }
  } catch (e) {
    yield put(setSnackbarAction(makeErrorMessage(e)));
    yield put(failureDeleteSaleAction());
  }
}

export default function* saleSagas() {
  yield takeLatest(
    saleConstatns.REQUEST_CREATE_EDIT_SALE,
    requestCreateEditSaleSaga
  );
  yield takeLatest(saleConstatns.REQUEST_SALES_LIST, requestSalesListSaga);
  yield takeLatest(saleConstatns.REQUEST_FETCH_SALE, requestFetchSaleSaga);
  yield takeLatest(saleConstatns.REQUEST_DELETE_SALE, requestDeleteSaleSaga);
}
