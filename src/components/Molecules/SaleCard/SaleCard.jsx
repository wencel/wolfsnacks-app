import PropTypes from 'prop-types';
import React, { useState } from 'react';
import moment from 'moment';
import 'moment/locale/es';

import { FaDog, FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import { MdPlusOne, MdPerson } from 'react-icons/md';
import { AiOutlineDollarCircle } from 'react-icons/ai';

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

const SaleCard = ({ sale, className, navigate, deleteSale, products }) => {
  const cardClasses = classnames({
    [Styles.SaleCard]: true,
    [className]: className,
  });
  const [showModal, setShowModal] = useState(false);
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
        description={textConstants.salePage.DELETE_CONFIRMATION}
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
              title={`${textConstants.salePage.SALE} ${moment(sale?.createdAt)
                .locale('es')
                .format('MMMM Do YYYY')}`}
              to={`/sales/${sale._id}`}
            />
          ) : (
            `${textConstants.salePage.SALE} ${moment(sale?.createdAt)
              .locale('es')
              .format('MMMM Do YYYY')}`
          )
        }
      >
        <div className={Styles.products}>
          <MdPerson className={Styles.icon} />
          {sale.customer?.storeName}
        </div>
        <Divider />
        {sale?.products?.map(p => {
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
                    <span>{textConstants.sale.PRODUCT_TOTAL_PRICE}&nbsp;</span>$
                    {calculateTotalPriceProduct(
                      product?.sellingPrice,
                      p.quantity,
                      sale.isThirteenDozen
                    )}
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
          <span>{textConstants.sale.PARTIAL_PAYMENT}&nbsp;</span>$
          {sale.partialPayment}
        </div>
        <div className={Styles.totalPrice}>
          <AiOutlineDollarCircle className={Styles.icon} />
          <span>{textConstants.sale.REMAINING_PAYMENT}&nbsp;</span>$
          {sale.totalPrice - sale.partialPayment}
        </div>
        <Divider />
        <div className={Styles.totalPrice}>
          <AiOutlineDollarCircle className={Styles.icon} />
          <span>{textConstants.sale.TOTAL_PRICE}&nbsp;</span>${sale.totalPrice}
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
