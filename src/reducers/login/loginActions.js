import loginConstants from "./loginConstants";

export const loginRequestAction = payload => ({
  type: loginConstants.LOGIN_REQUEST,
  payload,
});
export const logoutRequestAction = () => ({
  type: loginConstants.LOGOUT_REQUEST,
});
export const setLoginLoadingAction = payload => ({
  type: loginConstants.SET_LOGIN_LOADING,
  payload,
});
