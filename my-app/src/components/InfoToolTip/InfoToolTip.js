import React from "react";
import "./InfoToolTip.css";
import Popup from "../Popup/Popup";

function InfoToolTip(props) {
  return (
    <div className="infoToolTip">
      <Popup isOpen={props.isOpen} onClose={props.onClose}>
        <p className="infoToolTip__text">
          Registration successfully completed!
        </p>
        <button
          className="button-link"
          type="button"
          onClick={props.onSignInClick}
        >
          Sign in
        </button>
      </Popup>
    </div>
  );
}

export default InfoToolTip;
