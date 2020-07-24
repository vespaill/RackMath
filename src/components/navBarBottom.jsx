import React from 'react';
import { NavLink } from 'react-router-dom';
import '../css/navBarBottom.css';
import Barbell from './icons/barbell';
import Plate from './icons/plate';
import Info from './icons/info';
import Fire from './icons/fire';

const NavBarBottom = () => {
  return (
    <nav className="bg-red navbar fixed-bottom d-flex justify-content-between">
      <NavLink className="nav-item" activeClassName="active-class" to="/home">
        <Barbell />
      </NavLink>
      <NavLink className="nav-item" activeClassName="active-class" to="/warmup">
        <Fire />
      </NavLink>
      <NavLink className="nav-item" activeClassName="active-class" to="/inventory">
        <Plate />
      </NavLink>
      <NavLink className="nav-item" activeClassName="active-class" to="/about">
        <Info />
      </NavLink>
    </nav>
  );
};

export default NavBarBottom;
