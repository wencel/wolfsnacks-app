import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

import Styles from './SubCard.module.sass';
const SubCard = ({ className, children }) => {
  const cardClass = classnames({
    [Styles.SubCard]: true,
    [className]: className,
  });
  return <div className={cardClass}>{children}</div>;
};

SubCard.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  description: PropTypes.string,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default SubCard;
