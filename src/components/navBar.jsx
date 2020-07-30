import React from 'react';
import { NavLink } from 'react-router-dom';
import '../css/navBar.css';
import Barbell from './icons/barbell';
import Plate from './icons/plate';
import Info from './icons/info';
import Fire from './icons/fire';

const NavBar = () => {
  const navLinks = [
    { url: { pathname: '/home', from: 'navBar' }, component: <Barbell /> },
    { url: '/warmup', component: <Fire /> },
    { url: '/inventory', component: <Plate /> },
    { url: '/about', component: <Info /> }
  ];
  const commonProps = { className: 'nav-item', activeClassName: 'active-class', replace: true };
  return (
    <nav className="bg-red navbar fixed-bottom d-flex justify-content-between">
      {navLinks.map(({ url, component }, index) => (
        <NavLink key={index} {...commonProps} to={url}>
          {component}
        </NavLink>
      ))}
    </nav>
  );
};

export default NavBar;
