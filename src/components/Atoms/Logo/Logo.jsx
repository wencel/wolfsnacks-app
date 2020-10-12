import PropTypes from 'prop-types';
import React from 'react';
import Styles from './Logo.module.sass';
import logoImg from 'assets/wolf.jpg';
import classnames from 'classnames';

const Logo = ({ className, isRound, width }) => {
  const logoClasses = classnames({
    [className]: className,
    [Styles.Logo]: true,
    [Styles.rounded]: isRound,
  });

  return (
    <div
      className={logoClasses}
      style={{
        width: width ? `${width}px` : '50px',
        height: width ? `${width}px` : '50px',
      }}
    >
      <img src={logoImg} alt='logo' />
    </div>
  );
};

Logo.propTypes = {
  className: PropTypes.string,
  isRound: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default Logo;
