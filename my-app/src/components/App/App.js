import React, { useState, useEffect, useCallback } from "react";
import { withRouter, Route, Switch, useHistory } from "react-router-dom";
import "./App.css";
import Main from "../Main/Main";
import SavedNewsPage from "../SavedNewsPage/SavedNewsPage";
import Footer from "../Footer/Footer";
import InfoToolTip from "../InfoToolTip/InfoToolTip";
import SignInPopup from "../SignInPopup/SignInPopup";
import SignUpPopup from "../SignUpPopup/SignUpPopup";
import newsApi from "../../utils/NewsApi";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { errorMessages } from "../../utils/errorMessages";
import { MAXITEMS } from "../../utils/constants";

const App = () => {
  const limit = MAXITEMS;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isInfoToolTipPopupOpen, setIsInfoToolTipPopupOpen] = useState(false);
  const [isSignInPopUpOpen, setIsSignInPopupOpen] = useState(false);
  const [isSignUpPopupOpen, setIsSignUpPopupOpen] = useState(false);
  const [isMenuButtonVisible, setIsMenuButtonVisible] = useState(true);
  const [articles, setArticles] = useState([]);
  const length = articles.length;
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [isNothingFound, setIsNothingFound] = useState(false);
  const [articlesToShow, setArticlesToShow] = useState([]);
  const [index, setIndex] = useState(limit);
  const [isShowMoreVisible, setIsShowMoreVisible] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();
  const [currentUser] = useState({});
  const [savedNews] = useState([]);
  const [serverMessage, setServerMessage] = useState("");
  const [isDisabledInput, setIsDisabledInput] = useState(false);

  function handleRegister() {
    setIsDisabledInput(true);
  }

  function handleLogin() {
    setIsDisabledInput(true);
  }

  function handleLogOut() {
    setIsLoggedIn(false);
    setIsSearching(false);
    localStorage.clear();
    setArticlesToShow([]);
    history.push("/");
  }

  const closeAllPopups = useCallback(() => {
    setIsInfoToolTipPopupOpen(false);
    setIsSignInPopupOpen(false);
    setIsSignUpPopupOpen(false);
    setIsMenuButtonVisible(true);
  }, [
    setIsInfoToolTipPopupOpen,
    setIsSignInPopupOpen,
    setIsSignUpPopupOpen,
    setIsMenuButtonVisible,
  ]);

  function handleNewsSearch(keyword) {
    localStorage.removeItem("storedArticles");
    setIsNothingFound(false);
    setIsShowMoreVisible(true);
    setIsloading(true);
    setIndex(limit);
    newsApi
      .searchNews(keyword)
      .then((res) => {
        const data = res.articles;
        if (data.length === 0) {
          setIsloading(false);
          setIsNothingFound(true);
          setIsSearching(false);
          setErrorMessage(errorMessages.nothingFound);
        } else {
          data.forEach(function (i) {
            i.keyword = keyword;
            i.isBookmarked = false;
            i.source = i.source.name;
          });
          setArticles(data);
          setArticlesToShow(data.slice(0, limit));
          localStorage.setItem("storedArticles", JSON.stringify(data));
          setIsloading(false);
          setIsSearching(true);
        }
      })
      .catch((err) => {
        setIsNothingFound(true);
        setIsloading(false);
        setIsShowMoreVisible(false);
        setIsSearching(false);
        setErrorMessage(errorMessages.serverIsDownError);
      });
  }

  function updateArticlesToShow(start, end) {
    const newArticles = articles.slice(start, end);
    setArticlesToShow([...articlesToShow, ...newArticles]);
  }

  function handleShowMore() {
    updateArticlesToShow(index, index + limit);
    setIndex(index + limit);
    if (index >= length - 1) {
      setIsShowMoreVisible(false);
    }
  }

  function handleSignUpClick() {
    setIsSignInPopupOpen(false);
    setIsSignUpPopupOpen(true);
  }

  function handleSignInClick() {
    setIsMenuButtonVisible(false);
    closeAllPopups();
    setServerMessage("");
    setIsSignInPopupOpen(true);
  }

  const handleEscKey = useCallback(
    (evt) => {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    },
    [closeAllPopups]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleEscKey);
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [handleEscKey]);

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Switch>
          <ProtectedRoute
            path="/saved-news"
            exact
            component={SavedNewsPage}
            onSignIn={handleSignInClick}
            menuButtonVisible={isMenuButtonVisible}
            isLoggedIn={isLoggedIn}
            onLogOut={handleLogOut}
            savedNews={savedNews}
            isNothingFound={isNothingFound}
            errorMessage={errorMessage}
          />
          <Route path="/">
            <Main
              errorMessage={errorMessage}
              isShowMoreVisible={isShowMoreVisible}
              onShowMore={handleShowMore}
              isNothingFound={isNothingFound}
              onSearch={handleNewsSearch}
              onSignIn={handleSignInClick}
              menuButtonVisible={isMenuButtonVisible}
              isLoggedIn={isLoggedIn}
              articles={articlesToShow}
              isSearching={isSearching}
              isLoading={isLoading}
              onLogOut={handleLogOut}
            />
          </Route>
        </Switch>
      </CurrentUserContext.Provider>
      <Footer />
      {isSignInPopUpOpen && (
        <SignInPopup
          onClose={closeAllPopups}
          isOpen={true}
          onSignUpClick={handleSignUpClick}
          onLogin={handleLogin}
          serverMessage={serverMessage}
          isDisabledInput={isDisabledInput}
        />
      )}

      {isSignUpPopupOpen && (
        <SignUpPopup
          onClose={closeAllPopups}
          isOpen={true}
          onSignInClick={handleSignInClick}
          onRegister={handleRegister}
          serverMessage={serverMessage}
          isDisabledInput={isDisabledInput}
        />
      )}
      <InfoToolTip
        onClose={closeAllPopups}
        isOpen={isInfoToolTipPopupOpen}
        onSignInClick={handleSignInClick}
      />
    </>
  );
};

export default withRouter(App);
