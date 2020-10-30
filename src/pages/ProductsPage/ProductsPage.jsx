import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { RiFilterLine, RiFilterOffLine } from 'react-icons/ri';
import { MdPlaylistAdd } from 'react-icons/md';

import Card from 'components/Atoms/Card';
import PageContainer from 'components/Atoms/PageContainer';
import ProductCard from 'components/Molecules/ProductCard';
import TopActions from 'components/Organisms/TopActions';
// import ProductFilterModal from 'components/Organisms/ProductFilterModal';
import { textConstants } from 'appConstants';

import Styles from './ProductsPage.module.sass';
import Loading from 'components/Atoms/Loading';
import ProductFilterModal from 'components/Organisms/ProductFilterModal';
import useSetActiveTab from 'reducers/hooks/useSetActiveTab';

const ProductsPage = ({ products, requestProductsList, resetProductsList }) => {
  useSetActiveTab('products');
  const paginationLimit = 10;
  const [showFiltersModal, setShowFiltersModal] = useState(false);
  const [textQuery, setTextQuery] = useState('');
  const [sortBy, setSortBy] = useState('storeName');
  const [direction, setDirection] = useState('asc');

  useEffect(() => {
    resetProductsList();
    requestProductsList({
      limit: paginationLimit,
      textQuery,
      sortBy: `${sortBy}:${direction}`,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    resetProductsList();
    requestProductsList({
      textQuery,
      sortBy: `${sortBy}:${direction}`,
      limit: paginationLimit,
      skip: 0,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textQuery, sortBy, direction, paginationLimit]);
  const onScrollContent = e => {
    if (
      e.target.offsetHeight + e.target.scrollTop >=
      e.target.scrollHeight - 200
    ) {
      if (
        !products.loading &&
        products.data.data.length < products.data.total
      ) {
        requestProductsList({
          textQuery,
          sortBy: `${sortBy}:${direction}`,
          limit: paginationLimit,
          skip: products.data.skip + paginationLimit,
        });
      }
    }
  };
  const resetFilters = () => {
    setTextQuery('');
    setSortBy('name');
    setDirection('asc');
    setShowFiltersModal(false);
  };
  const applyFilters = q => {
    setTextQuery(q.textQuery);
    setSortBy(q.sortBy);
    setDirection(q.direction);
    setShowFiltersModal(false);
  };
  return (
    <>
      <ProductFilterModal
        showModal={showFiltersModal}
        applyFilter={applyFilters}
        closeModal={() => {
          setShowFiltersModal(false);
        }}
        parentTextQuery={textQuery}
        parentSortBy={sortBy}
        parentDirection={direction}
      />
      <PageContainer onScroll={onScrollContent}>
        <Loading visible={products.loading} />
        <Card
          className={Styles.productCard}
          title={textConstants.productPage.TITLE}
          description={textConstants.productPage.DESCRIPTION}
        />
        {products?.data?.data?.map(product => (
          <ProductCard
            className={Styles.productCard}
            product={product}
            navigate
            key={product._id}
          />
        ))}
        {products?.data?.data?.length === 0 && (
          <Card
            className={Styles.productCard}
            title={textConstants.productPage.EMPTY_TITLE}
            description={textConstants.productPage.EMPTY_DESCRIPTION}
          />
        )}
        <TopActions
          buttons={[
            {
              text: textConstants.addProduct.ADD_PRODUCT,
              icon: <MdPlaylistAdd />,
              href: '/products/new',
            },
            {
              text: textConstants.misc.FILTERS,
              icon: <RiFilterLine />,
              onClick: () => setShowFiltersModal(true),
            },
            {
              text: textConstants.misc.RESET_FILTERS,
              icon: <RiFilterOffLine />,
              onClick: resetFilters,
            },
          ]}
        />
      </PageContainer>
    </>
  );
};

ProductsPage.propTypes = {
  products: PropTypes.shape({
    data: PropTypes.shape({
      data: PropTypes.array,
      skip: PropTypes.any,
      total: PropTypes.any,
    }),
    loading: PropTypes.any,
  }),
  requestProductsList: PropTypes.func,
  resetProductsList: PropTypes.func,
};

export default ProductsPage;
