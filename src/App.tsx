import React, { useState, useEffect } from "react";
import { setAccessToken } from "./accessToken";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import Nav from "./Components/Nav";
import { BrowserRouter } from "react-router-dom";
import { useMeQuery, useMeLazyQuery, MeQuery } from "./generated/graphql";

const darkTheme = createMuiTheme({
  palette: {
    type: "dark"
  }
});

// const lightTheme = createMuiTheme({
//   palette: {
//     type: "light"
//   }
// });

interface User {
  email: string;
  id: number;
}
export const UserContext = React.createContext<MeQuery | undefined>(undefined);

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [meQuery, { data: meData }] = useMeLazyQuery();

  console.log("app 38: currentUser", meData);

  useEffect(() => {
    fetch("http://localhost:4000/refresh_token", {
      method: "POST",
      credentials: "include"
    }).then(async x => {
      const data = await x.json();
      setAccessToken(data.accessToken);
      setLoading(false);
      meQuery();
    });
  }, [meQuery, meData]);

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={meData}>
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />

            <Nav />
          </ThemeProvider>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
};

export default App;
