import { all } from 'redux-saga/effects';
import customerSagas from './customer/customerSagas';
import loginSagas from './login/loginSagas';
import orderSagas from './order/orderSagas';
import productSagas from './product/productSagas';

export default function* rootSaga() {
  yield all([loginSagas(), customerSagas(), productSagas(), orderSagas()]);
}
