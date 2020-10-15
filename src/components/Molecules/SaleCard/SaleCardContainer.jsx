import React from 'react';
import { connect } from 'react-redux';
import { requestDeleteSaleAction } from 'reducers/sale/saleActions';
import SaleCard from './SaleCard';

const SaleCardContainer = ({ deleteSale, ...restPorps }) => {
  return <SaleCard deleteSale={deleteSale} {...restPorps} />;
};

const mapDispatchToProps = dispatch => ({
  deleteSale: data => {
    dispatch(requestDeleteSaleAction(data));
  },
});

export default connect(null, mapDispatchToProps)(SaleCardContainer);
