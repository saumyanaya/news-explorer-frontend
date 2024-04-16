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
    .reduce((a) => {
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
      <p className="savedarticles__title">Saved Articles</p>
      <p className="savedarticles__text">
        {currentUser}, you have {savedNews.length} saved articles
      </p>
      <p className="savedarticles__accent">
        By keywords:<b> Nature, Yellowstone, and 2 other</b>
      </p>
    </section>
  );
}

export default SavedArticles;
