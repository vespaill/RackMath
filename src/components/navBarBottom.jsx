import React from 'react';
import { NavLink } from 'react-router-dom';

const navBarBottom = () => {
  return (
    <nav className="navbar navbar-expand navbar-light bg-light">
      <div className="collapse navbar-expand navbar-collapse">
        <div className="navbar-nav">
          <NavLink className="nav-item nav-link" to="/rackmath">
            calculator
          </NavLink>
          <NavLink className="nav-item nav-link" to="/inventory">
            inventory
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default navBarBottom;
