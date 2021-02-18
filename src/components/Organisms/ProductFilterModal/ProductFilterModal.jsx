import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import Modal from 'components/Organisms/Modal';
import Card from 'components/Atoms/Card';
import Form from 'components/Atoms/Form';
import Input from 'components/Atoms/Input';
import Styles from './ProductFilterModal.module.sass';
import { textConstants } from 'appConstants';
import { FiSearch } from 'react-icons/fi';

const ProductFilterModal = ({
  closeModal,
  applyFilter,
  showModal,
  parentTextQuery,
}) => {
  const [textQuery, setTextQuery] = useState(parentTextQuery);
  useEffect(() => {
    if (showModal) {
      setTextQuery(parentTextQuery);
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
            applyFilter({ textQuery });
          }}
          buttonProps={{ buttonText: textConstants.misc.APPLY }}
          secondButtonProps={{
            buttonText: textConstants.misc.CANCEL,
            onClick: closeModal,
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
        </Form>
      </Card>
    </Modal>
  );
};

ProductFilterModal.propTypes = {
  applyFilter: PropTypes.func,
  closeModal: PropTypes.func,
  parentTextQuery: PropTypes.string,
  showModal: PropTypes.bool,
};

export default ProductFilterModal;
