import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { activeTabSelector } from 'reducers/misc/miscSelectors';
import BottomNavigation from './BottomNavigation';

const BottomNavigationContainer = ({ activeTab }) => {
  return <BottomNavigation activeTab={activeTab} />;
};

BottomNavigationContainer.propTypes = {
  activeTab: PropTypes.string,
};

const mapStateToProps = state => {
  return {
    activeTab: activeTabSelector(state),
  };
};

export default connect(mapStateToProps)(BottomNavigationContainer);
