import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import Modal from 'components/Organisms/Modal';
import Card from 'components/Atoms/Card';
import Form from 'components/Atoms/Form';
import Styles from './SaleFilterModal.module.sass';
import { textConstants } from 'appConstants';
import Radio from 'components/Atoms/Radio';
import Label from 'components/Atoms/Label';
import SearchField from 'components/Molecules/SearchField/SearchField';
import Calendar from 'components/Atoms/Calendar';
import { FiSearch } from 'react-icons/fi';

const SaleFilterModal = ({
  closeModal,
  applyFilter,
  showModal,
  parentDateRange,
  parentOwes,
  parentIsThirteenDozen,
  parentCustomer,
  fetchCustomers,
  customers,
}) => {
  const [dateRange, setDateRange] = useState(parentDateRange);
  const [owes, setOwes] = useState(parentOwes);
  const [customer, setCustomer] = useState(parentCustomer);
  const [isThirteenDozen, setIsThirteenDozen] = useState(parentIsThirteenDozen);
  const updateOwes = e => {
    switch (e.target.value) {
      case 'yes':
        setOwes(true);
        break;
      case 'no':
        setOwes(false);
        break;
      case 'all':
        setOwes(null);
        break;
      default:
        setOwes(null);
    }
  };
  const updateIsThirteenDozen = e => {
    switch (e.target.value) {
      case 'yes':
        setIsThirteenDozen(true);
        break;
      case 'no':
        setIsThirteenDozen(false);
        break;
      case 'all':
        setIsThirteenDozen(null);
        break;
      default:
        setIsThirteenDozen(null);
    }
  };
  useEffect(() => {
    if (showModal) {
      setDateRange(parentDateRange);
      setOwes(parentOwes);
      setIsThirteenDozen(parentIsThirteenDozen);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showModal]);
  return (
    <Modal
      className={Styles.SaleFilterModal}
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
            applyFilter({ dateRange, owes, isThirteenDozen, customer });
          }}
          buttonProps={{ buttonText: textConstants.misc.APPLY }}
          secondButtonProps={{
            buttonText: textConstants.misc.CANCEL,
            onClick: closeModal,
          }}
        >
          <Label className={Styles.label}>{textConstants.misc.DATES}</Label>
          <Calendar
            onChange={setDateRange}
            value={dateRange}
            maxDate={new Date()}
          />
          <SearchField
            onSearch={fetchCustomers}
            isLoading={customers.loading}
            label={
              <div className={Styles.labelSearch}>
                <FiSearch />
                {textConstants.addSale.SEARCH_CUSTOMER}
              </div>
            }
            value={customer?.storeName}
            valueLabel={textConstants.sale.CUSTOMER}
            onSelect={c => {
              setCustomer(c);
            }}
            itemsList={customers.data.data.map(customer => ({
              label: `${customer.storeName} (${customer.name})`,
              value: customer,
            }))}
          />
          <Label className={Styles.label}>{textConstants.salePage.OWES}</Label>
          <div className={Styles.radioContainer}>
            <Radio
              className={Styles.radio}
              name='owes'
              value='yes'
              checked={owes === true}
              label={textConstants.misc.YES}
              onChange={updateOwes}
            />
            <Radio
              className={Styles.radio}
              name='owes'
              value='no'
              checked={owes === false}
              label={textConstants.misc.NO}
              onChange={updateOwes}
            />
            <Radio
              className={Styles.radio}
              name='owes'
              value='all'
              checked={owes === null}
              label={textConstants.misc.ALL}
              onChange={updateOwes}
            />
          </div>
          <Label className={Styles.label}>
            {textConstants.salePage.IS_THIRTEEN_DOZEN}
          </Label>
          <div className={Styles.radioContainer}>
            <Radio
              className={Styles.radio}
              name='isThirteenDozen'
              value='yes'
              checked={isThirteenDozen === true}
              label={textConstants.misc.YES}
              onChange={updateIsThirteenDozen}
            />
            <Radio
              className={Styles.radio}
              name='isThirteenDozen'
              value='no'
              checked={isThirteenDozen === false}
              label={textConstants.misc.NO}
              onChange={updateIsThirteenDozen}
            />
            <Radio
              className={Styles.radio}
              name='isThirteenDozen'
              value='all'
              checked={isThirteenDozen === null}
              label={textConstants.misc.ALL}
              onChange={updateIsThirteenDozen}
            />
          </div>
        </Form>
      </Card>
    </Modal>
  );
};

SaleFilterModal.propTypes = {
  applyFilter: PropTypes.func,
  closeModal: PropTypes.func,
  customers: PropTypes.shape({
    data: PropTypes.shape({
      data: PropTypes.array,
    }),
    loading: PropTypes.any,
  }),
  fetchCustomers: PropTypes.func,
  parentCustomer: PropTypes.any,
  parentDateRange: PropTypes.any,
  parentIsThirteenDozen: PropTypes.any,
  parentOwes: PropTypes.any,
  showModal: PropTypes.bool,
};

export default SaleFilterModal;
