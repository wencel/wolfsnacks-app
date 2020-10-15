import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import {
  requestFetchSaleAction,
  resetSaleAction,
} from 'reducers/sale/saleActions';
import { saleSelector } from 'reducers/sale/saleSelectors';
import {
  requestProductsListAction,
  resetProductsListAction,
} from 'reducers/product/productActions';
import { productsListDropdownSelector } from 'reducers/product/productSelectors';

import Sale from './SalePage';

const SalePageContainer = ({
  sale,
  fetchSale,
  resetSale,
  products,
  requestProductsList,
  resetProductsList,
}) => {
  return (
    <Sale
      sale={sale}
      fetchSale={fetchSale}
      resetSale={resetSale}
      products={products}
      requestProductsList={requestProductsList}
      resetProductsList={resetProductsList}
    />
  );
};

SalePageContainer.propTypes = {
  fetchSale: PropTypes.func,
  sale: PropTypes.object,
  products: PropTypes.array,
  requestProductsList: PropTypes.func,
  resetSale: PropTypes.func,
  resetProductsList: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    sale: saleSelector(state),
    products: productsListDropdownSelector(state),
  };
};

const mapDispatchToProps = dispatch => ({
  fetchSale: data => {
    dispatch(requestFetchSaleAction(data));
  },
  resetSale: data => {
    dispatch(resetSaleAction(data));
  },
  requestProductsList: data => {
    dispatch(requestProductsListAction(data));
  },
  resetProductsList: () => {
    dispatch(resetProductsListAction());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SalePageContainer);
