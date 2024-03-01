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
// import mainApi from "../../utils/MainApi";
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
  const [currentUser, setCurrentUser] = useState({});
  const [savedNews, setSavedNews] = useState([]);
  // const [isSendingRequest, setIsSendingRequest] = useState(true);
  const [serverMessage, setServerMessage] = useState("");
  const [isDisabledInput, setIsDisabledInput] = useState(false);

  // function handleArticleBookmark(article) {
  //   const bookmarkedArticle = savedNews.find((i) => i.title === article.title);
  //   if (bookmarkedArticle !== undefined) {
  //     mainApi
  //       .removeBookmark(bookmarkedArticle._id)
  //       .then(() => {
  //         article.isBookmarked = false;
  //         setArticles(articles);
  //         localStorage.setItem("storedArticles", JSON.stringify(articles));
  //         const newSavedNews = savedNews.filter(
  //           (a) => a._id !== bookmarkedArticle._id
  //         );
  //         setSavedNews(newSavedNews);
  //       })
  //       .catch((err) => {
  //         setErrorMessage(err);
  //         setIsNothingFound(true);
  //       });
  //   } else {
  //     mainApi
  //       .addBookmark(article)
  //       .then((res) => {
  //         article.isBookmarked = true;
  //         res.isBookmarked = true;
  //         setArticles(articles);
  //         localStorage.setItem("storedArticles", JSON.stringify(articles));
  //         setSavedNews([res, ...savedNews]);
  //       })
  //       .catch((err) => {
  //         setErrorMessage(err);
  //         setIsNothingFound(true);
  //       });
  //   }
  // }

  // function handleDeleteClick(article) {
  //   mainApi
  //     .removeBookmark(article._id)
  //     .then((res) => {
  //       const newSavedNews = savedNews.filter((a) => a._id !== article._id);
  //       setSavedNews(newSavedNews);
  //     })
  //     .catch((err) => {
  //       setErrorMessage(err);
  //       setIsNothingFound(true);
  //     });
  // }

  function handleRegister(credentials) {
    //   setIsDisabledInput(true);
    //   mainApi
    //     .register(credentials)
    //     .then(() => {
    //       closeAllPopups();
    //       handleSignUpSuccess();
    //       setIsDisabledInput(false);
    //     })
    //     .catch((err) => {
    //       setServerMessage(err);
    //       setIsDisabledInput(false);
    //     });
  }

  function handleLogin(credentials) {
    setIsDisabledInput(true);
    //   mainApi
    //     .authorize(credentials)
    //     .then((data) => {
    //       localStorage.setItem("jwt", data.token);
    //       mainApi.setToken(data.token);
    //     })
    // .then(() => {
    //   setIsLoggedIn(true);
    //   setIsDisabledInput(false);
    //   closeAllPopups();
    // })
    // .catch((err) => {
    //   setServerMessage(err);
    //   setIsDisabledInput(false);
    // });
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

  // function handleSignUpSuccess() {
  //   setIsInfoToolTipPopupOpen(true);
  // }

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
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      const storedArticles = JSON.parse(localStorage.getItem("storedArticles"));
      if (storedArticles) {
        setArticles(storedArticles);
        setArticlesToShow(storedArticles.slice(0, limit));
        setIsSearching(true);
      }
    }
  }, [limit]);

  useEffect(() => {
    document.addEventListener("keydown", handleEscKey);
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [handleEscKey]);

  // useEffect(() => {
  //   const jwt = localStorage.getItem("jwt");
  //   if (jwt) {
  //     mainApi.setToken(jwt);
  //     setIsLoggedIn(true);
  //     mainApi
  //       .getAppInfo()
  //       .then(([articles, user]) => {
  //         setIsSendingRequest(false);
  //         setIsLoggedIn(true);
  //         const ownersData = articles.filter((i) => i.owner === user._id);
  //         setSavedNews(ownersData);
  //         setCurrentUser(user);
  //       })
  //       .catch((err) => {
  //         setIsNothingFound(true);
  //         setErrorMessage(err);
  //       });
  //   }
  //   setIsSendingRequest(false);
  // }, [isLoggedIn]);

  // if (isSendingRequest) {
  //   return null;
  // }

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
            // onDelete={handleDeleteClick}
            isNothingFound={isNothingFound}
            errorMessage={errorMessage}
          />
          <Route path="/">
            <Main
              // onBookmarkClick={handleArticleBookmark}
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
