import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import Styles from './Modal.module.sass';

const Modal = ({ children, show, backgroundOnClick }) => {
  const classes = classnames({
    [Styles.Modal]: true,
    [Styles.visible]: show,
  });
  return (
    <div className={classes}>
      <div onClick={backgroundOnClick} className={Styles.background} />
      {children}
    </div>
  );
};

Modal.propTypes = {
  backgroundOnClick: PropTypes.func,
  children: PropTypes.any,
  show: PropTypes.bool,
};

export default Modal;
