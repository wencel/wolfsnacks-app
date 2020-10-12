import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';

import Modal from 'components/Organisms/Modal';
import Card from 'components/Atoms/Card';
import Form from 'components/Atoms/Form';
import Styles from './OrderFilterModal.module.sass';
import { textConstants } from 'appConstants';

const OrderFilterModal = ({
  closeModal,
  applyFilter,
  showModal,
  parentDateRange,
}) => {
  const [dateRange, setDateRange] = useState(parentDateRange);
  useEffect(() => {
    if (showModal) {
      setDateRange(parentDateRange);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showModal]);
  return (
    <Modal
      className={Styles.OrderFilterModal}
      show={showModal}
      backgroundOnClick={closeModal}
    >
      <Card
        title={textConstants.misc.FILTERS}
        description={textConstants.misc.FILTERS_TEXT}
        className={Styles.fullWidth}
      >
        <Form
          buttonText={textConstants.misc.APPLY}
          onSubmit={e => {
            e.preventDefault();
            applyFilter({ dateRange });
          }}
          secondButtonText={textConstants.misc.CANCEL}
          secondButtonProps={{
            onClick: closeModal,
          }}
          showButtonOnForm
        >
          <DateRangePicker
            onChange={setDateRange}
            value={dateRange}
            maxDate={new Date()}
            locale='es-CO'
            className={Styles.dateRangePicker}
          />
        </Form>
      </Card>
    </Modal>
  );
};

OrderFilterModal.propTypes = {
  applyFilter: PropTypes.func,
  closeModal: PropTypes.func,
  parentDirection: PropTypes.string,
  parentSortBy: PropTypes.string,
  parentTextQuery: PropTypes.string,
  showModal: PropTypes.bool,
};

export default OrderFilterModal;
