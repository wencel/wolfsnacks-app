import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { loginRequestAction } from 'reducers/login/loginActions';

import Login from './LoginPage';

const LoginContainer = ({ login }) => {
  return <Login loginReguest={login} />;
};

LoginContainer.propTypes = {
  login: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  login: data => {
    dispatch(loginRequestAction(data));
  },
});

export default connect(null, mapDispatchToProps)(LoginContainer);
