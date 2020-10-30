import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import Styles from './Form.module.sass';
import Loading from '../Loading';
import Button from '../Button/Button';

const Form = ({
  children,
  className,
  loading,
  buttonProps,
  secondButtonProps,
  ...restProps
}) => {
  const FormClasses = classnames({
    [className]: className,
    [Styles.Form]: true,
  });
  return (
    <form className={FormClasses} {...restProps}>
      <Loading visible={loading} />
      {children}
      <div className={Styles.buttonsContainer}>
        {secondButtonProps && (
          <Button type='button' {...secondButtonProps}>
            {secondButtonProps.buttonText}
          </Button>
        )}
        {buttonProps && (
          <Button type='submit' {...buttonProps}>
            {buttonProps.buttonText}
          </Button>
        )}
      </div>
    </form>
  );
};

Form.propTypes = {
  buttonProps: PropTypes.object,
  children: PropTypes.any,
  className: PropTypes.string,
  loading: PropTypes.bool,
  secondButtonProps: PropTypes.object,
};
Form.defaultProps = {
  loading: false,
};

export default Form;
