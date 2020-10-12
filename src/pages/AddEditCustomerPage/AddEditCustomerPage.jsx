import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { MdSave } from 'react-icons/md';

import PageContainer from 'components/Atoms/PageContainer';
import { textConstants } from 'appConstants';
import Card from 'components/Atoms/Card';
import Form from 'components/Atoms/Form';
import Input from 'components/Atoms/Input';
import { useParams } from 'react-router-dom';
import BackButton from 'components/Atoms/BackButton';

import Styles from './AddEditCustomerPage.module.sass';
import { checkObjectsDiff } from 'utils/utils';

const AddEditCustomerPage = ({
  localities,
  requestLocalities,
  customer,
  createEditCustomer,
  fetchCustomer,
}) => {
  const { id } = useParams();

  const [localCustomer, setLocalCustomer] = useState({
    storeName: '',
    name: '',
    address: '',
    email: '',
    phoneNumber: '',
    locality: '',
    town: '',
    idNumber: '',
    _id: '',
  });
  const saveCustomer = e => {
    e.preventDefault();
    const { createdAt, updatedAt, user, __v, ...rest } = localCustomer;
    const data = id
      ? { ...checkObjectsDiff(customer.data, rest), _id: id }
      : rest;
    createEditCustomer(data);
  };
  useEffect(() => {
    if (customer?.data) {
      setLocalCustomer({ ...localCustomer, ...customer.data });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customer]);
  useEffect(() => {
    requestLocalities();
    if (id) {
      fetchCustomer(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <PageContainer>
      <BackButton href={id ? `/customers/${id}` : '/customers'} />
      <Card
        className={Styles.AddEditCard}
        title={
          id
            ? textConstants.editCustomer.TITLE
            : textConstants.addCustomer.TITLE
        }
      >
        <Form
          buttonText={textConstants.misc.SAVE}
          buttonIcon={<MdSave />}
          loading={customer.loading}
          onSubmit={saveCustomer}
        >
          <Input
            label={textConstants.customer.STORE_NAME}
            value={localCustomer.storeName}
            onChange={e => {
              setLocalCustomer({ ...localCustomer, storeName: e.target.value });
            }}
          />
          <Input
            label={textConstants.customer.NAME}
            value={localCustomer.name}
            onChange={e => {
              setLocalCustomer({ ...localCustomer, name: e.target.value });
            }}
          />
          <Input
            label={textConstants.customer.ADDRESS}
            value={localCustomer.address}
            onChange={e => {
              setLocalCustomer({ ...localCustomer, address: e.target.value });
            }}
          />
          <Input
            label={textConstants.customer.EMAIL}
            type='email'
            value={localCustomer.email}
            onChange={e => {
              setLocalCustomer({ ...localCustomer, email: e.target.value });
            }}
          />
          <Input
            label={textConstants.customer.PHONE_NUMBER}
            type='number'
            value={localCustomer.phoneNumber}
            onChange={e => {
              setLocalCustomer({
                ...localCustomer,
                phoneNumber: e.target.value,
              });
            }}
          />
          <Input
            label={textConstants.customer.LOCALITY}
            type='select'
            options={localities}
            value={localCustomer.locality}
            onChange={e => {
              setLocalCustomer({ ...localCustomer, locality: e.target.value });
            }}
          />
          <Input
            label={textConstants.customer.TOWN}
            value={localCustomer.town}
            onChange={e => {
              setLocalCustomer({ ...localCustomer, town: e.target.value });
            }}
          />
          <Input
            label={textConstants.customer.ID_NUMBER}
            type='number'
            value={localCustomer.idNumber}
            onChange={e => {
              setLocalCustomer({ ...localCustomer, idNumber: e.target.value });
            }}
          />
        </Form>
      </Card>
    </PageContainer>
  );
};

AddEditCustomerPage.propTypes = {
  createEditCustomer: PropTypes.func,
  customer: PropTypes.shape({
    data: PropTypes.oneOfType([PropTypes.object, PropTypes.oneOf([null])]),
    error: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.oneOf([null]),
      PropTypes.object,
    ]),
    loading: PropTypes.bool,
    success: PropTypes.string,
  }),
  localities: PropTypes.array,
  requestLocalities: PropTypes.func,
  fetchCustomer: PropTypes.func,
};

export default AddEditCustomerPage;
