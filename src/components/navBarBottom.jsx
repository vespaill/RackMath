import React from 'react';
import { NavLink } from 'react-router-dom';
import '../css/navBarBottom.css';
import Barbell from './icons/barbell';
import Plate from './icons/plate';

const NavBarBottom = () => {
  return (
    <nav className="bg-red fixed-bottom navbar navbar-dark">
      <div className="navbar-nav navbar-expand">
        <NavLink className="nav-item nav-link pr-5" to="/rackmath">
          <Barbell />
        </NavLink>
        <NavLink className="nav-item nav-link" to="/inventory">
          <Plate />
        </NavLink>
      </div>
    </nav>
  );
};

export default NavBarBottom;
