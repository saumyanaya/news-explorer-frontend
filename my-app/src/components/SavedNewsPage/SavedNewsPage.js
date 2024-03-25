import React from "react";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";
import SavedNews from "../SavedNews/SavedNews";
import SavedArticles from "../SavedArticles/SavedArticles";
import NotFound from "../NotFound/NotFound";
function SavedNewsPage(props) {
  return (
    <>
      <SavedNewsHeader
        onLogOut={props.onLogOut}
        menuButtonVisible={props.menuButtonVisible}
        isLoggedIn={props.isLoggedIn}
      />
      {props.isNothingFound ? (
        <NotFound>{props.errorMessage}</NotFound>
      ) : (
        <>
          <SavedArticles savedNews={props.savedNews} />
          {props.savedNews.length !== 0 && (
            <SavedNews savedNews={props.savedNews} onDelete={props.onDelete} />
          )}
        </>
      )}
    </>
  );
}

export default SavedNewsPage;
