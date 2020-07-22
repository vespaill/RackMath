import React from 'react';
import { NavLink } from 'react-router-dom';
import '../css/navBarBottom.css';
import Barbell from './icons/barbell';
import Plate from './icons/plate';
import Info from './icons/info';

const NavBarBottom = () => {
  const baseUrl = '/barbell-loader'
  return (
    <nav className="bg-red fixed-bottom navbar navbar-dark">
      <div className="navbar-nav navbar-expand">
        <NavLink
          className="nav-item"
          activeClassName="active-class"
          to={`${baseUrl}/home`}
        >
          <Barbell />
        </NavLink>
        <NavLink
          className="nav-item"
          activeClassName="active-class"
          to={`${baseUrl}/inventory`}
        >
          <Plate />
        </NavLink>
        <NavLink
          className="nav-item"
          activeClassName="active-class"
          to={`${baseUrl}/about`}
        >
          <Info />
        </NavLink>
      </div>
    </nav>
  );
};

export default NavBarBottom;
