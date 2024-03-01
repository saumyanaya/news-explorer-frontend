import React from "react";
import { NavLink } from "react-router-dom";
import "../Nav/Nav.css";
import logout from "../../images/logout.svg";
import { CurrentUserContext } from "../../context/CurrentUserContext";

function SavedNewsNav({ isOpen, onLogOut }) {
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <nav className={`nav ${isOpen ? "nav_active" : ""}`}>
      <NavLink className="nav__link" to="/">
        Home
      </NavLink>
      <NavLink className="nav__link nav__link_active-dark" to="/saved-news">
        Saved Articles
      </NavLink>
      <button className="nav__button" onClick={onLogOut}>
        {currentUser.name}
        <img className="nav__icon" src={logout} alt="icon" />
      </button>
    </nav>
  );
}

export default SavedNewsNav;
