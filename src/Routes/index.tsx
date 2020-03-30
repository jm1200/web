import React from "react";
import Home from "../pages/Home";
import ListItem from "@material-ui/core/ListItem";
import { routes } from "./routes";
import { Route } from "react-router-dom";
import { AuthRoute } from "./utils/AuthRoute";
import { ListItemLink } from "./utils/ListItemLink";

export const buildLinks = (): any => {
  let publicLinks: any = [];
  let loggedOutLinks: any = [];
  let loggedInLinks: any = [];

  routes.publicRoutes.forEach((route: any, index: number) => {
    const Component = route.icon;
    publicLinks.push(
      <ListItem key={index} button>
        <ListItemLink
          to={route.path}
          primary={route.name}
          icon={<Component />}
        />
      </ListItem>
    );
  });

  routes.loggedOutRoutes.forEach((route: any, index: number) => {
    const Component = route.icon;
    loggedOutLinks.push(
      <ListItem key={index} button>
        <ListItemLink
          to={route.path}
          primary={route.name}
          icon={<Component />}
        />
      </ListItem>
    );
  });

  routes.loggedInRoutes.forEach((route: any, index: number) => {
    const Component = route.icon;
    loggedInLinks.push(
      <ListItem key={index} button>
        <ListItemLink
          to={route.path}
          primary={route.name}
          icon={<Component />}
        />
      </ListItem>
    );
  });

  return {
    publicLinks,
    loggedInLinks,
    loggedOutLinks
  };
};

export const buildRoutes = () => {
  let builtRoutes = [];
  let allRoutes: any = [];
  let loggedOutRoutes: any = [];
  let loggedInRoutes: any = [];

  routes.publicRoutes.forEach((route: any, index: number) => {
    allRoutes.push(
      <Route key={index} exact path={route.path} component={route.component} />
    );
  });

  routes.loggedOutRoutes.forEach((route: any, index: number) => {
    loggedOutRoutes.push(
      <Route key={index} exact path={route.path} component={route.component} />
    );
  });

  routes.loggedInRoutes.forEach((route: any, index: number) => {
    loggedInRoutes.push(
      <AuthRoute key={index} path={route.path} component={route.component} />
    );
  });

  builtRoutes = [
    ...allRoutes,
    ...loggedOutRoutes,
    ...loggedInRoutes,
    //default route
    <Route key={1000} component={Home} />
  ];

  return builtRoutes;
};
