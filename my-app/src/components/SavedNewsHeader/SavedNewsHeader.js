import React, { useState } from "react";
import SavedNewsNav from "../SavedNewsNav/SavedNewsNav";
import "../Header/Header.css";

function SavedNewsHeader({ menuButtonVisible, onLogOut }) {
  const [expanded, setExpanded] = useState(false);
  function toggleMenu() {
    expanded ? setExpanded(false) : setExpanded(true);
  }

  return (
    <header
      className={`header header_theme_light ${
        expanded ? "header_active-light" : ""
      }`}
    >
      <div className="header__wrapper header__wrapper_light">
        <div className="header__logo">NewsExplorer</div>
        {menuButtonVisible && (
          <button
            className={`header__button ${
              expanded
                ? "header__button-dark_type_expanded"
                : "header__button-dark_type_closed"
            }`}
            onClick={toggleMenu}
          ></button>
        )}
      </div>
      <SavedNewsNav isOpen={expanded} onLogOut={onLogOut} />
      {expanded && <div className="header__overlay"></div>}
    </header>
  );
}

export default SavedNewsHeader;
