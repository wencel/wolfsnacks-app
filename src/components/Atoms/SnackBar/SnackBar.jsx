import PropTypes from 'prop-types';
import { appConstants } from 'appConstants';
import React, { useEffect } from 'react';
import { useSnackbar } from 'react-simple-snackbar';

const SnackBar = ({ message, resetMessage }) => {
  const [showSnackBar] = useSnackbar(appConstants.snackbarOptions);
  useEffect(() => {
    if (message) {
      showSnackBar(message);
      resetMessage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);
  return <div />;
};

SnackBar.propTypes = {
  message: PropTypes.string,
  resetMessage: PropTypes.func,
};

export default SnackBar;
