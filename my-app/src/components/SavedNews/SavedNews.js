import React from "react";
import "./SavedNews.css";
import NewsCard from "../NewsCard/NewsCard";

function capitalizeFirstLetter(s) {
  return s.charAt(0).toUpperCase() + s.substr(1);
}

function SavedNews({ savedNews, onDelete }) {
  function handleClick(article) {
    onDelete(article);
  }
  return (
    <ul className="savedNews">
      {savedNews.map((article, id) => (
        <NewsCard article={article} key={id}>
          <div className="card__buttons-wrapper card__buttons-wrapper_placement_spaceout">
            <p className="card__keyword">
              {capitalizeFirstLetter(article.keyword)}
            </p>

            <button
              type="button"
              className="card__button"
              onClick={() => handleClick(article)}
            >
              <svg
                className="card__button-trash"
                width="24"
                height="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M15 3H9v2H3v2h18V5h-6V3zM5 9v11a2 2 0 002 2h10a2 2 0 002-2V9h-2v11H7V9H5zm4 0v9h2V9H9zm4 0v9h2V9h-2z"
                />
              </svg>
              <span className="card__tooltip-text">Remove from saved</span>
            </button>
          </div>
        </NewsCard>
      ))}
    </ul>
  );
}

export default SavedNews;
