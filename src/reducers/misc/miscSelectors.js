import { createSelector } from 'reselect';

const miscSelectorState = state => state.misc;

export const snackbarMessageSelector = createSelector(
  miscSelectorState,
  state => {
    return state.message;
  }
);
export const activeTabSelector = createSelector(miscSelectorState, state => {
  return state.activeTab;
});
