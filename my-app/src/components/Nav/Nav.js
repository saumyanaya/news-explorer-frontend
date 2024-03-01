import React from "react";
import { NavLink } from "react-router-dom";
import "./Nav.css";
import logout from "../../images/logout-light.svg";
import { CurrentUserContext } from "../../context/CurrentUserContext";

function Nav({ isOpen, isLoggedIn, onLogOut, onSignIn }) {
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <nav className={`nav ${isOpen ? "nav_active" : ""}`}>
      <NavLink className="nav__link nav__link_active-light" to="/">
        Home
      </NavLink>
      {isLoggedIn && (
        <NavLink className="nav__link" to="/saved-news">
          Saved Articles
        </NavLink>
      )}
      {!isLoggedIn ? (
        <button
          className="nav__button nav__button_type_sign-in"
          onClick={onSignIn}
        >
          Sign in
        </button>
      ) : (
        <button
          className="nav__button nav__button_theme_light"
          onClick={onLogOut}
        >
          {currentUser.name}
          <img className="nav__icon" src={logout} alt="icon" />
        </button>
      )}
    </nav>
  );
}

export default Nav;
