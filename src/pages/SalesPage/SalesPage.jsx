import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { RiFilterLine, RiFilterOffLine } from 'react-icons/ri';
import { MdPlaylistAdd } from 'react-icons/md';

import Card from 'components/Atoms/Card';
import PageContainer from 'components/Atoms/PageContainer';
import SaleCard from 'components/Molecules/SaleCard';
import ButtonContainer from 'components/Atoms/ButtonContainer';
import SaleFilterModal from 'components/Organisms/SaleFilterModal';
import { textConstants } from 'appConstants';

import Styles from './SalesPage.module.sass';
import Loading from 'components/Atoms/Loading';

const SalesPage = ({
  sales,
  requestSalesList,
  resetSalesList,
  requestProductsList,
  resetProductsList,
  products,
}) => {
  const paginationLimit = 10;
  const [showFiltersModal, setShowFiltersModal] = useState(false);
  const [dateRange, setDateRange] = useState([null, null]);

  useEffect(() => {
    resetProductsList();
    requestProductsList({
      limit: 100,
    });
    resetSalesList();
    requestSalesList({
      limit: paginationLimit,
      sortBy: 'createdAt',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    resetSalesList();
    const salesParams = {
      sortBy: 'createdAt',
      limit: paginationLimit,
      skip: 0,
    };
    if (dateRange[0] && dateRange[1]) {
      salesParams.initDate = dateRange[0];
      salesParams.endDate = dateRange[1];
    }
    requestSalesList(salesParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateRange, paginationLimit]);
  const onScrollContent = e => {
    if (e.target.offsetHeight + e.target.scrollTop >= e.target.scrollHeight) {
      if (!sales.loading && sales.data.data.length < sales.data.total) {
        const salesParams = {
          sortBy: 'createdAt:desc',
          limit: paginationLimit,
          skip: sales.data.skip + paginationLimit,
        };
        if (dateRange[0] && dateRange[1]) {
          salesParams.initDate = dateRange[0];
          salesParams.endDate = dateRange[1];
        }
        requestSalesList(salesParams);
      }
    }
  };
  const resetFilters = () => {
    setDateRange([null, null]);
    setShowFiltersModal(false);
  };
  const applyFilters = q => {
    setDateRange(q.dateRange);
    setShowFiltersModal(false);
  };
  return (
    <>
      <SaleFilterModal
        showModal={showFiltersModal}
        applyFilter={applyFilters}
        closeModal={() => {
          setShowFiltersModal(false);
        }}
        parentDateRange={dateRange}
      />
      <PageContainer onScroll={onScrollContent}>
        <Loading visible={sales.loading} />
        <Card
          className={Styles.saleCard}
          title={textConstants.salePage.TITLE}
          description={textConstants.salePage.DESCRIPTION}
        />
        {sales?.data?.data?.map(sale => (
          <SaleCard
            className={Styles.saleCard}
            sale={sale}
            navigate
            key={sale._id}
            products={products}
          />
        ))}
        {sales?.data?.data?.length === 0 && (
          <Card
            className={Styles.saleCard}
            title={textConstants.salePage.EMPTY_TITLE}
            description={textConstants.salePage.EMPTY_DESCRIPTION}
          />
        )}
        <ButtonContainer
          buttons={[
            {
              text: textConstants.addSale.ADD_SALE,
              icon: <MdPlaylistAdd />,
              href: '/sales/new',
            },
            {
              text: textConstants.misc.FILTERS,
              icon: <RiFilterLine />,
              onClick: () => setShowFiltersModal(true),
            },
            {
              text: textConstants.misc.RESET_FILTERS,
              icon: <RiFilterOffLine />,
              onClick: resetFilters,
            },
          ]}
        />
      </PageContainer>
    </>
  );
};

SalesPage.propTypes = {
  sales: PropTypes.shape({
    data: PropTypes.shape({
      data: PropTypes.array,
      skip: PropTypes.any,
      total: PropTypes.any,
    }),
    loading: PropTypes.any,
  }),
  requestSalesList: PropTypes.func,
  resetSalesList: PropTypes.func,
};

export default SalesPage;
