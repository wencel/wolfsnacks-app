import React from 'react';
import { connect } from 'react-redux';
import { requestDeleteCustomerAction } from 'reducers/customer/customerActions';
import CustomerCard from './CustomerCard';

const CustomerCardContainer = ({ deleteCustomer, ...restPorps }) => {
  return <CustomerCard deleteCustomer={deleteCustomer} {...restPorps} />;
};

const mapDispatchToProps = dispatch => ({
  deleteCustomer: data => {
    dispatch(requestDeleteCustomerAction(data));
  },
});

export default connect(null, mapDispatchToProps)(CustomerCardContainer);
