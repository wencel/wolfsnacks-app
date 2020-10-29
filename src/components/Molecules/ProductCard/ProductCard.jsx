import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import { ImListNumbered } from 'react-icons/im';

import Card from 'components/Atoms/Card';
import classnames from 'classnames';
import { FaWeight } from 'react-icons/fa';
import { AiOutlineDollarCircle } from 'react-icons/ai';

import Styles from './ProductCard.module.sass';
import NavigationCardHeader from 'components/Atoms/NavigationCardHeader';
import Button from 'components/Atoms/Button';
import { Link } from 'react-router-dom';
import WarningModal from 'components/Organisms/WarningModal';
import { textConstants } from 'appConstants';
import NumberFormat from 'react-number-format';

const ProductCard = ({ product, className, navigate, deleteProduct }) => {
  const cardClasses = classnames({
    [Styles.ProductCard]: true,
    [className]: className,
  });
  const [showModal, setShowModal] = useState(false);
  const requestDeleteProduct = () => {
    deleteProduct(product._id);
    setShowModal(false);
  };
  const showDeleteProductModal = () => {
    setShowModal(true);
  };
  const hideDeleteProductModal = () => {
    setShowModal(false);
  };
  return (
    <div>
      <WarningModal
        closeModal={hideDeleteProductModal}
        showModal={showModal}
        title={textConstants.productPage.DELETE_CONFIRMATION_TITLE}
        description={
          <>
            {textConstants.productPage.DELETE_CONFIRMATION}{' '}
            <b>
              <i>{`${product?.name} ${product?.presentation} ${product?.weight} g`}</i>
            </b>
            ?
          </>
        }
        showCancelButton
        cancelAction={hideDeleteProductModal}
        cancelText={textConstants.misc.NO}
        confirmationAction={requestDeleteProduct}
        confirmationText={textConstants.misc.YES}
      />
      <Card
        className={cardClasses}
        title={
          navigate ? (
            <NavigationCardHeader
              title={
                <>
                  {product?.name} {product?.presentation}&nbsp;
                  <NumberFormat
                    value={product?.weight}
                    displayType={'text'}
                    suffix=' g'
                    thousandSeparator='.'
                    decimalSeparator=','
                  />
                </>
              }
              to={`/products/${product._id}`}
            />
          ) : (
            <>
              {product?.name} {product?.presentation}&nbsp;
              <NumberFormat
                value={product?.weight}
                displayType={'text'}
                suffix=' g'
                thousandSeparator='.'
                decimalSeparator=','
              />
            </>
          )
        }
        key={product._id}
      >
        <div className={Styles.stock}>
          <ImListNumbered className={Styles.icon} />
          {product.stock} {textConstants.misc.UNITS}&nbsp;
          <span>({textConstants.product.STOCK})</span>
        </div>
        <div className={Styles.basePrice}>
          <AiOutlineDollarCircle className={Styles.icon} />
          {textConstants.product.BASE_PRICE}&nbsp;
          <NumberFormat
            value={product?.basePrice}
            displayType={'text'}
            prefix='$'
            thousandSeparator='.'
            decimalSeparator=','
          />
        </div>
        <div className={Styles.sellingPrice}>
          <AiOutlineDollarCircle className={Styles.icon} />
          {textConstants.product.SELLING_PRICE}&nbsp;
          <NumberFormat
            value={product?.sellingPrice}
            displayType={'text'}
            prefix='$'
            thousandSeparator='.'
            decimalSeparator=','
          />
        </div>
        <div className={Styles.buttonContainer}>
          <Link to={`/products/edit/${product._id}`}>
            <Button theme='RoundWithLabel'>
              <FaPencilAlt />
            </Button>
          </Link>
          <Button theme='RoundWithLabel' onClick={showDeleteProductModal}>
            <FaTrashAlt />
          </Button>
        </div>
      </Card>
    </div>
  );
};

ProductCard.propTypes = {
  className: PropTypes.string,
  product: PropTypes.shape({
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

export default ProductCard;
