import PropTypes from 'prop-types';
import React, { useState } from 'react';
import moment from 'moment';
import 'moment/locale/es';

import { FaDog, FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import { MdPlusOne, MdPerson } from 'react-icons/md';
import { AiOutlineDollarCircle } from 'react-icons/ai';
import { BiCalendarAlt } from 'react-icons/bi';

import Card from 'components/Atoms/Card';
import classnames from 'classnames';

import Styles from './SaleCard.module.sass';
import NavigationCardHeader from 'components/Atoms/NavigationCardHeader';
import Button from 'components/Atoms/Button';
import { Link } from 'react-router-dom';
import WarningModal from 'components/Organisms/WarningModal';
import { textConstants } from 'appConstants';
import Divider from 'components/Atoms/Divider';
import { calculateTotalPriceProduct } from 'utils/utils';
import NumberFormat from 'react-number-format';

const SaleCard = ({ sale, className, navigate, deleteSale, products }) => {
  const cardClasses = classnames({
    [Styles.SaleCard]: true,
    [className]: className,
  });
  const [showModal, setShowModal] = useState(false);
  const saleDate = moment(sale?.saleDate).locale('es').format('MMMM Do YYYY');
  const requestDeleteSale = () => {
    deleteSale(sale._id);
    setShowModal(false);
  };
  const showDeleteSaleModal = () => {
    setShowModal(true);
  };
  const hideDeleteSaleModal = () => {
    setShowModal(false);
  };
  return (
    <div>
      <WarningModal
        closeModal={hideDeleteSaleModal}
        showModal={showModal}
        title={textConstants.salePage.DELETE_CONFIRMATION_TITLE}
        description={
          <>
            {textConstants.salePage.DELETE_CONFIRMATION}{' '}
            <b>
              <i>{sale?.saleDate}</i>
            </b>{' '}
            del{' '}
            <b>
              <i>{saleDate}</i>
            </b>
            ?
          </>
        }
        showCancelButton
        cancelAction={hideDeleteSaleModal}
        cancelText={textConstants.misc.NO}
        confirmationAction={requestDeleteSale}
        confirmationText={textConstants.misc.YES}
      />
      <Card
        className={cardClasses}
        title={
          navigate ? (
            <NavigationCardHeader
              title={
                <>
                  {textConstants.salePage.SALE}{' '}
                  <NumberFormat
                    value={sale.orderId}
                    displayType={'text'}
                    thousandSeparator='.'
                    decimalSeparator=','
                  />
                </>
              }
              to={`/sales/${sale._id}`}
            />
          ) : (
            <>
              {textConstants.salePage.SALE}{' '}
              <NumberFormat
                value={sale.orderId}
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
          {saleDate}
        </div>
        <div className={Styles.products}>
          <MdPerson className={Styles.icon} />
          {sale.customer?.storeName}{' '}
          {sale.customer?.name ? `(${sale.customer?.name})` : ''}
        </div>
        <Divider />
        {sale?.products?.map(p => {
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
                <span className={Styles.span}>
                  ({`${p.quantity} ${textConstants.misc.UNITS}`})
                </span>
              </div>
              {!navigate && (
                <>
                  <div className={Styles.totalPrice}>
                    <AiOutlineDollarCircle className={Styles.icon} />
                    <span className={Styles.span}>
                      {textConstants.sale.PRODUCT_TOTAL_PRICE}&nbsp;
                    </span>
                    <NumberFormat
                      value={calculateTotalPriceProduct(
                        product?.sellingPrice,
                        p.quantity,
                        sale.isThirteenDozen
                      )}
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
        {sale.isThirteenDozen && (
          <div className={Styles.products}>
            <MdPlusOne className={Styles.icon} />
            {textConstants.sale.IS_THIRTEEN_DOZEN}
          </div>
        )}
        <div className={Styles.totalPrice}>
          <AiOutlineDollarCircle className={Styles.icon} />
          <span className={Styles.span}>
            {textConstants.sale.PARTIAL_PAYMENT}&nbsp;
          </span>
          <NumberFormat
            value={sale.partialPayment}
            displayType={'text'}
            prefix='$'
            thousandSeparator='.'
            decimalSeparator=','
          />
        </div>
        <div className={Styles.totalPrice}>
          <AiOutlineDollarCircle className={Styles.icon} />
          <span className={Styles.span}>
            {textConstants.sale.REMAINING_PAYMENT}&nbsp;
          </span>
          <NumberFormat
            value={sale.totalPrice - sale.partialPayment}
            displayType={'text'}
            prefix='$'
            thousandSeparator='.'
            decimalSeparator=','
          />
        </div>
        <Divider />
        <div className={Styles.totalPrice}>
          <AiOutlineDollarCircle className={Styles.icon} />
          <span className={Styles.span}>
            {textConstants.sale.TOTAL_PRICE}&nbsp;
          </span>
          <NumberFormat
            value={sale.totalPrice}
            displayType={'text'}
            prefix='$'
            thousandSeparator='.'
            decimalSeparator=','
          />
        </div>
        <div className={Styles.buttonContainer}>
          <Link to={`/sales/edit/${sale._id}`}>
            <Button theme='RoundWithLabel'>
              <FaPencilAlt />
            </Button>
          </Link>
          <Button theme='RoundWithLabel' onClick={showDeleteSaleModal}>
            <FaTrashAlt />
          </Button>
        </div>
      </Card>
    </div>
  );
};

SaleCard.propTypes = {
  className: PropTypes.string,
  sale: PropTypes.shape({
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

export default SaleCard;
