import PropTypes from 'prop-types';
import React from 'react';
import { IoIosArrowDropleft } from 'react-icons/io';
import { Link } from 'react-router-dom';

import Button from '../Button/Button';
import Styles from './BackButton.module.sass';

const BackButton = ({ href, onClick }) => {
  return (
    <div className={Styles.BackButton}>
      <Link to={href}>
        <Button theme='RoundWithLabel' onClick={onClick}>
          <IoIosArrowDropleft />
        </Button>
      </Link>
    </div>
  );
};

BackButton.propTypes = {
  href: PropTypes.string,
  onClick: PropTypes.func,
};

export default BackButton;
