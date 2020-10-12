import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import {
  requestProductsListAction,
  resetProductsListAction,
} from 'reducers/product/productActions';
import { productsSelector } from 'reducers/product/productSelectors';

import Products from './ProductsPage';

const ProductsPageContainer = ({
  products,
  requestProductsList,
  resetProductsList,
}) => {
  return (
    <Products
      products={products}
      requestProductsList={requestProductsList}
      resetProductsList={resetProductsList}
    />
  );
};

ProductsPageContainer.propTypes = {
  products: PropTypes.object,
  requestProductsList: PropTypes.func,
  resetProductsList: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    products: productsSelector(state),
  };
};

const mapDispatchToProps = dispatch => ({
  requestProductsList: data => {
    dispatch(requestProductsListAction(data));
  },
  resetProductsList: () => {
    dispatch(resetProductsListAction());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductsPageContainer);
