import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

import PageContainer from 'components/Atoms/PageContainer';
import CustomerCard from 'components/Molecules/CustomerCard';

import Styles from './CustomerPage.module.sass';
import Loading from 'components/Atoms/Loading';
import { useParams } from 'react-router-dom';
import useSetActiveTab from 'reducers/hooks/useSetActiveTab';
import TopActions from 'components/Organisms/TopActions';
import { textConstants } from 'appConstants';
import { IoIosArrowDropleft } from 'react-icons/io';
import { MdPersonAdd } from 'react-icons/md';

const CustomerPage = ({ customer, fetchCustomer, resetCustomer }) => {
  useSetActiveTab('customers');
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
        <TopActions
          buttons={[
            {
              text: textConstants.misc.BACK,
              icon: <IoIosArrowDropleft />,
              href: '/customers',
            },
            {
              text: textConstants.addCustomer.ADD_CUSTOMER,
              icon: <MdPersonAdd />,
              href: '/customers/new',
            },
          ]}
        />
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
