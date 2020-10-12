import PropTypes from 'prop-types';
import React from 'react';
import Divider from 'components/Atoms/Divider';
import classnames from 'classnames';

import Styles from './Card.module.sass';
const Card = ({ className, title, description, children }) => {
  const cardClass = classnames({
    [Styles.Card]: true,
    [className]: className,
  });
  return (
    <div className={cardClass}>
      <div className={Styles.title}>{title}</div>
      <div className={Styles.description}>{description}</div>
      {children ? <Divider /> : ''}
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  description: PropTypes.string,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default Card;
