import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = (props) => {
  const isLoggedIn = props.isLoggedIn;
  const onSignIn = props.onSignIn;
  const Component = props.component;

  useEffect(() => {
    if (!isLoggedIn) {
      onSignIn();
    }
  }, [isLoggedIn, onSignIn]);

  return (
    <Route>
      {() => (isLoggedIn ? <Component {...props} /> : <Redirect to="/" />)}
    </Route>
  );
};
export default ProtectedRoute;
