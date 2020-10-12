import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { MdSave } from 'react-icons/md';

import PageContainer from 'components/Atoms/PageContainer';
import { textConstants } from 'appConstants';
import Card from 'components/Atoms/Card';
import Form from 'components/Atoms/Form';
import Input from 'components/Atoms/Input';
import { useParams } from 'react-router-dom';
import BackButton from 'components/Atoms/BackButton';

import Styles from './AddEditProductPage.module.sass';
import { checkObjectsDiff } from 'utils/utils';

const AddEditProductPage = ({
  product,
  createEditProduct,
  fetchProduct,
  presentations,
  productTypes,
  fetchPresentations,
  fetchProductTypes,
}) => {
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
      <BackButton href={id ? `/products/${id}` : '/products'} />
      <Card
        className={Styles.AddEditCard}
        title={
          id ? textConstants.editProduct.TITLE : textConstants.addProduct.TITLE
        }
      >
        <Form
          buttonText={textConstants.misc.SAVE}
          buttonIcon={<MdSave />}
          loading={product.loading}
          onSubmit={saveProduct}
        >
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
            disabled={!!id}
            onChange={e => {
              setLocalProduct({ ...localProduct, weight: e.target.value });
            }}
          />
          <Input
            label={textConstants.product.BASE_PRICE}
            type='number'
            value={localProduct.basePrice}
            onChange={e => {
              setLocalProduct({ ...localProduct, basePrice: e.target.value });
            }}
          />
          <Input
            label={textConstants.product.SELLING_PRICE}
            type='number'
            value={localProduct.sellingPrice}
            onChange={e => {
              setLocalProduct({
                ...localProduct,
                sellingPrice: e.target.value,
              });
            }}
          />
          <Input
            label={textConstants.product.STOCK}
            type='number'
            value={localProduct.stock}
            onChange={e => {
              setLocalProduct({ ...localProduct, stock: e.target.value });
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
