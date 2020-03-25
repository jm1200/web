import React from "react";
import { Route } from "react-router-dom";
import { useMeQuery } from "./generated/graphql";
import Login from "./pages/Login";

const AuthRoute = (props: any) => {
  console.log(props);
  const { data } = useMeQuery();
  console.log("ME DATA: ", data);

  if (!data) {
    return null;
  }
  return <Route exact path={props.path} component={props.component} />;
};

export default AuthRoute;
