import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import { connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import storage from 'redux-persist/lib/storage';
import storageSession from 'redux-persist/lib/storage/session';

import userReducer from 'reducers/user/userReducer';
import persistedUserReducer from './user/persistedUserReducer';
import loginReducer from './login/loginReducer';
import customerReducer from './customer/customerReducer';
import miscReducer from './misc/miscReducer';
import productReducer from './product/productReducer';
import orderReducer from './order/orderReducer';
import saleReducer from './sale/saleReducer';

const rootPersistConfig = {
  key: 'root',
  storage: storage,
  blacklist: ['user'],
  whitelist: ['user', 'persistedUser'],
};

const temporalUserPersistConfig = {
  key: 'user',
  storage: storageSession,
};
export const history = createBrowserHistory();
//Nested persistors to remember session or not
const rootReducer = combineReducers({
  router: connectRouter(history),
  user: persistReducer(temporalUserPersistConfig, userReducer),
  persistedUser: persistedUserReducer,
  login: loginReducer,
  customer: customerReducer,
  product: productReducer,
  order: orderReducer,
  sale: saleReducer,
  misc: miscReducer,
});
export default persistReducer(rootPersistConfig, rootReducer);
