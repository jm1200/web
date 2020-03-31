import React, { useState, useEffect } from "react";
import { setAccessToken } from "./accessToken";
import CssBaseline from "@material-ui/core/CssBaseline";
import {
  createMuiTheme,
  ThemeProvider,
  FormControlLabel,
  Checkbox
} from "@material-ui/core";
import Nav from "./Components/Nav";
import { BrowserRouter } from "react-router-dom";
import { useMeQuery } from "./generated/graphql";

const darkTheme = createMuiTheme({
  palette: {
    type: "dark"
  }
});

const lightTheme = createMuiTheme({
  palette: {
    type: "light"
  }
});

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const { data } = useMeQuery();
  //let user;
  let theme = lightTheme;
  if (data && data.me && data.me.userSettings) {
    //user = data.me.user;
    if (data.me.userSettings!.theme === "dark") {
      theme = darkTheme;
    }
  }

  useEffect(() => {
    fetch("http://localhost:4000/refresh_token", {
      method: "POST",
      credentials: "include"
    }).then(async x => {
      const data = await x.json();
      setAccessToken(data.accessToken);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <Nav />
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
