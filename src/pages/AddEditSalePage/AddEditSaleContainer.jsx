import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import {
  requestCreateEditSaleAction,
  requestFetchSaleAction,
} from 'reducers/sale/saleActions';
import { saleSelector } from 'reducers/sale/saleSelectors';
import {
  requestProductsListAction,
  resetProductsListAction,
} from 'reducers/product/productActions';
import { productsListDropdownSelector } from 'reducers/product/productSelectors';
import AddEditSale from './AddEditSalePage';
import {
  requestCustomersListAction,
  resetCustomersListAction,
} from 'reducers/customer/customerActions';
import { customersSelector } from 'reducers/customer/customerSelectors';

const AddEditSaleContainer = ({
  sale,
  createEditSale,
  fetchSale,
  requestProductsList,
  products,
  resetProductsList,
  requestCustomersList,
  resetCustomersList,
  customers,
}) => {
  return (
    <AddEditSale
      sale={sale}
      createEditSale={createEditSale}
      fetchSale={fetchSale}
      requestProductsList={requestProductsList}
      products={products}
      resetProductsList={resetProductsList}
      requestCustomersList={requestCustomersList}
      resetCustomersList={resetCustomersList}
      customers={customers}
    />
  );
};

AddEditSaleContainer.propTypes = {
  createEditSale: PropTypes.func,
  fetchSale: PropTypes.func,
  products: PropTypes.array,
  requestCustomersList: PropTypes.func,
  requestProductsList: PropTypes.func,
  resetCustomersList: PropTypes.func,
  resetProductsList: PropTypes.func,
  customers: PropTypes.object,
  sale: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    sale: saleSelector(state),
    products: productsListDropdownSelector(state),
    customers: customersSelector(state),
  };
};

const mapDispatchToProps = dispatch => ({
  createEditSale: data => {
    dispatch(requestCreateEditSaleAction(data));
  },
  fetchSale: data => {
    dispatch(requestFetchSaleAction(data));
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddEditSaleContainer);
