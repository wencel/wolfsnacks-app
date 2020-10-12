import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

import PageContainer from 'components/Atoms/PageContainer';
import ProductCard from 'components/Molecules/ProductCard';

import Styles from './ProductPage.module.sass';
import Loading from 'components/Atoms/Loading';
import { useParams } from 'react-router-dom';
import BackButton from 'components/Atoms/BackButton';

const ProductPage = ({ product, fetchProduct, resetProduct }) => {
  const { id } = useParams();
  useEffect(() => {
    fetchProduct(id);
    return () => {
      resetProduct();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <PageContainer>
        <Loading visible={product.loading} />
        <BackButton href='/products' />
        <ProductCard
          className={Styles.productCard}
          product={product.data || {}}
        />
      </PageContainer>
    </>
  );
};

ProductPage.propTypes = {
  product: PropTypes.shape({
    loading: PropTypes.bool,
  }),
  fetchProduct: PropTypes.func,
};

export default ProductPage;
