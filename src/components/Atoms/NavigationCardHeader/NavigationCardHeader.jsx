import PropTypes from 'prop-types';
import React from 'react';
import { IoIosArrowDropright } from 'react-icons/io';
import { Link } from 'react-router-dom';

import Styles from './NavigationCardHeader.module.sass';

const NavigationCardHeader = ({ title, ...restProps }) => {
  return (
    <Link className={Styles.NavigationCardHeader} {...restProps}>
      <div className={Styles.title}>{title}</div>
      <div className={Styles.icon}>
        <IoIosArrowDropright />
      </div>
    </Link>
  );
};

NavigationCardHeader.propTypes = {
  title: PropTypes.string,
};

export default NavigationCardHeader;
