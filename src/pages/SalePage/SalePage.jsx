import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

import PageContainer from 'components/Atoms/PageContainer';
import SaleCard from 'components/Molecules/SaleCard';

import Styles from './SalePage.module.sass';
import Loading from 'components/Atoms/Loading';
import { useParams } from 'react-router-dom';
import useSetActiveTab from 'reducers/hooks/useSetActiveTab';
import TopActions from 'components/Organisms/TopActions';
import { IoIosArrowDropleft } from 'react-icons/io';
import { MdPlaylistAdd } from 'react-icons/md';
import { textConstants } from 'appConstants';

const SalePage = ({
  sale,
  fetchSale,
  resetSale,
  products,
  requestProductsList,
  resetProductsList,
}) => {
  useSetActiveTab('sales');
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
        <TopActions
          buttons={[
            {
              text: textConstants.misc.BACK,
              icon: <IoIosArrowDropleft />,
              href: '/sales',
            },
            {
              text: textConstants.addSale.ADD_SALE,
              icon: <MdPlaylistAdd />,
              href: '/sales/new',
            },
          ]}
        />
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
