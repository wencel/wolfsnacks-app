import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { MdSave, MdPlaylistAdd } from 'react-icons/md';

import PageContainer from 'components/Atoms/PageContainer';
import { textConstants } from 'appConstants';
import Card from 'components/Atoms/Card';
import Form from 'components/Atoms/Form';
import Input from 'components/Atoms/Input';
import { useParams } from 'react-router-dom';
import BackButton from 'components/Atoms/BackButton';

import Styles from './AddEditOrderPage.module.sass';
import Button from 'components/Atoms/Button';
import { FaTrashAlt } from 'react-icons/fa';
import SubCard from 'components/Atoms/SubCard';
import Calendar from 'components/Atoms/Calendar';
import useSetActiveTab from 'reducers/hooks/useSetActiveTab';

const AddEditOrderPage = ({
  order,
  createEditOrder,
  fetchOrder,
  requestProductsList,
  resetProductsList,
  products,
}) => {
  useSetActiveTab('orders');
  const { id } = useParams();

  const pageContainerRef = useRef(null);

  const [localOrder, setLocalOrder] = useState({
    totalPrice: 0,
    orderDate: new Date(),
    products: [],
    _id: '',
  });

  const saveOrder = e => {
    e.preventDefault();
    const { createdAt, updatedAt, user, __v, orderId, ...rest } = localOrder;
    createEditOrder({ ...rest, orderDate: rest.orderDate.toISOString() });
  };

  const updateProduct = (index, product) => {
    const productsToUpdate = [...localOrder.products];
    productsToUpdate[index] = product;
    setLocalOrder({ ...localOrder, products: productsToUpdate });
  };

  const addProduct = () => {
    let areAllProductsSet = true;
    localOrder.products.forEach(p => {
      if (!p.product) {
        areAllProductsSet = false;
      }
    });
    if (!areAllProductsSet) return;
    setLocalOrder({
      ...localOrder,
      products: [
        ...localOrder.products,
        {
          product: '',
          price: 0,
          quantity: 0,
          totalPrice: 0,
        },
      ],
    });
    setTimeout(() => {
      pageContainerRef.current.scrollTo({
        top: pageContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }, 400);
  };

  const removeProduct = index => {
    setLocalOrder({
      ...localOrder,
      products: localOrder.products.filter((p, i) => index !== i),
    });
  };

  useEffect(() => {
    if (order?.data) {
      setLocalOrder({
        ...localOrder,
        ...order.data,
        orderDate: new Date(order.data.orderDate),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order]);

  useEffect(() => {
    resetProductsList();
    requestProductsList({
      limit: 100,
    });
    if (id) {
      fetchOrder(id);
    } else {
      setTimeout(() => {
        addProduct();
      }, 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const totalPrice = localOrder.products.reduce(
      (accumulator, p) => accumulator + p.totalPrice,
      0
    );
    setLocalOrder({ ...localOrder, totalPrice });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localOrder.products]);

  return (
    <PageContainer containerRef={pageContainerRef}>
      <BackButton href={id ? `/orders/${id}` : '/orders'} />
      <Card
        className={Styles.AddEditCard}
        title={
          id ? textConstants.editOrder.TITLE : textConstants.addOrder.TITLE
        }
      >
        <Form
          buttonText={textConstants.misc.SAVE}
          buttonIcon={<MdSave />}
          secondButtonText={textConstants.addOrder.ADD_PRODUCT}
          secondButtonProps={{
            onClick: addProduct,
          }}
          secondButtonIcon={<MdPlaylistAdd />}
          loading={order.loading}
          onSubmit={saveOrder}
        >
          <Input
            label={textConstants.order.TOTAL_PRICE}
            prefix='$'
            type='number'
            value={
              Number.parseInt(localOrder.totalPrice)
                ? Number.parseInt(localOrder.totalPrice)
                : 0
            }
            disabled
          />
          <Calendar
            isRange={false}
            onChange={value => {
              setLocalOrder({
                ...localOrder,
                orderDate: value,
              });
            }}
            value={localOrder.orderDate}
          />
          {localOrder.products.map((product, index) => (
            <SubCard key={`${product._id}${index}`}>
              {localOrder.products.length > 1 && (
                <Button
                  theme='RoundWithLabel'
                  onClick={() => {
                    removeProduct(index);
                  }}
                  type='button'
                  className={Styles.trashButton}
                >
                  <FaTrashAlt />
                </Button>
              )}
              <Input
                label={textConstants.order.PRODUCT}
                type='select'
                options={products}
                value={product.product}
                onChange={e => {
                  const p = products.find(p => p._id === e.target.value);
                  updateProduct(index, {
                    ...product,
                    product: e.target.value,
                    price: p.basePrice,
                    totalPrice: p.basePrice * product.quantity,
                  });
                }}
              />
              <Input
                label={textConstants.order.QUANTITY}
                type='number'
                value={product.quantity}
                onValueChange={e => {
                  updateProduct(index, {
                    ...product,
                    quantity: e.floatValue,
                    totalPrice: product.price * e.floatValue,
                  });
                }}
              />
              <Input
                label={textConstants.order.PRICE}
                prefix='$'
                type='number'
                value={product.price}
                disabled
              />
              <Input
                label={textConstants.order.PRODUCT_TOTAL_PRICE}
                prefix='$'
                type='number'
                value={
                  Number.parseInt(product.totalPrice)
                    ? Number.parseInt(product.totalPrice)
                    : 0
                }
                disabled
              />
            </SubCard>
          ))}
        </Form>
      </Card>
    </PageContainer>
  );
};

AddEditOrderPage.propTypes = {
  createEditOrder: PropTypes.func,
  fetchOrder: PropTypes.func,
  order: PropTypes.shape({
    data: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.object]),
    error: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.oneOf([null]),
      PropTypes.object,
    ]),
    loading: PropTypes.bool,
    success: PropTypes.string,
  }),
  products: PropTypes.array,
  requestProductsList: PropTypes.func,
  resetProductsList: PropTypes.func,
};

export default AddEditOrderPage;
