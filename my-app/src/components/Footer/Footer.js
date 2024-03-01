import React from "react";
import "./Footer.css";
import { NavLink } from "react-router-dom";
import githubIcon from "../../images/githubIcon.svg";
import facebookIcon from "../../images/facebookIcon.svg";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copywrite">
        &#169; 2020 Supersite, Powered by News API
      </p>
      <div className="footer__links">
        <div className="footer__group-left">
          <NavLink className="footer__link" to="/">
            Home
          </NavLink>
          <a
            className="footer__link footer__link_type_nav"
            href="https://practicum.yandex.com/"
          >
            Practicum by Yandex
          </a>
        </div>
        <div className="footer__group-right">
          <a href="https://github.com" className="footer__link">
            <img alt="github icon" src={githubIcon} />
          </a>
          <a
            href="https://www.facebook.com"
            className="footer__link footer__link_type_social"
          >
            <img alt="facebook icon" src={facebookIcon} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
