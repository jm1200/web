import React, { useState, useEffect } from "react";
import { setAccessToken } from "./accessToken";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import Nav from "./Components/Nav";
import { BrowserRouter } from "react-router-dom";
import { useMeQuery } from "./generated/graphql";

const dark = createMuiTheme({
  palette: {
    type: "dark"
  }
});

const light = createMuiTheme({
  palette: {
    type: "light"
  }
});

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  //const [currentUserId, setCurrentUserId] = useState(0);
  let currentUserId = null;
  const userData = useMeQuery().data;
  if (userData && userData.me && userData.me.user) {
    currentUserId = userData.me.user.id;
  }

  console.log("app 30: userdata: ", userData);

  let theme: any = light;

  useEffect(() => {
    console.log("App 35: Fetching");
    fetch("http://localhost:4000/refresh_token", {
      method: "POST",
      credentials: "include"
    }).then(async x => {
      const data = await x.json();
      console.log("nav 40: data: ", data);
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
