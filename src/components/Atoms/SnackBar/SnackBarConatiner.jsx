import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { resetSnackbarAction } from 'reducers/misc/miscActions';
import { snackbarMessageSelector } from 'reducers/misc/miscSelectors';
import SnackBar from './SnackBar';

const SnackBarContainer = ({ message, resetMessage }) => {
  return <SnackBar message={message} resetMessage={resetMessage} />;
};

SnackBarContainer.propTypes = {
  message: PropTypes.string,
  resetMessage: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    message: snackbarMessageSelector(state),
  };
};

const mapDispatchToProps = dispatch => ({
  resetMessage: () => {
    dispatch(resetSnackbarAction());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SnackBarContainer);
