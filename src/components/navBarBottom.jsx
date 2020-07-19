import React from 'react';
import { NavLink } from 'react-router-dom';
import '../css/navBarBottom.css';

const NavBarBottom = () => {
  return (
    <nav className="bg-red fixed-bottom navbar navbar-dark">
      <div className="navbar-nav navbar-expand">
        <NavLink className="nav-item nav-link pr-5" to="/rackmath">
          calc
        </NavLink>
        <NavLink className="nav-item nav-link" to="/inventory">
          inv
        </NavLink>
      </div>
    </nav>
  );
};

export default NavBarBottom;
