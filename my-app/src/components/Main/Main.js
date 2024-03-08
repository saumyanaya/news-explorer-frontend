import React from "react";
import "./Main.css";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import NewsCardsList from "../NewsCardList/NewsCardList";
import NotFound from "../NotFound/NotFound";
import Preloader from "../Preloader/Preloader";
import About from "../About/About";

function Main({
  onSignIn,
  menuButtonVisible,
  isLoggedIn,
  isLoading,
  onLogOut,
  onSearch,
  isNothingFound,
  errorMessage,
  isSearching,
  articles,
  isShowMoreVisible,
  onShowMore,
  onBookmarkClick,
}) {
  return (
    <>
      <section className="main">
        <div className="main__overlay">
          <Header
            onSignIn={onSignIn}
            menuButtonVisible={menuButtonVisible}
            isLoggedIn={isLoggedIn}
            onLogOut={onLogOut}
          />
          <SearchForm onSearch={onSearch} isLoading={isLoading} />
        </div>
      </section>
      {isNothingFound && <NotFound>{errorMessage}</NotFound>}
      {isLoading && <Preloader />}
      {isSearching && (
        <NewsCardsList
          articles={articles}
          isShowMoreVisible={isShowMoreVisible}
          onShowMore={onShowMore}
          isLoggedIn={isLoggedIn}
          onBookmarkClick={onBookmarkClick}
        />
      )}
      <About />
    </>
  );
}
export default Main;
