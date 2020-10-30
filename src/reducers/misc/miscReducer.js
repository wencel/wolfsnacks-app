import miscConstants from './miscConstants';

const initState = {
  message: '',
  activeTab: '',
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
        message: '',
      };
    case miscConstants.SET_ACTIVE_TAB:
      return {
        ...state,
        activeTab: action.payload,
      };
    default:
      return state;
  }
};

export default miscReducer;
