import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { loginRequestAction } from 'reducers/login/loginActions';
import { loginLoadingSelector } from 'reducers/login/loginSelectors';

import Login from './LoginPage';

const LoginContainer = ({ login, loading }) => {
  return <Login loginReguest={login} loading={loading} />;
};

LoginContainer.propTypes = {
  loading: PropTypes.bool,
  login: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    loading: loginLoadingSelector(state),
  };
};

const mapDispatchToProps = dispatch => ({
  login: data => {
    dispatch(loginRequestAction(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
