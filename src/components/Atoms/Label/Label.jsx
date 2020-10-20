import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import Styles from './Label.module.sass';

const Label = ({ children, className }) => {
  const labelClasses = classnames({
    [className]: className,
    [Styles.Label]: true,
  });
  return (
    <label className={labelClasses}>
      {children}
    </label>
  );
};

Label.propTypes = {
  children: PropTypes.any,
  className: PropTypes.any
}

export default Label;
