import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

import PageContainer from 'components/Atoms/PageContainer';
import OrderCard from 'components/Molecules/OrderCard';

import Styles from './OrderPage.module.sass';
import Loading from 'components/Atoms/Loading';
import { useParams } from 'react-router-dom';
import BackButton from 'components/Atoms/BackButton';

const OrderPage = ({
  order,
  fetchOrder,
  resetOrder,
  products,
  requestProductsList,
  resetProductsList,
}) => {
  const { id } = useParams();
  useEffect(() => {
    fetchOrder(id);
    resetProductsList();
    requestProductsList({
      limit: 100,
    });
    return () => {
      resetOrder();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <PageContainer>
        <Loading visible={order.loading} />
        <BackButton href='/orders' />
        <OrderCard
          className={Styles.orderCard}
          order={order.data || {}}
          products={products}
        />
      </PageContainer>
    </>
  );
};

OrderPage.propTypes = {
  order: PropTypes.shape({
    loading: PropTypes.bool,
  }),
  fetchOrder: PropTypes.func,
};

export default OrderPage;
