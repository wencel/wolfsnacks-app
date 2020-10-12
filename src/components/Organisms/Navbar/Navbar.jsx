import { textConstants } from "appConstants";
import ButtonContainer from "components/Atoms/ButtonContainer";
import Logo from "components/Atoms/Logo";
import PropTypes from "prop-types";
import React from "react";
import { FaMoneyBillWave, FaDog } from "react-icons/fa";
import { ImTruck } from "react-icons/im";
import { MdPerson } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import Styles from "./Navbar.module.sass";
const Navbar = ({ user, requestLogout }) => {
  const buttonsUser = [
    {
      text: textConstants.navbar.SALES,
      icon: <FaMoneyBillWave />,
      href: "/sales",
    },
    {
      text: textConstants.navbar.ORDERS,
      icon: <ImTruck />,
      href: "/orders",
    },
    {
      text: textConstants.navbar.CUSTOMERS,
      icon: <MdPerson />,
      href: "/customers",
    },
    {
      text: textConstants.navbar.PRODUCTS,
      icon: <FaDog />,
      href: "/products",
    },
    {
      text: textConstants.navbar.LOGOUT,
      icon: <FiLogOut />,
      onClick: () => {
        requestLogout();
      },
    },
  ];
  return (
    <nav className={Styles.Navbar}>
      <div>
        <Logo isRound width='40' />
      </div>
      <ButtonContainer buttons={user ? buttonsUser : []} position='top' />
    </nav>
  );
};

Navbar.propTypes = {
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.oneOf([null])]),
};

export default Navbar;
