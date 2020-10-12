import orderConstants from './orderConstants';

export const requestPresentationsAction = () => ({
  type: orderConstants.REQUEST_PRESENTATIONS,
});
export const setPresentationsAction = payload => ({
  type: orderConstants.SET_PRESENTATIONS,
  payload,
});
export const requestOrderTypesAction = () => ({
  type: orderConstants.REQUEST_ORDER_TYPES,
});
export const setOrderTypesAction = payload => ({
  type: orderConstants.SET_ORDER_TYPES,
  payload,
});
export const requestCreateEditOrderAction = payload => ({
  type: orderConstants.REQUEST_CREATE_EDIT_ORDER,
  payload,
});
export const successCreateEditOrderAction = order => ({
  type: orderConstants.SUCCESS_CREATE_EDIT_ORDER,
  payload: order,
});
export const failureCreateEditOrderAction = () => ({
  type: orderConstants.FAILURE_CREATE_EDIT_ORDER,
});
export const requestOrdersListAction = payload => ({
  type: orderConstants.REQUEST_ORDERS_LIST,
  payload,
});
export const resetOrdersListAction = () => ({
  type: orderConstants.RESET_ORDERS_LIST,
});
export const setOrdersListAction = payload => ({
  type: orderConstants.SET_ORDERS_LIST,
  payload,
});
export const successOrdersListAction = orders => ({
  type: orderConstants.SUCCESS_ORDERS_LIST,
  payload: orders,
});
export const failureOrdersListAction = error => ({
  type: orderConstants.FAILURE_ORDERS_LIST,
  payload: error,
});
export const requestFetchOrderAction = payload => ({
  type: orderConstants.REQUEST_FETCH_ORDER,
  payload,
});
export const successFetchOrderAction = order => ({
  type: orderConstants.SUCCESS_FETCH_ORDER,
  payload: order,
});
export const failureFetchOrderAction = error => ({
  type: orderConstants.FAILURE_FETCH_ORDER,
  payload: error,
});
export const requestDeleteOrderAction = payload => ({
  type: orderConstants.REQUEST_DELETE_ORDER,
  payload,
});
export const successDeleteOrderAction = order => ({
  type: orderConstants.SUCCESS_DELETE_ORDER,
  payload: order,
});
export const failureDeleteOrderAction = error => ({
  type: orderConstants.FAILURE_DELETE_ORDER,
  payload: error,
});
export const resetOrderAction = () => ({
  type: orderConstants.RESET_ORDER,
});
export const setOrderLoadingAction = () => ({
  type: orderConstants.SET_ORDER_LOADING,
});
export const setOrdersLoadingAction = () => ({
  type: orderConstants.SET_ORDERS_LOADING,
});
