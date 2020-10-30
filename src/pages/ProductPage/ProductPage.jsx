import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

import PageContainer from 'components/Atoms/PageContainer';
import ProductCard from 'components/Molecules/ProductCard';

import Styles from './ProductPage.module.sass';
import Loading from 'components/Atoms/Loading';
import { useParams } from 'react-router-dom';
import useSetActiveTab from 'reducers/hooks/useSetActiveTab';
import { textConstants } from 'appConstants';
import TopActions from 'components/Organisms/TopActions';
import { IoIosArrowDropleft } from 'react-icons/io';
import { MdPlaylistAdd } from 'react-icons/md';

const ProductPage = ({ product, fetchProduct, resetProduct }) => {
  useSetActiveTab('products');
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
        <TopActions
          buttons={[
            {
              text: textConstants.misc.BACK,
              icon: <IoIosArrowDropleft />,
              href: '/products',
            },
            {
              text: textConstants.addProduct.ADD_PRODUCT,
              icon: <MdPlaylistAdd />,
              href: '/products/new',
            },
          ]}
        />
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
