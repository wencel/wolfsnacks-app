import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import Styles from './Form.module.sass';
import Loading from '../Loading';

const Form = ({ children, className, loading, ...restProps }) => {
  const FormClasses = classnames({
    [className]: className,
    [Styles.Form]: true,
  });
  return (
    <form className={FormClasses} {...restProps}>
      <Loading visible={loading} />
      {children}
    </form>
  );
};
Form.defaultProps = {
  buttonText: 'submit',
  buttonProps: {},
  secondButtonProps: {},
  loading: false,
  showButtonOnForm: false,
};
Form.propTypes = {
  buttonIcon: PropTypes.any,
  buttonProps: PropTypes.object,
  buttonText: PropTypes.string,
  children: PropTypes.any,
  className: PropTypes.string,
  loading: PropTypes.bool,
  secondButtonIcon: PropTypes.any,
  secondButtonProps: PropTypes.object,
  secondButtonText: PropTypes.string,
  showButtononForm: PropTypes.bool,
};

export default Form;
