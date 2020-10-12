import customerConstants from './customerConstants';

export const requestLocalitiesAction = () => ({
  type: customerConstants.REQUEST_LOCALITIES,
});
export const setLocalitiesAction = payload => ({
  type: customerConstants.SET_LOCALITIES,
  payload,
});
export const requestCreateEditCustomerAction = payload => ({
  type: customerConstants.REQUEST_CREATE_EDIT_CUSTOMER,
  payload,
});
export const successCreateEditCustomerAction = customer => ({
  type: customerConstants.SUCCESS_CREATE_EDIT_CUSTOMER,
  payload: customer,
});
export const failureCreateEditCustomerAction = () => ({
  type: customerConstants.FAILURE_CREATE_EDIT_CUSTOMER,
});
export const requestCustomersListAction = payload => ({
  type: customerConstants.REQUEST_CUSTOMERS_LIST,
  payload,
});
export const resetCustomersListAction = () => ({
  type: customerConstants.RESET_CUSTOMERS_LIST,
});
export const setCustomersListAction = payload => ({
  type: customerConstants.SET_CUSTOMERS_LIST,
  payload,
});
export const successCustomersListAction = customers => ({
  type: customerConstants.SUCCESS_CUSTOMERS_LIST,
  payload: customers,
});
export const failureCustomersListAction = error => ({
  type: customerConstants.FAILURE_CUSTOMERS_LIST,
  payload: error,
});
export const requestFetchCustomerAction = payload => ({
  type: customerConstants.REQUEST_FETCH_CUSTOMER,
  payload,
});
export const successFetchCustomerAction = customer => ({
  type: customerConstants.SUCCESS_FETCH_CUSTOMER,
  payload: customer,
});
export const failureFetchCustomerAction = error => ({
  type: customerConstants.FAILURE_FETCH_CUSTOMER,
  payload: error,
});
export const requestDeleteCustomerAction = payload => ({
  type: customerConstants.REQUEST_DELETE_CUSTOMER,
  payload,
});
export const successDeleteCustomerAction = customer => ({
  type: customerConstants.SUCCESS_DELETE_CUSTOMER,
  payload: customer,
});
export const failureDeleteCustomerAction = error => ({
  type: customerConstants.FAILURE_DELETE_CUSTOMER,
  payload: error,
});
export const resetCustomerAction = () => ({
  type: customerConstants.RESET_CUSTOMER,
});
export const setCustomerLoadingAction = () => ({
  type: customerConstants.SET_CUSTOMER_LOADING,
});
export const setCustomersLoadingAction = () => ({
  type: customerConstants.SET_CUSTOMERS_LOADING,
});
