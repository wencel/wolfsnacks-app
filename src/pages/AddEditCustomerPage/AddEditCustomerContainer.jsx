import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import {
  requestCreateEditCustomerAction,
  requestFetchCustomerAction,
  requestLocalitiesAction,
} from "reducers/customer/customerActions";
import {
  customerSelector,
  localitiesSelector,
} from "reducers/customer/customerSelectors";
import AddEditCustomer from "./AddEditCustomerPage";

const AddEditCustomerContainer = ({
  localities,
  requestLocalities,
  customer,
  createEditCustomer,
  fetchCustomer,
}) => {
  return (
    <AddEditCustomer
      localities={localities}
      requestLocalities={requestLocalities}
      customer={customer}
      createEditCustomer={createEditCustomer}
      fetchCustomer={fetchCustomer}
    />
  );
};

AddEditCustomerContainer.propTypes = {
  createEditCustomer: PropTypes.func,
  customer: PropTypes.object,
  localities: PropTypes.array,
  requestLocalities: PropTypes.func,
  fetchCustomer: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    localities: localitiesSelector(state),
    customer: customerSelector(state),
  };
};

const mapDispatchToProps = dispatch => ({
  requestLocalities: () => {
    dispatch(requestLocalitiesAction());
  },
  createEditCustomer: data => {
    dispatch(requestCreateEditCustomerAction(data));
  },
  fetchCustomer: data => {
    dispatch(requestFetchCustomerAction(data));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddEditCustomerContainer);
