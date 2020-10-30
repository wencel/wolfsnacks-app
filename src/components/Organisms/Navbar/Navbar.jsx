import Logo from 'components/Atoms/Logo';
import PropTypes from 'prop-types';
import React from 'react';
import { FiLogOut } from 'react-icons/fi';
import Styles from './Navbar.module.sass';
import Button from 'components/Atoms/Button';
const Navbar = ({ user, requestLogout }) => {
  return (
    <nav className={Styles.Navbar}>
      <div>
        <Logo isRound width='40' />
      </div>
      {/* <ButtonContainer buttons={user ? buttonsUser : []} position='top' /> */}

      <div className={Styles.logout}>
        {user?.name}
        <Button
          onClick={() => {
            requestLogout();
          }}
          theme='RoundWithLabel'
          type='button'
        >
          <FiLogOut />
        </Button>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.oneOf([null])]),
};

export default Navbar;
