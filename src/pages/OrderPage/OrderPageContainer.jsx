import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import {
  requestFetchOrderAction,
  resetOrderAction,
} from 'reducers/order/orderActions';
import { orderSelector } from 'reducers/order/orderSelectors';
import {
  requestProductsListAction,
  resetProductsListAction,
} from 'reducers/product/productActions';
import { productsListDropdownSelector } from 'reducers/product/productSelectors';

import Order from './OrderPage';

const OrderPageContainer = ({
  order,
  fetchOrder,
  resetOrder,
  products,
  requestProductsList,
  resetProductsList,
}) => {
  return (
    <Order
      order={order}
      fetchOrder={fetchOrder}
      resetOrder={resetOrder}
      products={products}
      requestProductsList={requestProductsList}
      resetProductsList={resetProductsList}
    />
  );
};

OrderPageContainer.propTypes = {
  fetchOrder: PropTypes.func,
  order: PropTypes.object,
  products: PropTypes.array,
  requestProductsList: PropTypes.func,
  resetOrder: PropTypes.func,
  resetProductsList: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    order: orderSelector(state),
    products: productsListDropdownSelector(state),
  };
};

const mapDispatchToProps = dispatch => ({
  fetchOrder: data => {
    dispatch(requestFetchOrderAction(data));
  },
  resetOrder: data => {
    dispatch(resetOrderAction(data));
  },
  requestProductsList: data => {
    dispatch(requestProductsListAction(data));
  },
  resetProductsList: () => {
    dispatch(resetProductsListAction());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderPageContainer);
