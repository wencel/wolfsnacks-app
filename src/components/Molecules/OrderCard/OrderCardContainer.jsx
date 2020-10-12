import React from 'react';
import { connect } from 'react-redux';
import { requestDeleteOrderAction } from 'reducers/order/orderActions';
import OrderCard from './OrderCard';

const OrderCardContainer = ({ deleteOrder, ...restPorps }) => {
  return <OrderCard deleteOrder={deleteOrder} {...restPorps} />;
};

const mapDispatchToProps = dispatch => ({
  deleteOrder: data => {
    dispatch(requestDeleteOrderAction(data));
  },
});

export default connect(null, mapDispatchToProps)(OrderCardContainer);
