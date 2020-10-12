import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import Styles from './Loading.module.sass';

const Loading = ({ className, visible }) => {
  const loadingClasses = classnames({
    [className]: className,
    [Styles.Loading]: true,
    [Styles.visible]: visible,
  });
  return (
    <div className={loadingClasses}>
      <div className={Styles.loadingRipple}>
        <div />
        <div />
      </div>
    </div>
  );
};

Loading.defaultProps = {
  visible: true,
};

Loading.propTypes = {
  className: PropTypes.string,
  visible: PropTypes.bool,
};

export default Loading;
