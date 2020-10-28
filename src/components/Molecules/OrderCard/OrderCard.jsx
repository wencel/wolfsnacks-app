import PropTypes from 'prop-types';
import React, { useState } from 'react';
import moment from 'moment';
import 'moment/locale/es';

import { FaDog, FaPencilAlt, FaTrashAlt } from 'react-icons/fa';

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
              <i>{order?._id}</i>
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
              title={`${textConstants.orderPage.ORDER} ${moment(
                order?.createdAt
              )
                .locale('es')
                .format('MMMM Do YYYY')}`}
              to={`/orders/${order._id}`}
            />
          ) : (
            `${textConstants.orderPage.ORDER} ${moment(order?.createdAt)
              .locale('es')
              .format('MMMM Do YYYY')}`
          )
        }
      >
        {order?.products?.map(p => {
          const product = products.find(prod => prod._id === p.product);
          return (
            <div key={p.product}>
              <div className={Styles.products}>
                <FaDog className={Styles.icon} />
                {`${product?.name} ${product?.presentation} ${product?.weight} g`}
                &nbsp;
                <span>({`${p.quantity} ${textConstants.misc.UNITS}`})</span>
              </div>
              {!navigate && (
                <>
                  <div className={Styles.totalPrice}>
                    <AiOutlineDollarCircle className={Styles.icon} />
                    <span>{textConstants.order.PRODUCT_TOTAL_PRICE}&nbsp;</span>
                    ${p.quantity * product?.basePrice}
                  </div>
                  <Divider />
                </>
              )}
            </div>
          );
        })}
        <div className={Styles.totalPrice}>
          <AiOutlineDollarCircle className={Styles.icon} />
          <span>{textConstants.order.TOTAL_PRICE}&nbsp;</span>$
          {order.totalPrice}
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
