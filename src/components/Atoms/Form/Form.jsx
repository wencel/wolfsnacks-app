import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import Styles from './Form.module.sass';
import ButtonContainer from 'components/Atoms/ButtonContainer';
import Loading from '../Loading';
import Button from '../Button';

const Form = ({
  buttonText,
  secondButtonText,
  secondButtonProps,
  buttonProps,
  children,
  className,
  loading,
  buttonIcon,
  secondButtonIcon,
  showButtonOnForm,
  ...restProps
}) => {
  const FormClasses = classnames({
    [className]: className,
    [Styles.Form]: true,
  });
  const buttons = [
    {
      text: buttonText,
      icon: buttonIcon,
      type: 'submit',
      disabled: loading || buttonProps.disabled,
      ...restProps,
    },
  ];
  if (secondButtonIcon || secondButtonText) {
    buttons.push({
      text: secondButtonText,
      icon: secondButtonIcon,
      type: 'button',
      disabled: loading || secondButtonProps.disabled,
      ...secondButtonProps,
    });
  }
  return (
    <form className={FormClasses} {...restProps}>
      <Loading visible={loading} />
      {children}
      {!showButtonOnForm ? (
        <ButtonContainer buttons={buttons} singleElem />
      ) : (
        <div className={Styles.buttonsContainer}>
          {(secondButtonIcon || secondButtonText) && (
            <Button
              type='button'
              disabled={loading || secondButtonProps.disabled}
              {...secondButtonProps}
            >
              {secondButtonIcon ? secondButtonIcon : ''}
              {secondButtonText}
            </Button>
          )}
          <Button
            type='submit'
            disabled={loading || buttonProps.disabled}
            {...restProps}
          >
            {buttonIcon ? buttonIcon : ''}
            {buttonText}
          </Button>
        </div>
      )}
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
