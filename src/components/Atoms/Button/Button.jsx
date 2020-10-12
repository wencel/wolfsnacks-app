import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import Styles from './Button.module.sass';
import { idGenerator } from 'utils/utils';

const Button = ({
  children,
  className,
  theme,
  label,
  onClick,
  ...restProps
}) => {
  const buttonClasses = classnames({
    [className]: className,
    [Styles.Button]: true,
  });
  const id = idGenerator();
  return (
    <div className={buttonClasses} onClick={onClick}>
      {label && <label htmlFor={id}>{label}</label>}
      <button id={id} className={Styles[theme]} {...restProps}>
        {children}
      </button>
    </div>
  );
};

Button.defaultProps = {
  theme: 'WolfGreen',
  onClick: () => {},
};

Button.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.func,
  theme: PropTypes.string,
};

export default Button;
