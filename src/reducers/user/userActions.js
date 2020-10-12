import userConstants from './userConstants';
import { textConstants } from 'appConstants';

export const setUserAction = payload => ({
  type:
    userConstants[
      payload.rememberUser
        ? textConstants.user.IS_PERSISTED
        : textConstants.user.IS_TEMPORAL
    ].SET_USER,
  payload,
});

export const clearUserAction = payload => ({
  type:
    userConstants[
      payload.rememberUser
        ? textConstants.user.IS_PERSISTED
        : textConstants.user.IS_TEMPORAL
    ].CLEAR_USER,
});
