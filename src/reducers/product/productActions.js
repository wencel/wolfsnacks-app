import productConstants from './productConstants';

export const requestPresentationsAction = () => ({
  type: productConstants.REQUEST_PRESENTATIONS,
});
export const setPresentationsAction = payload => ({
  type: productConstants.SET_PRESENTATIONS,
  payload,
});
export const requestProductTypesAction = () => ({
  type: productConstants.REQUEST_PRODUCT_TYPES,
});
export const setProductTypesAction = payload => ({
  type: productConstants.SET_PRODUCT_TYPES,
  payload,
});
export const requestCreateEditProductAction = payload => ({
  type: productConstants.REQUEST_CREATE_EDIT_PRODUCT,
  payload,
});
export const successCreateEditProductAction = product => ({
  type: productConstants.SUCCESS_CREATE_EDIT_PRODUCT,
  payload: product,
});
export const failureCreateEditProductAction = () => ({
  type: productConstants.FAILURE_CREATE_EDIT_PRODUCT,
});
export const requestProductsListAction = payload => ({
  type: productConstants.REQUEST_PRODUCTS_LIST,
  payload,
});
export const resetProductsListAction = () => ({
  type: productConstants.RESET_PRODUCTS_LIST,
});
export const setProductsListAction = payload => ({
  type: productConstants.SET_PRODUCTS_LIST,
  payload,
});
export const successProductsListAction = products => ({
  type: productConstants.SUCCESS_PRODUCTS_LIST,
  payload: products,
});
export const failureProductsListAction = error => ({
  type: productConstants.FAILURE_PRODUCTS_LIST,
  payload: error,
});
export const requestFetchProductAction = payload => ({
  type: productConstants.REQUEST_FETCH_PRODUCT,
  payload,
});
export const successFetchProductAction = product => ({
  type: productConstants.SUCCESS_FETCH_PRODUCT,
  payload: product,
});
export const failureFetchProductAction = error => ({
  type: productConstants.FAILURE_FETCH_PRODUCT,
  payload: error,
});
export const requestDeleteProductAction = payload => ({
  type: productConstants.REQUEST_DELETE_PRODUCT,
  payload,
});
export const successDeleteProductAction = product => ({
  type: productConstants.SUCCESS_DELETE_PRODUCT,
  payload: product,
});
export const failureDeleteProductAction = error => ({
  type: productConstants.FAILURE_DELETE_PRODUCT,
  payload: error,
});
export const resetProductAction = () => ({
  type: productConstants.RESET_PRODUCT,
});
export const setProductLoadingAction = () => ({
  type: productConstants.SET_PRODUCT_LOADING,
});
export const setProductsLoadingAction = () => ({
  type: productConstants.SET_PRODUCTS_LOADING,
});
