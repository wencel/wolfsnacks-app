import PropTypes from 'prop-types';
import React, { useState } from 'react';
import NumberFormat from 'react-number-format';
import moment from 'moment';
import 'moment/locale/es';

import { FaDog, FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import { BiCalendarAlt } from 'react-icons/bi';

import Card from 'components/Atoms/Card';
import classnames from 'classnames';
import { AiOutlineDollarCircle } from 'react-icons/ai';

import Styles from './OrderCard.module.sass';
import NavigationCardHeader from 'components/Atoms/NavigationCardHeader';
import Button from 'components/Atoms/Button';
import { Link } from 'react-router-dom';
import WarningModal from 'components/Organisms/WarningModal';
import { textConstants } from 'appConstants';
import Divider from 'components/Atoms/Divider';

const OrderCard = ({ order, className, navigate, deleteOrder, products }) => {
  const cardClasses = classnames({
    [Styles.OrderCard]: true,
    [className]: className,
  });
  const [showModal, setShowModal] = useState(false);
  const orderDate = moment(order?.orderDate)
    .locale('es')
    .format('Do MMMM  YYYY');
  const requestDeleteOrder = () => {
    deleteOrder(order._id);
    setShowModal(false);
  };
  const showDeleteOrderModal = () => {
    setShowModal(true);
  };
  const hideDeleteOrderModal = () => {
    setShowModal(false);
  };
  return (
    <div>
      <WarningModal
        closeModal={hideDeleteOrderModal}
        showModal={showModal}
        title={textConstants.orderPage.DELETE_CONFIRMATION_TITLE}
        description={
          <>
            {textConstants.orderPage.DELETE_CONFIRMATION}{' '}
            <b>
              <i>
                <NumberFormat
                  value={order.orderId}
                  displayType={'text'}
                  thousandSeparator='.'
                  decimalSeparator=','
                  prefix='#'
                />
              </i>
            </b>{' '}
            del{' '}
            <b>
              <i>{orderDate}</i>
            </b>
            ?
          </>
        }
        showCancelButton
        cancelAction={hideDeleteOrderModal}
        cancelText={textConstants.misc.NO}
        confirmationAction={requestDeleteOrder}
        confirmationText={textConstants.misc.YES}
      />
      <Card
        className={cardClasses}
        title={
          navigate ? (
            <NavigationCardHeader
              title={
                <>
                  {textConstants.orderPage.ORDER}{' '}
                  <NumberFormat
                    value={order.orderId}
                    displayType={'text'}
                    thousandSeparator='.'
                    decimalSeparator=','
                    prefix='#'
                  />
                </>
              }
              to={`/orders/${order._id}`}
            />
          ) : (
            <>
              {textConstants.orderPage.ORDER}{' '}
              <NumberFormat
                value={order.orderId}
                displayType={'text'}
                thousandSeparator='.'
                decimalSeparator=','
              />
            </>
          )
        }
      >
        <div className={Styles.date}>
          <BiCalendarAlt className={Styles.icon} />
          {orderDate}
        </div>
        {order?.products?.map(p => {
          const product = products.find(prod => prod._id === p.product);
          return (
            <div key={p.product}>
              <div className={Styles.products}>
                <FaDog className={Styles.icon} />
                {`${product?.name} ${product?.presentation}`}
                &nbsp;
                <NumberFormat
                  value={product?.weight}
                  displayType={'text'}
                  suffix='g'
                  thousandSeparator='.'
                  decimalSeparator=','
                />
                &nbsp;
                <span className={Styles.spanl}>
                  ({`${p.quantity} ${textConstants.misc.UNITS}`})
                </span>
              </div>
              {!navigate && (
                <>
                  <div className={Styles.totalPrice}>
                    <AiOutlineDollarCircle className={Styles.icon} />
                    <span className={Styles.spanl}>
                      {textConstants.order.PRODUCT_TOTAL_PRICE}&nbsp;
                    </span>
                    <NumberFormat
                      value={p.quantity * product?.basePrice}
                      displayType={'text'}
                      prefix='$'
                      thousandSeparator='.'
                      decimalSeparator=','
                    />
                  </div>
                  <Divider />
                </>
              )}
            </div>
          );
        })}
        <div className={Styles.totalPrice}>
          <AiOutlineDollarCircle className={Styles.icon} />
          <span className={Styles.spanl}>
            {textConstants.order.TOTAL_PRICE}&nbsp;
          </span>
          <NumberFormat
            value={order.totalPrice}
            displayType={'text'}
            prefix='$'
            thousandSeparator='.'
            decimalSeparator=','
          />
        </div>
        <div className={Styles.buttonContainer}>
          <Link to={`/orders/edit/${order._id}`}>
            <Button theme='RoundWithLabel'>
              <FaPencilAlt />
            </Button>
          </Link>
          <Button theme='RoundWithLabel' onClick={showDeleteOrderModal}>
            <FaTrashAlt />
          </Button>
        </div>
      </Card>
    </div>
  );
};

OrderCard.propTypes = {
  className: PropTypes.string,
  order: PropTypes.shape({
    _id: PropTypes.string,
    address: PropTypes.string,
    email: PropTypes.string,
    locality: PropTypes.string,
    name: PropTypes.string,
    phoneNumber: PropTypes.string,
    storeName: PropTypes.string,
    town: PropTypes.string,
  }),
  navigate: PropTypes.bool,
};

export default OrderCard;
