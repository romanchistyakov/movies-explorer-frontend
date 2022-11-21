import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...props}) => {
  if (props.loggedIn === undefined) { return }
  return (
    <Route>
      {() =>
        props.loggedIn ? <Component {...props} /> : <Redirect to="./" />
      }
    </Route>
  );
};

export default ProtectedRoute;