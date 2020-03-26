import React from "react";
import LoggedInHome from "../pages/LoggedInHome";
import LoggedOutHome from "../pages/LoggedOutHome";
import Login from "../pages/Login";
import PageNotFound from "../pages/PageNotFound";
import Logout from "../pages/Logout";
import Register from "../pages/Register";
import ImportFile from "../Components/ImportFile";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import {
  Route,
  Link as RouterLink,
  LinkProps as RouterLinkProps,
  Redirect
} from "react-router-dom";

import InboxIcon from "@material-ui/icons/MoveToInbox";
import { useMeQuery } from "../generated/graphql";

interface ListItemLinkProps {
  icon?: React.ReactElement;
  primary: string;
  to: string;
}

const loggedInRoutes = [
  {
    name: "Home",
    path: "/loggedInHome",
    component: LoggedInHome,
    icon: InboxIcon
  },
  {
    name: "Logout",
    path: "/logout",
    component: Logout,
    icon: InboxIcon
  },
  {
    name: "ImportFile",
    path: "/importFile",
    component: ImportFile,
    icon: InboxIcon
  }
];

const loggedOutRoutes = [
  {
    name: "Home",
    path: "/loggedOutHome",
    component: LoggedOutHome,
    icon: InboxIcon
  },
  {
    name: "Login",
    path: "/login",
    component: Login,
    icon: InboxIcon
  },
  {
    name: "Register",
    path: "/register",
    component: Register,
    icon: InboxIcon
  }
];

export const buildLinks = (): any => {
  let publicRoutes: any = [];
  let privateRoutes: any = [];

  loggedOutRoutes.forEach((route: any, index: number) => {
    const Component = route.icon;

    publicRoutes.push(
      <ListItem key={index} button>
        <ListItemLink
          to={route.path}
          primary={route.name}
          icon={<Component />}
        />
      </ListItem>
    );
  });
  loggedInRoutes.forEach((route: any, index: number) => {
    const Component = route.icon;
    privateRoutes.push(
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
    publicRoutes,
    privateRoutes
  };
};

const CustomRoute = (props: any) => {
  const { component, ...rest } = props;
  const { data } = useMeQuery();
  const renderRoute = (routeProps: any) => {
    if (!data) {
      //loading screen
      return null;
    }
    if (!data.me) {
      return <Redirect to="/login" />;
    }
    const Component = component as any;
    return <Component {...routeProps} />;
  };

  return <Route {...rest} render={renderRoute} />;
};

function ListItemLink(props: ListItemLinkProps) {
  const { icon, primary, to } = props;

  const renderLink = React.useMemo(
    () =>
      React.forwardRef<any, Omit<RouterLinkProps, "to">>((itemProps, ref) => (
        <RouterLink to={to} ref={ref} {...itemProps} />
      )),
    [to]
  );

  return (
    <li>
      <ListItem button component={renderLink}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}

export const buildRoutes = () => {
  let builtRoutes = [];
  let publicRoutes: any = [];
  let privateRoutes: any = [];

  loggedOutRoutes.forEach((route: any, index: number) => {
    publicRoutes.push(
      <Route key={index} exact path={route.path} component={route.component} />
    );
  });

  loggedInRoutes.forEach((route: any, index: number) => {
    privateRoutes.push(
      <CustomRoute key={index} path={route.path} component={route.component} />
    );
  });

  builtRoutes = [
    ...publicRoutes,
    ...privateRoutes,
    <Route key={1000} component={PageNotFound} />
  ];

  return builtRoutes;
};
