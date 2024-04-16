import React from "react";
import "./NotFound.css";
import notFound from "../../images/not-found.svg";

function NotFound(props) {
  return (
    <div className="notfound">
      <img className="notfound__icon" src={notFound} alt="icon"></img>
      <h2 className="notfound__title">Nothing found</h2>
      <p className="notfound__text">{props.children}</p>
    </div>
  );
}
export default NotFound;
