import React from "react";
import "./Popup.css";

function Popup(props) {
  function handleOverlayClick(evt) {
    if (evt.target.classList.contains("popup_opened")) {
      props.onClose();
    }
  }

  return (
    <div
      className={`popup ${props.isOpen ? "popup_opened" : ""}`}
      onClick={handleOverlayClick}
    >
      <div className="popup__container">
        <button
          className="popup__btn"
          type="button"
          onClick={props.onClose}
        ></button>
        {props.children}
      </div>
    </div>
  );
}

export default Popup;
