import { textConstants } from 'appConstants';
import PropTypes from 'prop-types';
import React from 'react';
import { FaMoneyBillWave, FaDog } from 'react-icons/fa';
import { ImTruck } from 'react-icons/im';
import { MdPerson } from 'react-icons/md';
import Styles from './BottomNavigation.module.sass';
import Button from 'components/Atoms/Button';
import { Link } from 'react-router-dom';
import NavigationBar from 'components/Molecules/NavigationBar';
const BottomNavigation = ({ activeTab }) => {
  return (
    <NavigationBar className={Styles.BottomNavigation}>
      <Link to='/customers' className={Styles.link}>
        <Button
          theme='BottomNavigation'
          className={activeTab === 'customers' ? Styles.active : ''}
        >
          <MdPerson />
          {textConstants.navbar.CUSTOMERS}
        </Button>
      </Link>
      <Link to='/products' className={Styles.link}>
        <Button
          theme='BottomNavigation'
          className={activeTab === 'products' ? Styles.active : ''}
        >
          <FaDog />
          {textConstants.navbar.PRODUCTS}
        </Button>
      </Link>
      <Link to='/sales' className={Styles.link}>
        <Button
          theme='BottomNavigation'
          className={activeTab === 'sales' ? Styles.active : ''}
        >
          <FaMoneyBillWave />
          {textConstants.navbar.SALES}
        </Button>
      </Link>
      <Link to='/orders' className={Styles.link}>
        <Button
          theme='BottomNavigation'
          className={activeTab === 'orders' ? Styles.active : ''}
        >
          <ImTruck />
          {textConstants.navbar.ORDERS}
        </Button>
      </Link>
    </NavigationBar>
  );
};

BottomNavigation.propTypes = {
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.oneOf([null])]),
};

export default BottomNavigation;
