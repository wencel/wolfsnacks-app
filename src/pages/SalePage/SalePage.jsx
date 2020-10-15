import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

import PageContainer from 'components/Atoms/PageContainer';
import SaleCard from 'components/Molecules/SaleCard';

import Styles from './SalePage.module.sass';
import Loading from 'components/Atoms/Loading';
import { useParams } from 'react-router-dom';
import BackButton from 'components/Atoms/BackButton';

const SalePage = ({
  sale,
  fetchSale,
  resetSale,
  products,
  requestProductsList,
  resetProductsList,
}) => {
  const { id } = useParams();
  useEffect(() => {
    fetchSale(id);
    resetProductsList();
    requestProductsList({
      limit: 100,
    });
    return () => {
      resetSale();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <PageContainer>
        <Loading visible={sale.loading} />
        <BackButton href='/sales' />
        <SaleCard
          className={Styles.saleCard}
          sale={sale.data || {}}
          products={products}
        />
      </PageContainer>
    </>
  );
};

SalePage.propTypes = {
  sale: PropTypes.shape({
    loading: PropTypes.bool,
  }),
  fetchSale: PropTypes.func,
};

export default SalePage;
