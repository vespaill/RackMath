import React from 'react';
import { NavLink } from 'react-router-dom';
import '../css/navBarBottom.css';
import Barbell from './icons/barbell';
import Plate from './icons/plate';
import Info from './icons/info';

const NavBarBottom = () => {
  return (
    <nav className="bg-red fixed-bottom navbar navbar-dark">
      <div className="navbar-nav navbar-expand">
        <NavLink
          className="nav-item"
          activeClassName="active-class"
          to="/home"
        >
          <Barbell />
        </NavLink>
        <NavLink
          className="nav-item"
          activeClassName="active-class"
          to="/inventory"
        >
          <Plate />
        </NavLink>
        <NavLink
          className="nav-item"
          activeClassName="active-class"
          to="/about"
        >
          <Info />
        </NavLink>
      </div>
    </nav>
  );
};

export default NavBarBottom;
