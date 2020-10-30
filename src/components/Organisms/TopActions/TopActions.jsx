import PropTypes from 'prop-types';
import React from 'react';
import Styles from './TopActions.module.sass';

import { Link } from 'react-router-dom';
import NavigationBar from 'components/Molecules/NavigationBar';
import Button from 'components/Atoms/Button';

const TopActions = ({ buttons }) => {
  const createBaseButton = button => (
    <Button
      {...button}
      onClick={e => {
        if (button.onClick) button.onClick(e);
      }}
      theme='BottomNavigation'
      className={Styles.item}
      key={`${button.text}${button.icon}`}
    >
      {button.icon}
      {button.text}
    </Button>
  );

  return (
    <NavigationBar className={Styles.TopActions} position='top'>
      {buttons?.map(button => {
        return button.href ? (
          <Link
            className={Styles.link}
            key={`${button.text}${button.icon}`}
            to={button.href}
          >
            {createBaseButton(button)}
          </Link>
        ) : (
          createBaseButton(button)
        );
      })}
    </NavigationBar>
  );
};

TopActions.defaultProps = {
  buttons: [],
};

TopActions.propTypes = {
  buttons: PropTypes.array,
  className: PropTypes.string,
  position: PropTypes.string,
};

export default TopActions;
