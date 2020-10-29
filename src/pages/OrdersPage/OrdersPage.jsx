import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { RiFilterLine, RiFilterOffLine } from 'react-icons/ri';
import { MdPlaylistAdd } from 'react-icons/md';

import Card from 'components/Atoms/Card';
import PageContainer from 'components/Atoms/PageContainer';
import OrderCard from 'components/Molecules/OrderCard';
import ButtonContainer from 'components/Atoms/ButtonContainer';
import OrderFilterModal from 'components/Organisms/OrderFilterModal';
import { textConstants } from 'appConstants';

import Styles from './OrdersPage.module.sass';
import Loading from 'components/Atoms/Loading';
// import OrderFilterModal from 'components/Organisms/OrderFilterModal';

const OrdersPage = ({
  orders,
  requestOrdersList,
  resetOrdersList,
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
    resetOrdersList();
    requestOrdersList({
      limit: paginationLimit,
      sortBy: 'orderDate',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    resetOrdersList();
    const ordersParams = {
      sortBy: 'orderDate',
      limit: paginationLimit,
      skip: 0,
    };
    if (dateRange[0] && dateRange[1]) {
      ordersParams.initDate = dateRange[0]?.toISOString();
      ordersParams.endDate = dateRange[1]?.toISOString();
    }
    requestOrdersList(ordersParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateRange, paginationLimit]);
  const onScrollContent = e => {
    if (
      e.target.offsetHeight + e.target.scrollTop >=
      e.target.scrollHeight - 200
    ) {
      if (!orders.loading && orders.data.data.length < orders.data.total) {
        const ordersParams = {
          sortBy: 'orderDate',
          limit: paginationLimit,
          skip: orders.data.skip + paginationLimit,
        };
        if (dateRange[0] && dateRange[1]) {
          ordersParams.initDate = dateRange[0]?.toISOString();
          ordersParams.endDate = dateRange[1]?.toISOString();
        }
        requestOrdersList(ordersParams);
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
      <OrderFilterModal
        showModal={showFiltersModal}
        applyFilter={applyFilters}
        closeModal={() => {
          setShowFiltersModal(false);
        }}
        parentDateRange={dateRange}
      />
      <PageContainer onScroll={onScrollContent}>
        <Loading visible={orders.loading} />
        <Card
          className={Styles.orderCard}
          title={textConstants.orderPage.TITLE}
          description={textConstants.orderPage.DESCRIPTION}
        />
        {orders?.data?.data?.map(order => (
          <OrderCard
            className={Styles.orderCard}
            order={order}
            navigate
            key={order._id}
            products={products}
          />
        ))}
        {orders?.data?.data?.length === 0 && (
          <Card
            className={Styles.orderCard}
            title={textConstants.orderPage.EMPTY_TITLE}
            description={textConstants.orderPage.EMPTY_DESCRIPTION}
          />
        )}
        <ButtonContainer
          buttons={[
            {
              text: textConstants.addOrder.ADD_ORDER,
              icon: <MdPlaylistAdd />,
              href: '/orders/new',
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

OrdersPage.propTypes = {
  orders: PropTypes.shape({
    data: PropTypes.shape({
      data: PropTypes.array,
      skip: PropTypes.any,
      total: PropTypes.any,
    }),
    loading: PropTypes.any,
  }),
  requestOrdersList: PropTypes.func,
  resetOrdersList: PropTypes.func,
};

export default OrdersPage;
