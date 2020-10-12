import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import {
  requestFetchProductAction,
  resetProductAction,
} from 'reducers/product/productActions';
import { productSelector } from 'reducers/product/productSelectors';

import Product from './ProductPage';

const ProductPageContainer = ({ product, fetchProduct, resetProduct }) => {
  return (
    <Product
      product={product}
      fetchProduct={fetchProduct}
      resetProduct={resetProduct}
    />
  );
};

ProductPageContainer.propTypes = {
  product: PropTypes.object,
  fetchProduct: PropTypes.func,
  resetProduct: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    product: productSelector(state),
  };
};

const mapDispatchToProps = dispatch => ({
  fetchProduct: data => {
    dispatch(requestFetchProductAction(data));
  },
  resetProduct: data => {
    dispatch(resetProductAction(data));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductPageContainer);
