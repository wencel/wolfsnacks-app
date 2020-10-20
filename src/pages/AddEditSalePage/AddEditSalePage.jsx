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

import Styles from './AddEditSalePage.module.sass';
import Button from 'components/Atoms/Button';
import { FaTrashAlt } from 'react-icons/fa';
import SubCard from 'components/Atoms/SubCard';
import Checkbox from 'components/Atoms/Checkbox/Checkbox';
import SearchField from 'components/Molecules/SearchField';
import { calculateTotalPriceProduct } from 'utils/utils';

const AddEditSalePage = ({
  sale,
  createEditSale,
  fetchSale,
  requestProductsList,
  resetProductsList,
  products,
  requestCustomersList,
  resetCustomersList,
  customers,
}) => {
  const { id } = useParams();
  const [customer, setCustomer] = useState({});
  const pageContainerRef = useRef(null);

  const [localSale, setLocalSale] = useState({
    totalPrice: 0,
    isThirteenDozen: false,
    owes: false,
    partialPayment: 0,
    products: [],
    customer: '',
    _id: '',
  });

  const saveSale = e => {
    e.preventDefault();
    const { createdAt, updatedAt, user, __v, ...rest } = localSale;
    createEditSale(rest);
  };

  const updateProduct = (index, product) => {
    const productsToUpdate = [...localSale.products];
    productsToUpdate[index] = product;
    setLocalSale({ ...localSale, products: productsToUpdate });
  };

  const addProduct = () => {
    let areAllProductsSet = true;
    localSale.products.forEach(p => {
      if (!p.product) {
        areAllProductsSet = false;
      }
    });
    if (!areAllProductsSet) return;
    setLocalSale({
      ...localSale,
      products: [
        ...localSale.products,
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
    setLocalSale({
      ...localSale,
      products: localSale.products.filter((p, i) => index !== i),
    });
  };

  const fetchCustomers = textQuery => {
    resetCustomersList();
    if (textQuery) {
      requestCustomersList({
        limit: 10,
        textQuery,
      });
    }
  };

  useEffect(() => {
    resetProductsList();
    resetCustomersList();
    requestProductsList({
      limit: 100,
    });
    if (id) {
      fetchSale(id);
    } else {
      setTimeout(() => {
        addProduct();
      }, 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (sale?.data) {
      setCustomer(sale.data.customer);
      setLocalSale({
        ...localSale,
        ...sale.data,
        customer: sale.data.customer._id,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sale]);

  useEffect(() => {
    const totalPrice = localSale.products.reduce(
      (accumulator, p) => accumulator + p.totalPrice,
      0
    );
    setLocalSale({ ...localSale, totalPrice });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localSale.products]);

  useEffect(() => {
    const productsToUpdate = localSale.products.map(p => {
      return {
        ...p,
        totalPrice: calculateTotalPriceProduct(
          p.price,
          p.quantity,
          localSale.isThirteenDozen
        ),
      };
    });
    setLocalSale({ ...localSale, products: productsToUpdate });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localSale.isThirteenDozen]);

  useEffect(() => {
    setLocalSale({ ...localSale, customer: customer?._id });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customer]);

  useEffect(() => {
    const owes = localSale.partialPayment < localSale.totalPrice;
    setLocalSale({
      ...localSale,
      owes,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localSale.partialPayment, localSale.totalPrice]);

  return (
    <PageContainer containerRef={pageContainerRef}>
      <BackButton href={id ? `/sales/${id}` : '/sales'} />
      <Card
        className={Styles.AddEditCard}
        title={id ? textConstants.editSale.TITLE : textConstants.addSale.TITLE}
      >
        <Form
          buttonText={textConstants.misc.SAVE}
          buttonIcon={<MdSave />}
          secondButtonText={textConstants.addSale.ADD_PRODUCT}
          secondButtonProps={{
            onClick: addProduct,
          }}
          secondButtonIcon={<MdPlaylistAdd />}
          loading={sale.loading}
          onSubmit={saveSale}
        >
          <SearchField
            onSearch={fetchCustomers}
            isLoading={customers.loading}
            label={textConstants.addSale.SEARCH_CUSTOMER}
            onSelect={c => {
              setCustomer(c);
            }}
            value={customer?.storeName}
            valueLabel={textConstants.sale.CUSTOMER}
            itemsList={customers.data.data.map(customer => ({
              label: `${customer.storeName} (${customer.name})`,
              value: customer,
            }))}
          />
          <Input
            label={textConstants.sale.TOTAL_PRICE}
            type='text'
            value={localSale.totalPrice}
            disabled
          />
          <Input
            label={textConstants.sale.PARTIAL_PAYMENT}
            type='number'
            value={localSale.partialPayment}
            onChange={e => {
              setLocalSale({
                ...localSale,
                partialPayment: e.target.value,
              });
            }}
          />
          <div className={Styles.checkbox}>
            <Checkbox
              label={textConstants.sale.OWES}
              checked={localSale.owes}
              disabled
            />
          </div>
          <div className={Styles.checkbox}>
            <Checkbox
              label={textConstants.sale.IS_THIRTEEN_DOZEN}
              checked={localSale.isThirteenDozen}
              onChange={e => {
                setLocalSale({
                  ...localSale,
                  isThirteenDozen: e.target.checked,
                });
              }}
            />
          </div>
          {localSale.products.map((product, index) => (
            <SubCard key={`${product._id}${index}`}>
              {localSale.products.length > 1 && (
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
                label={textConstants.sale.PRODUCT}
                type='select'
                options={products}
                value={product.product}
                onChange={e => {
                  const p = products.find(p => p._id === e.target.value);
                  updateProduct(index, {
                    ...product,
                    product: e.target.value,
                    price: p.sellingPrice,
                    totalPrice: calculateTotalPriceProduct(
                      p.sellingPrice,
                      product.quantity,
                      localSale.isThirteenDozen
                    ),
                  });
                }}
              />
              <Input
                label={textConstants.sale.QUANTITY}
                type='number'
                value={product.quantity}
                onChange={e => {
                  updateProduct(index, {
                    ...product,
                    quantity: Number(e.target.value),
                    totalPrice: calculateTotalPriceProduct(
                      product.price,
                      Number(e.target.value),
                      localSale.isThirteenDozen
                    ),
                  });
                }}
              />
              <Input
                label={textConstants.sale.PRICE}
                type='number'
                value={product.price}
                disabled
              />
              <Input
                label={textConstants.sale.PRODUCT_TOTAL_PRICE}
                type='number'
                value={product.totalPrice}
                disabled
              />
            </SubCard>
          ))}
        </Form>
      </Card>
    </PageContainer>
  );
};

AddEditSalePage.propTypes = {
  createEditSale: PropTypes.func,
  fetchSale: PropTypes.func,
  products: PropTypes.shape({
    find: PropTypes.func,
  }),
  requestCustomersList: PropTypes.func,
  requestProductsList: PropTypes.func,
  resetCustomersList: PropTypes.func,
  resetProductsList: PropTypes.func,
  sale: PropTypes.shape({
    data: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.object]),
    error: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.oneOf([null]),
      PropTypes.object,
    ]),
    loading: PropTypes.bool,
    success: PropTypes.string,
  }),
};

export default AddEditSalePage;
