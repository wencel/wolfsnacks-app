import React from 'react';
import { connect } from 'react-redux';
import { requestDeleteProductAction } from 'reducers/product/productActions';
import ProductCard from './ProductCard';

const ProductCardContainer = ({ deleteProduct, ...restPorps }) => {
  return <ProductCard deleteProduct={deleteProduct} {...restPorps} />;
};

const mapDispatchToProps = dispatch => ({
  deleteProduct: data => {
    dispatch(requestDeleteProductAction(data));
  },
});

export default connect(null, mapDispatchToProps)(ProductCardContainer);
