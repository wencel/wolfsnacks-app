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
  failureCreateEditCustomerAction,
  failureCustomersListAction,
  failureDeleteCustomerAction,
  failureFetchCustomerAction,
  setCustomerLoadingAction,
  setCustomersLoadingAction,
  setCustomersListAction,
  setLocalitiesAction,
  successCreateEditCustomerAction,
  successCustomersListAction,
  successDeleteCustomerAction,
  successFetchCustomerAction,
} from './customerActions';

import customerConstatns from './customerConstants';
import { setSnackbarAction } from 'reducers/misc/miscActions';
import { customersListSelector } from './customerSelectors';

function* requestLocalitiesSaga() {
  try {
    const data = yield call(request, [urlConstants.customer.GET_LOCALITIES]);
    yield put(setLocalitiesAction(data));
  } catch (e) {
    yield put(setLocalitiesAction([]));
  }
}

function* requestCreateEditCustomerSaga(action) {
  try {
    yield put(setCustomerLoadingAction());
    const { storeName, address, phoneNumber, _id: id } = action.payload;
    delete action.payload._id;
    if (!(storeName && address && phoneNumber) && !id) {
      //Wait 10 ms so the state of the reducer wil reset and show the error
      yield delay(10);
      yield put(
        setSnackbarAction(
          `${errorSuccessConstants.MANDATORY_FIELDS} ${textConstants.customer.STORE_NAME}, ${textConstants.customer.PHONE_NUMBER} y ${textConstants.customer.ADDRESS}`
        )
      );
      yield put(failureCreateEditCustomerAction());
      return;
    }
    const userToken = yield select(userTokenSelector);
    const customer = yield call(
      request,
      id
        ? `${urlConstants.customer.CUSTOMER_URL}/${id}`
        : urlConstants.customer.CUSTOMER_URL,
      {
        method: id ? 'PATCH' : 'POST',
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      },
      action.payload
    );
    if (!customer) {
      yield put(setSnackbarAction(makeErrorMessage()));
      yield put(failureCreateEditCustomerAction());
    } else if (customer.error) {
      yield put(setSnackbarAction(makeErrorMessage(customer.error)));
      yield put(failureCreateEditCustomerAction());
    } else {
      yield put(setSnackbarAction(errorSuccessConstants.SAVED_CUSTOMER));
      yield put(successCreateEditCustomerAction(customer));
      yield put(push(`/customers/${customer._id}`));
    }
  } catch (e) {
    yield put(setSnackbarAction(makeErrorMessage(e)));
    yield put(failureCreateEditCustomerAction());
  }
}

function* requestCustomersListSaga(action) {
  try {
    yield put(setCustomersLoadingAction());
    const userToken = yield select(userTokenSelector);
    const queryParams = Object.entries(action.payload).reduce(
      (accumulator, q) => {
        if (q[1]) return `${accumulator}${q[0]}=${q[1]}&`;
        return accumulator;
      },
      '?'
    );
    const customers = yield call(
      request,
      urlConstants.customer.CUSTOMER_URL + queryParams,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    if (!customers) {
      yield put(setSnackbarAction(makeErrorMessage()));
      yield put(failureCustomersListAction());
    } else if (customers.error) {
      yield put(setSnackbarAction(makeErrorMessage(customers.error)));
      yield put(failureCustomersListAction());
    } else {
      yield put(successCustomersListAction(customers));
    }
  } catch (e) {
    yield put(setSnackbarAction(makeErrorMessage(e)));
    yield put(failureCustomersListAction());
  }
}

function* requestFetchCustomerSaga(action) {
  try {
    yield put(setCustomerLoadingAction());
    const id = action.payload;
    const userToken = yield select(userTokenSelector);
    const customer = yield call(
      request,
      `${urlConstants.customer.CUSTOMER_URL}/${id}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    if (!customer) {
      yield put(setSnackbarAction(makeErrorMessage()));
      yield put(failureFetchCustomerAction());
    } else if (customer.error) {
      yield put(setSnackbarAction(makeErrorMessage(customer.error)));
      yield put(failureFetchCustomerAction());
    } else {
      yield put(successFetchCustomerAction(customer));
    }
  } catch (e) {
    yield put(setSnackbarAction(makeErrorMessage(e)));
    yield put(failureFetchCustomerAction());
  }
}

function* requestDeleteCustomerSaga(action) {
  try {
    yield put(setCustomerLoadingAction());
    const id = action.payload;
    const userToken = yield select(userTokenSelector);
    const customer = yield call(
      request,
      `${urlConstants.customer.CUSTOMER_URL}/${id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    if (!customer) {
      yield put(setSnackbarAction(makeErrorMessage()));
      yield put(failureDeleteCustomerAction());
    } else if (customer.error) {
      yield put(setSnackbarAction(makeErrorMessage(customer.error)));
      yield put(failureDeleteCustomerAction());
    } else {
      const customers = yield select(customersListSelector);

      yield put(
        setSnackbarAction(
          makeErrorMessage(textConstants.customerPage.DELETE_SUCCESS)
        )
      );
      yield put(successDeleteCustomerAction());
      yield put(setCustomersListAction(customers.filter(c => c._id !== id)));
      yield put(push(`/customers`));
    }
  } catch (e) {
    yield put(setSnackbarAction(makeErrorMessage(e)));
    yield put(failureDeleteCustomerAction());
  }
}

export default function* customerSagas() {
  yield takeLatest(customerConstatns.REQUEST_LOCALITIES, requestLocalitiesSaga);
  yield takeLatest(
    customerConstatns.REQUEST_CREATE_EDIT_CUSTOMER,
    requestCreateEditCustomerSaga
  );
  yield takeLatest(
    customerConstatns.REQUEST_CUSTOMERS_LIST,
    requestCustomersListSaga
  );
  yield takeLatest(
    customerConstatns.REQUEST_FETCH_CUSTOMER,
    requestFetchCustomerSaga
  );
  yield takeLatest(
    customerConstatns.REQUEST_DELETE_CUSTOMER,
    requestDeleteCustomerSaga
  );
}
