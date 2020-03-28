import React from "react";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import Register from "../pages/Register";
import Home from "../pages/Home";
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

const publicRoutes = [
  {
    name: "Home",
    path: "/home",
    component: Home,
    icon: InboxIcon
  }
];

const loggedInRoutes = [
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
  let allRoutes: any = [];
  let logoutRoutes: any = [];
  let privateRoutes: any = [];

  publicRoutes.forEach((route: any, index: number) => {
    const Component = route.icon;

    allRoutes.push(
      <ListItem key={index} button>
        <ListItemLink
          to={route.path}
          primary={route.name}
          icon={<Component />}
        />
      </ListItem>
    );
  });

  loggedOutRoutes.forEach((route: any, index: number) => {
    const Component = route.icon;

    logoutRoutes.push(
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
    allRoutes,
    privateRoutes,
    logoutRoutes
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
  let allRoutes: any = [];
  let logoutRoutes: any = [];
  let privateRoutes: any = [];

  publicRoutes.forEach((route: any, index: number) => {
    allRoutes.push(
      <Route key={index} exact path={route.path} component={route.component} />
    );
  });

  loggedOutRoutes.forEach((route: any, index: number) => {
    logoutRoutes.push(
      <Route key={index} exact path={route.path} component={route.component} />
    );
  });

  loggedInRoutes.forEach((route: any, index: number) => {
    privateRoutes.push(
      <CustomRoute key={index} path={route.path} component={route.component} />
    );
  });

  builtRoutes = [
    ...logoutRoutes,
    ...privateRoutes,
    ...allRoutes,
    <Route component={Home} />
  ];

  return builtRoutes;
};
