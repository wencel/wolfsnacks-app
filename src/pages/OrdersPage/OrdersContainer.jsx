import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import {
  requestOrdersListAction,
  resetOrdersListAction,
} from 'reducers/order/orderActions';
import { ordersSelector } from 'reducers/order/orderSelectors';
import {
  requestProductsListAction,
  resetProductsListAction,
} from 'reducers/product/productActions';
import { productsListDropdownSelector } from 'reducers/product/productSelectors';

import Orders from './OrdersPage';

const OrdersPageContainer = ({
  orders,
  requestOrdersList,
  resetOrdersList,
  requestProductsList,
  resetProductsList,
  products,
}) => {
  return (
    <Orders
      orders={orders}
      requestOrdersList={requestOrdersList}
      resetOrdersList={resetOrdersList}
      requestProductsList={requestProductsList}
      resetProductsList={resetProductsList}
      products={products}
    />
  );
};

OrdersPageContainer.propTypes = {
  orders: PropTypes.object,
  requestOrdersList: PropTypes.func,
  requestProductsList: PropTypes.func,
  resetOrdersList: PropTypes.func,
  resetProductsList: PropTypes.func,
  products: PropTypes.array,
};

const mapStateToProps = state => {
  return {
    orders: ordersSelector(state),
    products: productsListDropdownSelector(state),
  };
};

const mapDispatchToProps = dispatch => ({
  requestOrdersList: data => {
    dispatch(requestOrdersListAction(data));
  },
  resetOrdersList: () => {
    dispatch(resetOrdersListAction());
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
)(OrdersPageContainer);
