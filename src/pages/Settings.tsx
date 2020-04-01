import React, { useContext, useEffect } from "react";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import { UserContext } from "../App";

interface ISettingsProps {}

const Settings: React.FC<ISettingsProps> = props => {
  let user: any;
  let userSettings: any;

  const userContext = useContext(UserContext);

  if (userContext) {
    user = userContext.me?.user;
    userSettings = userContext.me?.userSettings;
  }
  console.log(user, userSettings);

  let checked = true;
  if (userSettings && userSettings.theme === "light") {
    checked = false;
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("mutate checkbox");
  };
  return (
    <div>
      <h1>Settings Component</h1>
      <FormControlLabel
        control={<Checkbox checked={checked} onChange={handleChange} />}
        label="Theme"
      />
    </div>
  );
};

export default Settings;
