import { textConstants } from 'appConstants';
import userConstants from './userConstants';

const userBaseReducer = rememberUser => {
  const reducerSource = rememberUser
    ? textConstants.user.IS_PERSISTED
    : textConstants.user.IS_TEMPORAL;
  const initState = {
    data: {
      user: null,
      token: null,
      rememberUser: false,
    },
  };

  return function (state = initState, action) {
    switch (action.type) {
      case userConstants[reducerSource].SET_USER:
        return {
          ...state,
          data: action.payload,
        };
      case userConstants[reducerSource].CLEAR_USER:
        return {
          ...state,
          data: {
            user: null,
            token: null,
            rememberUser: false,
          },
        };
      default:
        return state;
    }
  };
};
export default userBaseReducer;
