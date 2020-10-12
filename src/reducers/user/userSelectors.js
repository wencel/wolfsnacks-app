import { createSelector } from 'reselect';

const userSelectorState = state =>
  state.user?.data?.user ? state.user : state.persistedUser;

export const userSelector = createSelector(userSelectorState, state => {
  return state.data.user;
});
export const userTokenSelector = createSelector(userSelectorState, state => {
  return state.data.token;
});
export const isRememberUserSelector = createSelector(
  userSelectorState,
  state => {
    return state.data.rememberUser;
  }
);
