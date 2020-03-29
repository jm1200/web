import Login from "../pages/Login";
import Logout from "../pages/Logout";
import Register from "../pages/Register";
import Home from "../pages/Home";
import ImportFile from "../Components/ImportFile";
import Settings from "../pages/Settings";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import { Settings as SettingsIcon } from "@material-ui/icons";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { SvgIconTypeMap } from "@material-ui/core";

interface IRoute {
  name: string;
  path: string;
  component: React.FC<any>;
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
}

interface IRoutes {
  publicRoutes: IRoute[];
  loggedInRoutes: IRoute[];
  loggedOutRoutes: IRoute[];
}

export const routes: IRoutes = {
  //Routes that are always visible
  publicRoutes: [
    {
      name: "Home",
      path: "/home",
      component: Home,
      icon: InboxIcon
    }
  ],

  //Routes only visible when logged in
  loggedInRoutes: [
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
    },
    {
      name: "Settings",
      path: "/settings",
      component: Settings,
      icon: SettingsIcon
    }
  ],

  //Routes only visible when not logged in
  loggedOutRoutes: [
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
  ]
};
