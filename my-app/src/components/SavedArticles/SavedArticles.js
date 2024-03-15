import React from "react";
import "./SavedArticles.css";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { MAXITEMS, TRUNCATEDITEMS } from "../../utils/constants";

function sortByFrequency(array) {
  let frequency = {};

  array.forEach(function (value) {
    frequency[value] = 0;
  });

  const uniques = array.filter(function (value) {
    return ++frequency[value] === 1;
  });

  return uniques.sort(function (a, b) {
    return frequency[b] - frequency[a];
  });
}

function concatinateArrayElem(arr, x, y) {
  if (arr.length <= x) {
    return arr.join(", ");
  } else {
    return `${arr[0]}, ${arr[1]}, and ${arr.length - y} more`;
  }
}

function SavedArticles({ savedNews }) {
  const currentUser = React.useContext(CurrentUserContext);
  const keywords = savedNews
    .map((item) => item.keyword)
    .reduce((a, e) => {
      a.push(e.charAt(0).toUpperCase() + e.substr(1));
      return a;
    }, []);

  const sortedKeywords = sortByFrequency(keywords);
  const concatinatedKeywords = concatinateArrayElem(
    sortedKeywords,
    MAXITEMS,
    TRUNCATEDITEMS
  );

  return (
    <section className="savedarticles">
      <h1 className="savedarticles__title">Saved Articles</h1>
      <p className="savedarticles__text">
        {currentUser.name}, you have {savedNews.length} saved articles
      </p>
      <p>
        By keywords:{" "}
        <span className="savedarticles__accent">{concatinatedKeywords}.</span>
      </p>
    </section>
  );
}

export default SavedArticles;
