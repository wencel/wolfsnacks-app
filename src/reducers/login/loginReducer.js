import loginConstants from "./loginConstants";

const initState = {
  loading: false,
};

export const loginReducer = function (state = initState, action) {
  switch (action.type) {
    case loginConstants.SET_LOGIN_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

export default loginReducer;
