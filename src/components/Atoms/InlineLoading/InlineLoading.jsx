import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import Styles from './InlineLoading.module.sass';

const InlineLoading = ({ className }) => {
  const loadingClasses = classnames({
    [className]: className,
    [Styles.loadingRipple]: true,
  });
  return (
    <div className={loadingClasses}>
      <div />
      <div />
    </div>
  );
};

InlineLoading.defaultProps = {
  visible: true,
};

InlineLoading.propTypes = {
  className: PropTypes.string,
  visible: PropTypes.bool,
};

export default InlineLoading;
