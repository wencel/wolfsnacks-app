import PropTypes from 'prop-types';
import React from 'react';
import Styles from './NavigationBar.module.sass';
import classnames from 'classnames';

const NavigationBar = ({ children, className, position }) => {
  const classNames = classnames({
    [Styles.NavigationBar]: true,
    [className]: className,
    [Styles[position]]: true,
  });
  return <nav className={classNames}>{children}</nav>;
};

NavigationBar.defaultProps = {
  position: 'bottom',
};

NavigationBar.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  position: PropTypes.string,
};

export default NavigationBar;
