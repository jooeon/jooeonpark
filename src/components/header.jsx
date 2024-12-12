import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="hero">
      <nav className="navbar">
        <a href="/" className="logo">
          Joo Eon Park
        </a>
        <ul className="nav-links">
          <li>
            <NavLink to="/" activeClassName="active" exact>
              Showcase
            </NavLink>
          </li>
          <li>
            <NavLink to="/archive" activeClassName="active">
              Archive
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" activeClassName="active">
              About
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
