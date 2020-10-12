import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { logoutRequestAction } from "reducers/login/loginActions";
import { userSelector } from "reducers/user/userSelectors";
import Navbar from "./Navbar";

const NavbarContainer = ({ user, requestLogout }) => {
  return <Navbar user={user} requestLogout={requestLogout} />;
};

NavbarContainer.propTypes = {
  requestLogout: PropTypes.func,
  user: PropTypes.oneOfType([PropTypes.object, null]),
};

const mapStateToProps = state => {
  return {
    user: userSelector(state),
  };
};

const mapDispatchToProps = dispatch => ({
  requestLogout: data => {
    dispatch(logoutRequestAction(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NavbarContainer);
