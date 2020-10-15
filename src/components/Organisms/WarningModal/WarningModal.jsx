import PropTypes from 'prop-types';
import React from 'react';

import Modal from 'components/Organisms/Modal';
import Card from 'components/Atoms/Card';
import Styles from './WarningModal.module.sass';
import Button from 'components/Atoms/Button/Button';
import { textConstants } from 'appConstants';

const WarningModal = ({
  closeModal,
  showModal,
  title,
  description,
  showCancelButton,
  cancelAction,
  cancelText,
  confirmationAction,
  confirmationText,
}) => {
  return (
    <Modal
      className={Styles.WarningModal}
      show={showModal}
      backgroundOnClick={closeModal}
    >
      <Card
        title={title}
        description={description}
        className={Styles.fullWidth}
      >
        <div className={Styles.buttonContainer}>
          {showCancelButton && (
            <Button onClick={cancelAction}>{cancelText}</Button>
          )}
          <Button onClick={confirmationAction}>{confirmationText}</Button>
        </div>
      </Card>
    </Modal>
  );
};

WarningModal.defaultProps = {
  cancelAction: () => {},
  cancelText: textConstants.misc.CANCEL,
  closeModal: () => {},
  confirmationAction: () => {},
  confirmationText: textConstants.misc.SAVE,
  showCancelButton: false,
};

WarningModal.propTypes = {
  cancelAction: PropTypes.func,
  cancelText: PropTypes.string,
  closeModal: PropTypes.func,
  confirmationAction: PropTypes.func,
  confirmationText: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  showCancelButton: PropTypes.bool,
  showModal: PropTypes.bool,
  title: PropTypes.string,
};

export default WarningModal;
