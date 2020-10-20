import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import {
  requestSalesListAction,
  resetSalesListAction,
} from 'reducers/sale/saleActions';
import { salesSelector } from 'reducers/sale/saleSelectors';
import {
  requestProductsListAction,
  resetProductsListAction,
} from 'reducers/product/productActions';
import { productsListDropdownSelector } from 'reducers/product/productSelectors';

import Sales from './SalesPage';
import { customersSelector } from 'reducers/customer/customerSelectors';
import {
  requestCustomersListAction,
  resetCustomersListAction,
} from 'reducers/customer/customerActions';

const SalesPageContainer = ({
  sales,
  requestSalesList,
  resetSalesList,
  requestProductsList,
  resetProductsList,
  products,
  customers,
  requestCustomersList,
  resetCustomersList,
}) => {
  return (
    <Sales
      sales={sales}
      requestSalesList={requestSalesList}
      resetSalesList={resetSalesList}
      requestProductsList={requestProductsList}
      resetProductsList={resetProductsList}
      products={products}
      customers={customers}
      requestCustomersList={requestCustomersList}
      resetCustomersList={resetCustomersList}
    />
  );
};

SalesPageContainer.propTypes = {
  customers: PropTypes.object,
  products: PropTypes.array,
  requestCustomersList: PropTypes.func,
  requestProductsList: PropTypes.func,
  requestSalesList: PropTypes.func,
  resetCustomersList: PropTypes.func,
  resetProductsList: PropTypes.func,
  resetSalesList: PropTypes.func,
  sales: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    sales: salesSelector(state),
    products: productsListDropdownSelector(state),
    customers: customersSelector(state),
  };
};

const mapDispatchToProps = dispatch => ({
  requestSalesList: data => {
    dispatch(requestSalesListAction(data));
  },
  resetSalesList: () => {
    dispatch(resetSalesListAction());
  },
  requestProductsList: data => {
    dispatch(requestProductsListAction(data));
  },
  resetProductsList: () => {
    dispatch(resetProductsListAction());
  },
  requestCustomersList: data => {
    dispatch(requestCustomersListAction(data));
  },
  resetCustomersList: () => {
    dispatch(resetCustomersListAction());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SalesPageContainer);
