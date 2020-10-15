import saleConstants from './saleConstants';

export const requestPresentationsAction = () => ({
  type: saleConstants.REQUEST_PRESENTATIONS,
});
export const setPresentationsAction = payload => ({
  type: saleConstants.SET_PRESENTATIONS,
  payload,
});
export const requestSaleTypesAction = () => ({
  type: saleConstants.REQUEST_SALE_TYPES,
});
export const setSaleTypesAction = payload => ({
  type: saleConstants.SET_SALE_TYPES,
  payload,
});
export const requestCreateEditSaleAction = payload => ({
  type: saleConstants.REQUEST_CREATE_EDIT_SALE,
  payload,
});
export const successCreateEditSaleAction = sale => ({
  type: saleConstants.SUCCESS_CREATE_EDIT_SALE,
  payload: sale,
});
export const failureCreateEditSaleAction = () => ({
  type: saleConstants.FAILURE_CREATE_EDIT_SALE,
});
export const requestSalesListAction = payload => ({
  type: saleConstants.REQUEST_SALES_LIST,
  payload,
});
export const resetSalesListAction = () => ({
  type: saleConstants.RESET_SALES_LIST,
});
export const setSalesListAction = payload => ({
  type: saleConstants.SET_SALES_LIST,
  payload,
});
export const successSalesListAction = sales => ({
  type: saleConstants.SUCCESS_SALES_LIST,
  payload: sales,
});
export const failureSalesListAction = error => ({
  type: saleConstants.FAILURE_SALES_LIST,
  payload: error,
});
export const requestFetchSaleAction = payload => ({
  type: saleConstants.REQUEST_FETCH_SALE,
  payload,
});
export const successFetchSaleAction = sale => ({
  type: saleConstants.SUCCESS_FETCH_SALE,
  payload: sale,
});
export const failureFetchSaleAction = error => ({
  type: saleConstants.FAILURE_FETCH_SALE,
  payload: error,
});
export const requestDeleteSaleAction = payload => ({
  type: saleConstants.REQUEST_DELETE_SALE,
  payload,
});
export const successDeleteSaleAction = sale => ({
  type: saleConstants.SUCCESS_DELETE_SALE,
  payload: sale,
});
export const failureDeleteSaleAction = error => ({
  type: saleConstants.FAILURE_DELETE_SALE,
  payload: error,
});
export const resetSaleAction = () => ({
  type: saleConstants.RESET_SALE,
});
export const setSaleLoadingAction = () => ({
  type: saleConstants.SET_SALE_LOADING,
});
export const setSalesLoadingAction = () => ({
  type: saleConstants.SET_SALES_LOADING,
});
