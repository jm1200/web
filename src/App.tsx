import React, { useState, useEffect } from "react";
//import { Routes } from "./Routes";
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
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

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
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

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
        <ThemeProvider theme={checked ? lightTheme : darkTheme}>
          <CssBaseline />
          <FormControlLabel
            control={<Checkbox checked={checked} onChange={handleChange} />}
            label="Theme"
          />
          <Nav />
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
