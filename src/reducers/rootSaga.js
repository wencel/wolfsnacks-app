import { all } from 'redux-saga/effects';
import customerSagas from './customer/customerSagas';
import loginSagas from './login/loginSagas';
import orderSagas from './order/orderSagas';
import productSagas from './product/productSagas';
import saleSagas from './sale/saleSagas';

export default function* rootSaga() {
  yield all([
    loginSagas(),
    customerSagas(),
    productSagas(),
    orderSagas(),
    saleSagas(),
  ]);
}
