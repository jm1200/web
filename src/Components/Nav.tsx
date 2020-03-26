import React from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles
} from "@material-ui/core/styles";
import {
  BrowserRouter,
  Switch,
  Route,
  Link as RouterLink,
  LinkProps as RouterLinkProps,
  Redirect
} from "react-router-dom";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import Bye from "../pages/Bye";
import ImportFile from "./ImportFile";
import { useMeQuery, useLogoutMutation } from "../generated/graphql";
import { setAccessToken } from "../accessToken";

const drawerWidth = 240;

const routes = [
  { name: "Home", path: "/", auth: "public", component: Home, icon: InboxIcon },
  {
    name: "Login",
    path: "/login",
    auth: "public",
    component: Login,
    icon: InboxIcon
  },
  {
    name: "Register",
    path: "/register",
    auth: "public",
    component: Register,
    icon: InboxIcon
  },
  {
    name: "Logout",
    path: "/logout",
    auth: "loggedIn",
    component: Logout,
    icon: InboxIcon
  },
  {
    name: "ImportFile",
    path: "/importFile",
    auth: "loggedIn",
    component: ImportFile,
    icon: InboxIcon
  }
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex"
    },
    drawer: {
      [theme.breakpoints.up("lg")]: {
        width: drawerWidth,
        flexShrink: 0
      }
    },
    appBar: {
      [theme.breakpoints.up("lg")]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth
      }
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("lg")]: {
        display: "none"
      }
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3)
    }
  })
);

export default function Nav() {
  const classes = useStyles();
  const theme = useTheme();
  const { data } = useMeQuery();
  let user;
  if (data && data.me) {
    user = data.me;
  }

  const [logout, { client }] = useLogoutMutation();
  const _logout = async () => {
    await logout();
    setAccessToken("");
    await client!.resetStore();
  };

  const builtRoutes = buildRoutes(routes);
  const builtLinks = buildLinks(routes);
  console.log(builtLinks);

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div
      //className={classes.toolbar}
      />
      Logged in as: {user ? <div>{user.email}</div> : <div>Not logged in</div>}
      <Typography>Public Links</Typography>
      <List>
        {builtLinks.publicRoutes.map((route: any) => route)}
        {/* <ListItem button>
          <ListItemLink to="/" primary="Home" icon={<InboxIcon />} />
        </ListItem>
        <ListItem button>
          <ListItemLink
            to="/register"
            primary="Register"
            icon={<InboxIcon />}
          />
        </ListItem>
        <ListItem button>
          <ListItemLink to="/login" primary="Login" icon={<InboxIcon />} />
        </ListItem> */}

        <ListItem button>
          <ListItemLink
            to="/logout"
            primary="Logouttttt"
            icon={<InboxIcon />}
          />
        </ListItem>
      </List>
      <Divider />
      <Typography>Auth Links</Typography>
      {user ? (
        <List>
          {builtLinks.privateRoutes.map((route: any) => route)}
          {/* <ListItem button>
            <ListItemLink
              to="/importFile"
              primary="Import File"
              icon={<InboxIcon />}
            />
          </ListItem> */}
        </List>
      ) : null}
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Responsive drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden lgUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden mdDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          {builtRoutes.map(route => route)}
          {/* <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/bye" component={Bye} />
          <CustomRoute path="/importFile" component={ImportFile} />
          <Route component={Home} /> */}
        </Switch>
      </main>
    </div>
  );
}

interface ListItemLinkProps {
  icon?: React.ReactElement;
  primary: string;
  to: string;
}

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

const CustomRoute = (props: any) => {
  const { component, ...rest } = props;
  const { data } = useMeQuery();
  const renderRoute = (routeProps: any) => {
    console.log("ME: ", data);
    if (!data) {
      //loading screen
      console.log("no data?");
      return null;
    }
    if (!data.me) {
      console.log("Redirect??");
      return <Redirect to="/login" />;
    }
    const Component = component as any;

    return <Component {...routeProps} />;
  };

  return <Route {...rest} render={renderRoute} />;
};

function buildRoutes(routes: any) {
  let builtRoutes = [];
  let publicRoutes: any = [];
  let privateRoutes: any = [];
  routes.map((route: any, index: number) => {
    if (route.auth === "public") {
      publicRoutes.push(
        <Route
          key={index}
          exact
          path={route.path}
          component={route.component}
        />
      );
    } else {
      privateRoutes.push(
        <CustomRoute
          key={index}
          path={route.path}
          component={route.component}
        />
      );
    }
  });
  builtRoutes = [
    ...publicRoutes,
    ...privateRoutes,
    <Route key={1000} component={Home} />
  ];

  return builtRoutes;
}

function buildLinks(routes: any) {
  let publicRoutes: any = [];
  let privateRoutes: any = [];

  routes.map((route: any, index: number) => {
    if (route.auth === "public") {
      publicRoutes.push(
        <ListItem key={index} button>
          <ListItemLink
            to={route.path}
            primary={route.name}
            //icon={route.icon}
          />
        </ListItem>
      );
    } else {
      privateRoutes.push(
        <ListItem key={index} button>
          <ListItemLink
            to={route.path}
            primary={route.name}
            //icon={route.icon}
          />
        </ListItem>
      );
    }
  });

  return {
    publicRoutes,
    privateRoutes
  };
}
