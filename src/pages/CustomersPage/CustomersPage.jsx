import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { RiFilterLine, RiFilterOffLine } from 'react-icons/ri';
import { MdPersonAdd } from 'react-icons/md';

import Card from 'components/Atoms/Card';
import PageContainer from 'components/Atoms/PageContainer';
import CustomerCard from 'components/Molecules/CustomerCard';
import ButtonContainer from 'components/Atoms/ButtonContainer';
import CustomerFilterModal from 'components/Organisms/CustomerFilterModal';
import { textConstants } from 'appConstants';

import Styles from './CustomersPage.module.sass';
import Loading from 'components/Atoms/Loading';

const CustomersPage = ({
  customers,
  requestCustomersList,
  resetCustomersList,
}) => {
  const paginationLimit = 10;
  const [showFiltersModal, setShowFiltersModal] = useState(false);
  const [textQuery, setTextQuery] = useState('');
  const [sortBy, setSortBy] = useState('storeName');
  const [direction, setDirection] = useState('asc');

  useEffect(() => {
    resetCustomersList();
    requestCustomersList({
      limit: paginationLimit,
      textQuery,
      sortBy: `${sortBy}:${direction}`,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    resetCustomersList();
    requestCustomersList({
      textQuery,
      sortBy: `${sortBy}:${direction}`,
      limit: paginationLimit,
      skip: 0,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textQuery, sortBy, direction, paginationLimit]);
  const onScrollContent = e => {
    if (
      e.target.offsetHeight + e.target.scrollTop >=
      e.target.scrollHeight - 200
    ) {
      if (
        !customers.loading &&
        customers.data.data.length < customers.data.total
      ) {
        requestCustomersList({
          textQuery,
          sortBy: `${sortBy}:${direction}`,
          limit: paginationLimit,
          skip: customers.data.skip + paginationLimit,
        });
      }
    }
  };
  const resetFilters = () => {
    setTextQuery('');
    setSortBy('storeName');
    setDirection('asc');
    setShowFiltersModal(false);
  };
  const applyFilters = q => {
    setTextQuery(q.textQuery);
    setSortBy(q.sortBy);
    setDirection(q.direction);
    setShowFiltersModal(false);
  };
  return (
    <>
      <CustomerFilterModal
        showModal={showFiltersModal}
        applyFilter={applyFilters}
        closeModal={() => {
          setShowFiltersModal(false);
        }}
        parentTextQuery={textQuery}
        parentSortBy={sortBy}
        parentDirection={direction}
      />
      <PageContainer onScroll={onScrollContent}>
        <Loading visible={customers.loading} />
        <Card
          className={Styles.customerCard}
          title={textConstants.customerPage.TITLE}
          description={textConstants.customerPage.DESCRIPTION}
        />
        {customers?.data?.data?.map(customer => (
          <CustomerCard
            className={Styles.customerCard}
            customer={customer}
            navigate
            key={customer._id}
          />
        ))}
        {customers?.data?.data?.length === 0 && (
          <Card
            className={Styles.customerCard}
            title={textConstants.customerPage.EMPTY_TITLE}
            description={textConstants.customerPage.EMPTY_DESCRIPTION}
          />
        )}
        <ButtonContainer
          buttons={[
            {
              text: textConstants.addCustomer.ADD_CUSTOMER,
              icon: <MdPersonAdd />,
              href: '/customers/new',
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

CustomersPage.propTypes = {
  customers: PropTypes.shape({
    data: PropTypes.shape({
      data: PropTypes.array,
      skip: PropTypes.any,
      total: PropTypes.any,
    }),
    loading: PropTypes.any,
  }),
  requestCustomersList: PropTypes.func,
  resetCustomersList: PropTypes.func,
};

export default CustomersPage;
