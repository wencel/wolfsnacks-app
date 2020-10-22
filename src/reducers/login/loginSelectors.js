import { createSelector } from 'reselect';

const loginSelectorState = state => state.login;

export const loginLoadingSelector = createSelector(
  loginSelectorState,
  state => {
    return state.loading;
  }
);
