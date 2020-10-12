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
  failureCreateEditOrderAction,
  failureOrdersListAction,
  failureDeleteOrderAction,
  failureFetchOrderAction,
  setOrderLoadingAction,
  setOrdersLoadingAction,
  setOrdersListAction,
  successCreateEditOrderAction,
  successOrdersListAction,
  successDeleteOrderAction,
  successFetchOrderAction,
} from './orderActions';

import orderConstatns from './orderConstants';
import { setSnackbarAction } from 'reducers/misc/miscActions';
import { ordersListSelector } from './orderSelectors';

function* requestCreateEditOrderSaga(action) {
  try {
    yield put(setOrderLoadingAction());
    const { totalPrice, products, _id: id } = action.payload;
    delete action.payload._id;
    if ((!totalPrice && Number.isNaN(totalPrice)) || !products) {
      //Wait 10 ms so the state of the reducer wil reset and show the error
      yield delay(10);
      yield put(
        setSnackbarAction(
          `${errorSuccessConstants.MANDATORY_FIELDS} ${textConstants.order.TOTAL_PRICE}, ${textConstants.order.PRODUCTS}`
        )
      );
      yield put(failureCreateEditOrderAction());
      return;
    }
    if (products.length === 0) {
      //Wait 10 ms so the state of the reducer wil reset and show the error
      yield delay(10);
      yield put(setSnackbarAction(errorSuccessConstants.NO_EMPTY_PRODUCTS));
      yield put(failureCreateEditOrderAction());
      return;
    }
    let noProductError = false;
    let noQuantityError = false;
    products.forEach(product => {
      if (!product.product) noProductError = true;
      if (!product.quantity) noQuantityError = true;
    });
    if (noProductError) {
      //Wait 10 ms so the state of the reducer wil reset and show the error
      yield delay(10);
      yield put(setSnackbarAction(errorSuccessConstants.NO_PRODUCT));
      yield put(failureCreateEditOrderAction());
      return;
    }
    if (noQuantityError) {
      //Wait 10 ms so the state of the reducer wil reset and show the error
      yield delay(10);
      yield put(setSnackbarAction(errorSuccessConstants.NO_QUANTITY));
      yield put(failureCreateEditOrderAction());
      return;
    }
    const userToken = yield select(userTokenSelector);
    const order = yield call(
      request,
      id
        ? `${urlConstants.order.ORDER_URL}/${id}`
        : urlConstants.order.ORDER_URL,
      {
        method: id ? 'PATCH' : 'POST',
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      },
      action.payload
    );
    if (!order) {
      yield put(setSnackbarAction(makeErrorMessage()));
      yield put(failureCreateEditOrderAction());
    } else if (order.error) {
      yield put(setSnackbarAction(makeErrorMessage(order.error)));
      yield put(failureCreateEditOrderAction());
    } else {
      yield put(setSnackbarAction(errorSuccessConstants.SAVED_ORDER));
      yield put(successCreateEditOrderAction(order));
      yield put(push(`/orders/${order._id}`));
    }
  } catch (e) {
    yield put(setSnackbarAction(makeErrorMessage(e)));
    yield put(failureCreateEditOrderAction());
  }
}

function* requestOrdersListSaga(action) {
  try {
    yield put(setOrdersLoadingAction());
    const userToken = yield select(userTokenSelector);
    const queryParams = Object.entries(action.payload).reduce(
      (accumulator, q) => {
        if (q[1]) return `${accumulator}${q[0]}=${q[1]}&`;
        return accumulator;
      },
      '?'
    );
    const orders = yield call(
      request,
      urlConstants.order.ORDER_URL + queryParams,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    if (!orders) {
      yield put(setSnackbarAction(makeErrorMessage()));
      yield put(failureOrdersListAction());
    } else if (orders.error) {
      yield put(setSnackbarAction(makeErrorMessage(orders.error)));
      yield put(failureOrdersListAction());
    } else {
      yield put(successOrdersListAction(orders));
    }
  } catch (e) {
    yield put(setSnackbarAction(makeErrorMessage(e)));
    yield put(failureOrdersListAction());
  }
}

function* requestFetchOrderSaga(action) {
  try {
    yield put(setOrderLoadingAction());
    const id = action.payload;
    const userToken = yield select(userTokenSelector);
    const order = yield call(request, `${urlConstants.order.ORDER_URL}/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    if (!order) {
      yield put(setSnackbarAction(makeErrorMessage()));
      yield put(failureFetchOrderAction());
    } else if (order.error) {
      yield put(setSnackbarAction(makeErrorMessage(order.error)));
      yield put(failureFetchOrderAction());
    } else {
      yield put(successFetchOrderAction(order));
    }
  } catch (e) {
    yield put(setSnackbarAction(makeErrorMessage(e)));
    yield put(failureFetchOrderAction());
  }
}

function* requestDeleteOrderSaga(action) {
  try {
    yield put(setOrderLoadingAction());
    const id = action.payload;
    const userToken = yield select(userTokenSelector);
    const order = yield call(request, `${urlConstants.order.ORDER_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    if (!order) {
      yield put(setSnackbarAction(makeErrorMessage()));
      yield put(failureDeleteOrderAction());
    } else if (order.error) {
      yield put(setSnackbarAction(makeErrorMessage(order.error)));
      yield put(failureDeleteOrderAction());
    } else {
      const orders = yield select(ordersListSelector);

      yield put(
        setSnackbarAction(
          makeErrorMessage(textConstants.orderPage.DELETE_SUCCESS)
        )
      );
      yield put(successDeleteOrderAction());
      yield put(setOrdersListAction(orders.filter(c => c._id !== id)));
      yield put(push(`/orders`));
    }
  } catch (e) {
    yield put(setSnackbarAction(makeErrorMessage(e)));
    yield put(failureDeleteOrderAction());
  }
}

export default function* orderSagas() {
  yield takeLatest(
    orderConstatns.REQUEST_CREATE_EDIT_ORDER,
    requestCreateEditOrderSaga
  );
  yield takeLatest(orderConstatns.REQUEST_ORDERS_LIST, requestOrdersListSaga);
  yield takeLatest(orderConstatns.REQUEST_FETCH_ORDER, requestFetchOrderSaga);
  yield takeLatest(orderConstatns.REQUEST_DELETE_ORDER, requestDeleteOrderSaga);
}
