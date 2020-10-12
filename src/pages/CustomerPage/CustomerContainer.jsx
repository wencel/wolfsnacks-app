import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import {
  requestFetchCustomerAction,
  resetCustomerAction,
} from "reducers/customer/customerActions";
import { customerSelector } from "reducers/customer/customerSelectors";

import Customer from "./CustomerPage";

const CustomerContainer = ({ customer, fetchCustomer, resetCustomer }) => {
  return (
    <Customer
      customer={customer}
      fetchCustomer={fetchCustomer}
      resetCustomer={resetCustomer}
    />
  );
};

CustomerContainer.propTypes = {
  customer: PropTypes.object,
  fetchCustomer: PropTypes.func,
  resetCustomer: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    customer: customerSelector(state),
  };
};

const mapDispatchToProps = dispatch => ({
  fetchCustomer: data => {
    dispatch(requestFetchCustomerAction(data));
  },
  resetCustomer: data => {
    dispatch(resetCustomerAction(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerContainer);
