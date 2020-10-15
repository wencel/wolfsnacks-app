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

const SalesPageContainer = ({
  sales,
  requestSalesList,
  resetSalesList,
  requestProductsList,
  resetProductsList,
  products,
}) => {
  return (
    <Sales
      sales={sales}
      requestSalesList={requestSalesList}
      resetSalesList={resetSalesList}
      requestProductsList={requestProductsList}
      resetProductsList={resetProductsList}
      products={products}
    />
  );
};

SalesPageContainer.propTypes = {
  sales: PropTypes.object,
  requestSalesList: PropTypes.func,
  requestProductsList: PropTypes.func,
  resetSalesList: PropTypes.func,
  resetProductsList: PropTypes.func,
  products: PropTypes.array,
};

const mapStateToProps = state => {
  return {
    sales: salesSelector(state),
    products: productsListDropdownSelector(state),
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
});

export default connect(mapStateToProps, mapDispatchToProps)(SalesPageContainer);
