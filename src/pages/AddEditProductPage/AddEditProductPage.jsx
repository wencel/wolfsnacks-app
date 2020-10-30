import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { MdSave } from 'react-icons/md';

import PageContainer from 'components/Atoms/PageContainer';
import { textConstants } from 'appConstants';
import Card from 'components/Atoms/Card';
import Form from 'components/Atoms/Form';
import Input from 'components/Atoms/Input';
import { useParams } from 'react-router-dom';

import Styles from './AddEditProductPage.module.sass';
import { checkObjectsDiff } from 'utils/utils';
import useSetActiveTab from 'reducers/hooks/useSetActiveTab';
import TopActions from 'components/Organisms/TopActions';
import { IoIosArrowDropleft } from 'react-icons/io';

const AddEditProductPage = ({
  product,
  createEditProduct,
  fetchProduct,
  presentations,
  productTypes,
  fetchPresentations,
  fetchProductTypes,
}) => {
  useSetActiveTab('products');
  const { id } = useParams();

  const [localProduct, setLocalProduct] = useState({
    name: '',
    presentation: '',
    weight: '',
    basePrice: '',
    sellingPrice: '',
    stock: '',
    _id: '',
  });
  const saveProduct = e => {
    e.preventDefault();
    const { createdAt, updatedAt, user, __v, ...rest } = localProduct;
    const data = id
      ? { ...checkObjectsDiff(product.data, rest), _id: id }
      : rest;
    createEditProduct(data);
  };
  useEffect(() => {
    if (product?.data) {
      setLocalProduct({ ...localProduct, ...product.data });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);
  useEffect(() => {
    fetchPresentations();
    fetchProductTypes();
    if (id) {
      fetchProduct(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <PageContainer>
      <Card
        className={Styles.AddEditCard}
        title={
          id ? textConstants.editProduct.TITLE : textConstants.addProduct.TITLE
        }
      >
        <Form loading={product.loading} onSubmit={saveProduct}>
          <TopActions
            buttons={[
              {
                text: textConstants.misc.BACK,
                icon: <IoIosArrowDropleft />,
                href: id ? `/products/${id}` : '/products',
                type: 'button',
              },
              {
                text: textConstants.misc.SAVE,
                icon: <MdSave />,
                type: 'submit',
              },
            ]}
          />
          <Input
            label={textConstants.product.NAME}
            type='select'
            options={productTypes}
            value={localProduct.name}
            disabled={!!id}
            onChange={e => {
              setLocalProduct({
                ...localProduct,
                name: e.target.value,
              });
            }}
          />
          <Input
            label={textConstants.product.PRESENTATION}
            type='select'
            options={presentations}
            value={localProduct.presentation}
            disabled={!!id}
            onChange={e => {
              setLocalProduct({
                ...localProduct,
                presentation: e.target.value,
              });
            }}
          />
          <Input
            label={textConstants.product.WEIGHT}
            type='number'
            value={localProduct.weight}
            suffix=' g'
            disabled={!!id}
            onValueChange={e => {
              setLocalProduct({ ...localProduct, weight: e.floatValue });
            }}
          />
          <Input
            label={textConstants.product.BASE_PRICE}
            type='number'
            value={localProduct.basePrice}
            prefix='$'
            onValueChange={e => {
              setLocalProduct({ ...localProduct, basePrice: e.floatValue });
            }}
          />
          <Input
            label={textConstants.product.SELLING_PRICE}
            type='number'
            value={localProduct.sellingPrice}
            prefix='$'
            onValueChange={e => {
              setLocalProduct({
                ...localProduct,
                sellingPrice: e.floatValue,
              });
            }}
          />
          <Input
            label={textConstants.product.STOCK}
            type='number'
            value={localProduct.stock}
            onValueChange={e => {
              setLocalProduct({ ...localProduct, stock: e.floatValue });
            }}
          />
        </Form>
      </Card>
      {id && (
        <Card
          className={Styles.AddEditCard}
          title={textConstants.misc.WARNING}
          description={textConstants.addProduct.WARNING_EDIT}
        />
      )}
    </PageContainer>
  );
};

AddEditProductPage.propTypes = {
  createEditProduct: PropTypes.func,
  product: PropTypes.shape({
    data: PropTypes.oneOfType([PropTypes.object, PropTypes.oneOf([null])]),
    error: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.oneOf([null]),
      PropTypes.object,
    ]),
    loading: PropTypes.bool,
    success: PropTypes.string,
  }),
  fetchProduct: PropTypes.func,
};

export default AddEditProductPage;
