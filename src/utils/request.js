import { store } from 'reducers/store';
import { logoutRequestAction } from 'reducers/login/loginActions';
async function request(url = '', options = {}, data = {}, validateAuth) {
  const requestOptions = { ...options };
  if (!requestOptions.headers) {
    requestOptions.headers = { 'Content-Type': 'application/json' };
  } else if (!requestOptions.headers['Content-Type']) {
    requestOptions.headers['Content-Type'] = 'application/json';
  }
  if (
    requestOptions?.method &&
    !['GET', 'HEAD'].includes(requestOptions?.method)
  ) {
    requestOptions.body = JSON.stringify(data);
  }
  const response = await fetch(url, requestOptions);
  const jsonresponse = await response.json();
  if (
    !url.includes('/users/logout') &&
    jsonresponse.error === 'Please authenticate.'
  ) {
    store.dispatch(logoutRequestAction());
  }
  return jsonresponse; // parses JSON response into native JavaScript objects
}

export default request;
