import React from "react";
import "./About.css";
import About from "../../images/about.jpg";

function about() {
  return (
    <section className="about">
      <div className="about__img-container">
        <img alt="About" className="about__img" src={About} />
      </div>
      <div className="about__text-container">
        <h3 className="about__title">About the Author</h3>
        <p className="about__text">
          I'm a software engineer proficient in JavaScript, Node, and React. I
          transitioned from teaching background to web development to help
          companies create responsive, scalable, and maintainable web
          experiences. My latest work involves implementing UI's in JavaScript,
          React and integration with APIs at Triple Ten Bootcamp.
        </p>
      </div>
    </section>
  );
}
export default about;
