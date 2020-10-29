import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';

import Card from 'components/Atoms/Card';
import classnames from 'classnames';
import {
  MdPhone,
  MdEmail,
  MdPerson,
  MdLocationOn,
  MdCreditCard,
} from 'react-icons/md';

import Styles from './CustomerCard.module.sass';
import NavigationCardHeader from 'components/Atoms/NavigationCardHeader';
import Button from 'components/Atoms/Button';
import { Link } from 'react-router-dom';
import WarningModal from 'components/Organisms/WarningModal';
import { textConstants } from 'appConstants';
import NumberFormat from 'react-number-format';

const CustomerCard = ({ customer, className, navigate, deleteCustomer }) => {
  const cardClasses = classnames({
    [Styles.CustomerCard]: true,
    [className]: className,
  });
  const [showModal, setShowModal] = useState(false);
  const requestDeleteCustomer = () => {
    deleteCustomer(customer._id);
    setShowModal(false);
  };
  const showDeleteCustomerModal = () => {
    setShowModal(true);
  };
  const hideDeleteCustomerModal = () => {
    setShowModal(false);
  };
  return (
    <div>
      <WarningModal
        closeModal={hideDeleteCustomerModal}
        showModal={showModal}
        title={textConstants.customerPage.DELETE_CONFIRMATION_TITLE}
        description={
          <>
            {textConstants.customerPage.DELETE_CONFIRMATION}{' '}
            <b>
              <i>{customer?.storeName}</i>
            </b>
            ?
          </>
        }
        showCancelButton
        cancelAction={hideDeleteCustomerModal}
        cancelText={textConstants.misc.NO}
        confirmationAction={requestDeleteCustomer}
        confirmationText={textConstants.misc.YES}
      />
      <Card
        className={cardClasses}
        title={
          navigate ? (
            <NavigationCardHeader
              title={customer.storeName}
              to={`/customers/${customer._id}`}
            />
          ) : (
            customer.storeName
          )
        }
        key={customer._id}
      >
        {customer.name ? (
          <div className={Styles.name}>
            <MdPerson className={Styles.icon} />
            {customer.name}
          </div>
        ) : (
          ''
        )}
        <div className={Styles.address}>
          <MdLocationOn className={Styles.icon} />
          {customer.address}
          {customer.locality ? `, ${customer.locality}` : ''}
          {customer.town ? `, ${customer.town}` : ''}
        </div>
        {customer.idNumber ? (
          <div className={Styles.idNumber}>
            <MdCreditCard className={Styles.icon} />
            <NumberFormat
              value={customer.idNumber}
              displayType={'text'}
              thousandSeparator='.'
              decimalSeparator=','
            />
          </div>
        ) : (
          ''
        )}
        {customer.email ? (
          <div className={Styles.email}>
            <MdEmail className={Styles.icon} />
            <a href={`mailto:${customer.email}`}>{customer.email}</a>
          </div>
        ) : (
          ''
        )}
        {customer.phoneNumber ? (
          <div className={Styles.phoneNumber}>
            <MdPhone className={Styles.icon} />
            <a href={`tel:${customer.phoneNumber}`}>
              <NumberFormat
                value={customer.phoneNumber}
                displayType={'text'}
                format='(###)-###-####'
              />
            </a>
          </div>
        ) : (
          ''
        )}
        {customer.secondaryPhoneNumber ? (
          <div className={Styles.phoneNumber}>
            <MdPhone className={Styles.icon} />
            <a href={`tel:${customer.secondaryPhoneNumber}`}>
              <NumberFormat
                value={customer.secondaryPhoneNumber}
                displayType={'text'}
                format='(###)-###-####'
              />
            </a>
          </div>
        ) : (
          ''
        )}
        <div className={Styles.buttonContainer}>
          <Link to={`/customers/edit/${customer._id}`}>
            <Button theme='RoundWithLabel'>
              <FaPencilAlt />
            </Button>
          </Link>
          <Button theme='RoundWithLabel' onClick={showDeleteCustomerModal}>
            <FaTrashAlt />
          </Button>
        </div>
      </Card>
    </div>
  );
};

CustomerCard.propTypes = {
  className: PropTypes.string,
  customer: PropTypes.shape({
    _id: PropTypes.string,
    address: PropTypes.string,
    email: PropTypes.string,
    locality: PropTypes.string,
    name: PropTypes.string,
    phoneNumber: PropTypes.string,
    secondaryPhoneNumber: PropTypes.string,
    storeName: PropTypes.string,
    town: PropTypes.string,
  }),
  navigate: PropTypes.bool,
};

export default CustomerCard;
