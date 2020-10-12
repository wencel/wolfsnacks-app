import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import {
  requestCustomersListAction,
  resetCustomersListAction,
} from 'reducers/customer/customerActions';
import { customersSelector } from 'reducers/customer/customerSelectors';

import Customers from './CustomersPage';

const CustomersContainer = ({
  customers,
  requestCustomersList,
  resetCustomersList,
}) => {
  return (
    <Customers
      customers={customers}
      requestCustomersList={requestCustomersList}
      resetCustomersList={resetCustomersList}
    />
  );
};

CustomersContainer.propTypes = {
  customers: PropTypes.object,
  requestCustomersList: PropTypes.func,
  resetCustomersList: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    customers: customersSelector(state),
  };
};

const mapDispatchToProps = dispatch => ({
  requestCustomersList: data => {
    dispatch(requestCustomersListAction(data));
  },
  resetCustomersList: () => {
    dispatch(resetCustomersListAction());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomersContainer);
