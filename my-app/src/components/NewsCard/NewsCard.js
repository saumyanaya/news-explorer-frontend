import React from "react";
import dayjs from "dayjs";
import "./NewsCard.css";

function NewsCard(props) {
  const article = props.article;

  return (
    <li className="card">
      {article.urlToImage && (
        <img className="card__img" src={article.urlToImage} alt="article" />
      )}
      {props.children}
      <div className="card__description-wrapper">
        <p className="card__date">
          {dayjs(article.publishedAt).format("MMMM D, YYYY")}
        </p>
        <a className="card__link" href={article.url}>
          <h2 className="card__title">{article.title}</h2>
        </a>
        <p className="card__text">{article.description}</p>
        <p className="card__source">{article.source}</p>
      </div>
    </li>
  );
}

export default NewsCard;
