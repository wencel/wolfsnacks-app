import { textConstants, urlConstants } from 'appConstants';
import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import request from 'utils/request';
import { setLoginLoadingAction } from './loginActions';
import { setUserAction, clearUserAction } from 'reducers/user/userActions';
import loginConstatns from './loginConstants';
import { setSnackbarAction } from 'reducers/misc/miscActions';

// worker Saga: will be fired on LOGIN_FETCH_REQUESTED actions
function* loginRequestSaga(action) {
  yield put(setLoginLoadingAction(true));
  const { email, password, rememberUser } = action.payload;
  if (!email || !password) {
    yield put(setLoginLoadingAction(false));
    yield put(setSnackbarAction(textConstants.login.LOGIN_ERROR));
    return;
  }
  try {
    const data = yield call(
      request,
      urlConstants.user.LOGIN,
      {
        method: 'POST',
      },
      action.payload
    );
    if (data.user && data.token) {
      yield put(setLoginLoadingAction(false));
      yield put(
        setUserAction({
          user: data.user,
          token: data.token,
          rememberUser,
        })
      );
      yield put(push('/'));
    } else if (data.error) {
      yield put(setLoginLoadingAction(false));
      yield put(setSnackbarAction(data.error));
    } else {
      yield put(setLoginLoadingAction(false));
      yield put(setSnackbarAction(textConstants.login.LOGIN_ERROR));
    }
  } catch (e) {
    yield put(setLoginLoadingAction(false));
    yield put(setSnackbarAction(e));
  }
}

function* logoutRequestSaga() {
  try {
    yield call(request, urlConstants.user.LOGOUT, {
      method: 'POST',
    });
    yield put(clearUserAction({ rememberUser: true }));
    yield put(clearUserAction({ rememberUser: false }));
  } catch (e) {
    yield put(clearUserAction({ rememberUser: true }));
    yield put(clearUserAction({ rememberUser: false }));
  }
}

export default function* loginSagas() {
  yield takeLatest(loginConstatns.LOGIN_REQUEST, loginRequestSaga);
  yield takeLatest(loginConstatns.LOGOUT_REQUEST, logoutRequestSaga);
}
