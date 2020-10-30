import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import Modal from 'components/Organisms/Modal';
import Card from 'components/Atoms/Card';
import Form from 'components/Atoms/Form';
import Input from 'components/Atoms/Input';
import Styles from './ProductFilterModal.module.sass';
import { textConstants } from 'appConstants';
import { FiSearch } from 'react-icons/fi';
import Button from 'components/Atoms/Button';

const ProductFilterModal = ({
  closeModal,
  applyFilter,
  showModal,
  parentTextQuery,
  parentSortBy,
  parentDirection,
}) => {
  const [textQuery, setTextQuery] = useState(parentTextQuery);
  const [sortBy, setSortBy] = useState(parentSortBy);
  const [direction, setDirection] = useState(parentDirection);
  useEffect(() => {
    if (showModal) {
      setTextQuery(parentTextQuery);
      setSortBy(parentSortBy);
      setDirection(parentDirection);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showModal]);
  return (
    <Modal
      className={Styles.ProductFilterModal}
      show={showModal}
      backgroundOnClick={closeModal}
    >
      <Card
        title={textConstants.misc.FILTERS}
        description={textConstants.misc.FILTERS_TEXT}
        className={Styles.fullWidth}
      >
        <Form
          onSubmit={e => {
            e.preventDefault();
            applyFilter({ textQuery, sortBy, direction });
          }}
        >
          <Input
            label={
              <div className={Styles.label}>
                <FiSearch />
                {textConstants.productPage.SEARCH_PRODUCT}
              </div>
            }
            value={textQuery}
            onChange={e => setTextQuery(e.target.value)}
          />
          <Input
            type='select'
            label={textConstants.misc.ORDER_BY}
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            options={[
              {
                label: textConstants.product.PRESENTATION,
                value: 'presentation',
              },
              { label: textConstants.product.NAME, value: 'name' },
              { label: textConstants.product.WEIGHT, value: 'weigth' },
            ]}
          />
          <Input
            type='select'
            label={textConstants.misc.DIRECTION}
            value={direction}
            onChange={e => setDirection(e.target.value)}
            options={[
              { label: textConstants.misc.ASCENDING, value: 'asc' },
              { label: textConstants.misc.DESCENDING, value: 'desc' },
            ]}
          />
          <div className={Styles.buttonsContainer}>
            <Button type='button' onClick={closeModal}>
              {textConstants.misc.CANCEL}
            </Button>
            <Button type='submit'>{textConstants.misc.APPLY}</Button>
          </div>
        </Form>
      </Card>
    </Modal>
  );
};

ProductFilterModal.propTypes = {
  applyFilter: PropTypes.func,
  closeModal: PropTypes.func,
  parentDirection: PropTypes.string,
  parentSortBy: PropTypes.string,
  parentTextQuery: PropTypes.string,
  showModal: PropTypes.bool,
};

export default ProductFilterModal;
