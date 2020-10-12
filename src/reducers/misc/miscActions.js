import misConstants from "./miscConstants";

export const setSnackbarAction = payload => ({
  type: misConstants.SET_SNACKBAR,
  payload,
});

export const resetSnackbarAction = () => ({
  type: misConstants.RESET_SNACKBAR,
});
