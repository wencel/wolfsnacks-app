import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { MdSave, MdPlaylistAdd } from 'react-icons/md';

import PageContainer from 'components/Atoms/PageContainer';
import { textConstants } from 'appConstants';
import Card from 'components/Atoms/Card';
import Form from 'components/Atoms/Form';
import Input from 'components/Atoms/Input';
import { useParams } from 'react-router-dom';

import Styles from './AddEditSalePage.module.sass';
import Button from 'components/Atoms/Button';
import { FaTrashAlt } from 'react-icons/fa';
import SubCard from 'components/Atoms/SubCard';
import Checkbox from 'components/Atoms/Checkbox/Checkbox';
import SearchField from 'components/Molecules/SearchField';
import { calculateTotalPriceProduct } from 'utils/utils';
import Calendar from 'components/Atoms/Calendar';
import useSetActiveTab from 'reducers/hooks/useSetActiveTab';
import TopActions from 'components/Organisms/TopActions';
import { IoIosArrowDropleft } from 'react-icons/io';
import { FiSearch } from 'react-icons/fi';
import Label from 'components/Atoms/Label';

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
  useSetActiveTab('sales');
  const { id } = useParams();
  const [customer, setCustomer] = useState({});
  const pageContainerRef = useRef(null);

  const [localSale, setLocalSale] = useState({
    totalPrice: 0,
    isThirteenDozen: false,
    owes: false,
    partialPayment: '',
    products: [],
    customer: '',
    saleDate: new Date(),
    _id: '',
  });

  const saveSale = e => {
    e.preventDefault();
    const { createdAt, updatedAt, user, __v, saleId, ...rest } = localSale;
    createEditSale({ ...rest, saleDate: rest.saleDate.toISOString() });
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
        saleDate: new Date(sale.data.saleDate),
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
      <Card
        className={Styles.AddEditCard}
        title={id ? textConstants.editSale.TITLE : textConstants.addSale.TITLE}
      >
        <Form loading={sale.loading} onSubmit={saveSale}>
          <TopActions
            buttons={[
              {
                text: textConstants.misc.BACK,
                icon: <IoIosArrowDropleft />,
                href: id ? `/sales/${id}` : '/sales',
                type: 'button',
              },
              {
                text: textConstants.addSale.ADD_PRODUCT,
                icon: <MdPlaylistAdd />,
                type: 'button',
                onClick: addProduct,
              },
              {
                text: textConstants.misc.SAVE,
                icon: <MdSave />,
                type: 'submit',
              },
            ]}
          />
          <SearchField
            onSearch={fetchCustomers}
            isLoading={customers.loading}
            label={
              <div className={Styles.label}>
                <FiSearch />
                {textConstants.addSale.SEARCH_CUSTOMER}
              </div>
            }
            onSelect={c => {
              setCustomer(c);
            }}
            value={
              customer.storeName
                ? `${customer.storeName} ${
                    customer.name ? `(${customer.name})` : ''
                  }`
                : null
            }
            valueLabel={textConstants.sale.CUSTOMER}
            itemsList={customers.data.data.map(customer => ({
              label: `${customer.storeName} ${
                customer.name ? `(${customer.name})` : ''
              }`,
              value: customer,
            }))}
          />
          <Input
            label={textConstants.sale.TOTAL_PRICE}
            type='number'
            prefix='$'
            value={
              Number.parseInt(localSale.totalPrice)
                ? Number.parseInt(localSale.totalPrice)
                : 0
            }
            disabled
          />
          <Input
            label={textConstants.sale.PARTIAL_PAYMENT}
            prefix='$'
            type='number'
            value={localSale.partialPayment}
            onValueChange={e => {
              setLocalSale({
                ...localSale,
                partialPayment: e.floatValue,
              });
            }}
          />
          <Label className={Styles.label}>
            {textConstants.salePage.SALE_DATE}
          </Label>
          <Calendar
            isRange={false}
            onChange={value => {
              setLocalSale({
                ...localSale,
                saleDate: value,
              });
            }}
            value={localSale.saleDate}
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
                value={product.quantity ? product.quantity : ''}
                onValueChange={e => {
                  updateProduct(index, {
                    ...product,
                    quantity: e.floatValue,
                    totalPrice: calculateTotalPriceProduct(
                      product.price,
                      e.floatValue,
                      localSale.isThirteenDozen
                    ),
                  });
                }}
              />
              <Input
                label={textConstants.sale.PRICE}
                prefix='$'
                type='number'
                value={product.price}
                disabled
              />
              <Input
                label={textConstants.sale.PRODUCT_TOTAL_PRICE}
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

AddEditSalePage.propTypes = {
  createEditSale: PropTypes.func,
  fetchSale: PropTypes.func,
  products: PropTypes.array,
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
