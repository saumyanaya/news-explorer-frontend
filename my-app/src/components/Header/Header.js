import React, { useCallback, useState } from "react";
import "./Header.css";
import Nav from "../Nav/Nav";

function Header({ onSignIn, menuButtonVisible, isLoggedIn, onLogOut }) {
  const [expanded, setExpanded] = useState(false);

  function toggleMenu() {
    expanded ? setExpanded(false) : setExpanded(true);
  }

  const handleSignIn = useCallback(() => {
    setExpanded(true);
    onSignIn();
  }, [onSignIn]);

  return (
    <header className={`header ${expanded ? "header_active" : ""}`}>
      <div className="header__wrapper">
        <div className="header__logo">NewsExplorer</div>
        {menuButtonVisible && (
          <button
            className={`header__button ${
              expanded
                ? "header__button_type_expanded"
                : "header__button_type_closed"
            }`}
            onClick={toggleMenu}
          ></button>
        )}
      </div>
      <Nav
        isOpen={expanded}
        onSignIn={handleSignIn}
        isLoggedIn={isLoggedIn}
        onLogOut={onLogOut}
      />
      {expanded && <div className="header__overlay"></div>}
    </header>
  );
}

export default Header;
