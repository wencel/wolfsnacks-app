import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import {
  requestCreateEditProductAction,
  requestFetchProductAction,
  requestPresentationsAction,
  requestProductTypesAction,
} from 'reducers/product/productActions';
import {
  presentationsSelector,
  productSelector,
  productTypesSelector,
} from 'reducers/product/productSelectors';
import AddEditProduct from './AddEditProductPage';

const AddEditProductContainer = ({
  presentations,
  productTypes,
  fetchPresentations,
  fetchProductTypes,
  product,
  createEditProduct,
  fetchProduct,
}) => {
  return (
    <AddEditProduct
      product={product}
      createEditProduct={createEditProduct}
      fetchProduct={fetchProduct}
      presentations={presentations}
      productTypes={productTypes}
      fetchPresentations={fetchPresentations}
      fetchProductTypes={fetchProductTypes}
    />
  );
};

AddEditProductContainer.propTypes = {
  createEditProduct: PropTypes.func,
  fetchPresentations: PropTypes.func,
  fetchProduct: PropTypes.func,
  fetchProductTypes: PropTypes.func,
  presentations: PropTypes.array,
  product: PropTypes.object,
  productTypes: PropTypes.array,
};

const mapStateToProps = state => {
  return {
    product: productSelector(state),
    presentations: presentationsSelector(state),
    productTypes: productTypesSelector(state),
  };
};

const mapDispatchToProps = dispatch => ({
  createEditProduct: data => {
    dispatch(requestCreateEditProductAction(data));
  },
  fetchProduct: data => {
    dispatch(requestFetchProductAction(data));
  },
  fetchPresentations: () => {
    dispatch(requestPresentationsAction());
  },
  fetchProductTypes: () => {
    dispatch(requestProductTypesAction());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddEditProductContainer);
