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
  customers,
  requestCustomersList,
  resetCustomersList,
}) => {
  const paginationLimit = 10;
  const [showFiltersModal, setShowFiltersModal] = useState(false);
  const [dateRange, setDateRange] = useState([null, null]);
  const [owes, setOwes] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [isThirteenDozen, setIsThirteenDozen] = useState(null);

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
      salesParams.initDate = dateRange[0]?.toISOString();
      salesParams.endDate = dateRange[1]?.toISOString();
    }
    if (typeof owes === 'boolean') {
      salesParams.owes = owes;
    }
    if (typeof isThirteenDozen === 'boolean') {
      salesParams.isThirteenDozen = isThirteenDozen;
    }
    if (customer) {
      salesParams.customer = customer._id;
    }
    requestSalesList(salesParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customer, isThirteenDozen, owes, dateRange, paginationLimit]);
  const onScrollContent = e => {
    if (e.target.offsetHeight + e.target.scrollTop >= e.target.scrollHeight) {
      if (!sales.loading && sales.data.data.length < sales.data.total) {
        const salesParams = {
          sortBy: 'createdAt:desc',
          limit: paginationLimit,
          skip: sales.data.skip + paginationLimit,
        };
        if (dateRange[0] && dateRange[1]) {
          salesParams.initDate = dateRange[0]?.toISOString();
          salesParams.endDate = dateRange[1]?.toISOString();
        }
        if (typeof owes === 'boolean') {
          salesParams.owes = owes;
        }
        if (typeof isThirteenDozen === 'boolean') {
          salesParams.isThirteenDozen = isThirteenDozen;
        }
        if (customer) {
          salesParams.customer = customer.id;
        }
        requestSalesList(salesParams);
      }
    }
  };
  const resetFilters = () => {
    setDateRange([null, null]);
    setOwes(null);
    setIsThirteenDozen(null);
    setShowFiltersModal(false);
    setCustomer(null);
  };
  const applyFilters = q => {
    setDateRange(q.dateRange);
    setOwes(q.owes);
    setIsThirteenDozen(q.isThirteenDozen);
    setCustomer(q.customer);
    setShowFiltersModal(false);
  };
  const fetchCustomers = textQuery => {
    resetCustomersList();
    if (textQuery) {
      requestCustomersList({
        limit: 10,
        textQuery,
      });
    }
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
        parentOwes={owes}
        parentIsThirteenDozen={isThirteenDozen}
        parentCustomer={customer}
        fetchCustomers={fetchCustomers}
        customers={customers}
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
  customers: PropTypes.object,
  products: PropTypes.object,
  requestCustomersList: PropTypes.func,
  requestProductsList: PropTypes.func,
  requestSalesList: PropTypes.func,
  resetProductsList: PropTypes.func,
  resetSalesList: PropTypes.func,
  sales: PropTypes.shape({
    data: PropTypes.shape({
      data: PropTypes.array,
      skip: PropTypes.any,
      total: PropTypes.any,
    }),
    loading: PropTypes.any,
  }),
};

export default SalesPage;
