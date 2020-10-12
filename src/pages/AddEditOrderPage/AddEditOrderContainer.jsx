import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import {
  requestCreateEditOrderAction,
  requestFetchOrderAction,
} from 'reducers/order/orderActions';
import { orderSelector } from 'reducers/order/orderSelectors';
import {
  requestProductsListAction,
  resetProductsListAction,
} from 'reducers/product/productActions';
import { productsListDropdownSelector } from 'reducers/product/productSelectors';
import AddEditOrder from './AddEditOrderPage';

const AddEditOrderContainer = ({
  order,
  createEditOrder,
  fetchOrder,
  requestProductsList,
  products,
  resetProductsList,
}) => {
  return (
    <AddEditOrder
      order={order}
      createEditOrder={createEditOrder}
      fetchOrder={fetchOrder}
      requestProductsList={requestProductsList}
      products={products}
      resetProductsList={resetProductsList}
    />
  );
};

AddEditOrderContainer.propTypes = {
  createEditOrder: PropTypes.func,
  fetchOrder: PropTypes.func,
  order: PropTypes.object,
  products: PropTypes.array,
  requestProductsList: PropTypes.func,
  resetProductsList: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    order: orderSelector(state),
    products: productsListDropdownSelector(state),
  };
};

const mapDispatchToProps = dispatch => ({
  createEditOrder: data => {
    dispatch(requestCreateEditOrderAction(data));
  },
  fetchOrder: data => {
    dispatch(requestFetchOrderAction(data));
  },
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
)(AddEditOrderContainer);
