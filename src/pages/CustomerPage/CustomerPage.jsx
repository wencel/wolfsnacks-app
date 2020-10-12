import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

import PageContainer from 'components/Atoms/PageContainer';
import CustomerCard from 'components/Molecules/CustomerCard';

import Styles from './CustomerPage.module.sass';
import Loading from 'components/Atoms/Loading';
import { useParams } from 'react-router-dom';
import BackButton from 'components/Atoms/BackButton';

const CustomerPage = ({ customer, fetchCustomer, resetCustomer }) => {
  const { id } = useParams();
  useEffect(() => {
    fetchCustomer(id);
    return () => {
      resetCustomer();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <PageContainer>
        <Loading visible={customer.loading} />
        <BackButton href='/customers' />
        <CustomerCard
          className={Styles.customerCard}
          customer={customer.data || {}}
        />
      </PageContainer>
    </>
  );
};

CustomerPage.propTypes = {
  customer: PropTypes.shape({
    loading: PropTypes.bool,
  }),
  fetchCustomer: PropTypes.func,
};

export default CustomerPage;
