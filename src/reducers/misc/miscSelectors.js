import { createSelector } from 'reselect';

const miscSelectorState = state => state.misc;

export const snackbarMessageSelector = createSelector(
  miscSelectorState,
  state => {
    return state.message;
  }
);
