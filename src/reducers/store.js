import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore } from 'redux-persist';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import rootReducer, { history } from './rootReducer';
import rootSaga from './rootSaga';
import logger from 'redux-logger';

const sagaMiddleware = createSagaMiddleware();
// mount it on the Store
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let applyMid;
if (process.env.NODE_ENV === 'development') {
  applyMid = applyMiddleware(sagaMiddleware, routerMiddleware(history), logger);
} else {
  applyMid = applyMiddleware(sagaMiddleware, routerMiddleware(history));
}

export const store = createStore(rootReducer, composeEnhancers(applyMid));

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);
