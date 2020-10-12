import miscConstants from "./miscConstants";

const initState = {
  message: "",
};

export const miscReducer = function (state = initState, action) {
  switch (action.type) {
    case miscConstants.SET_SNACKBAR:
      return {
        ...state,
        message: action.payload,
      };
    case miscConstants.RESET_SNACKBAR:
      return {
        ...state,
        message: "",
      };
    default:
      return state;
  }
};

export default miscReducer;
