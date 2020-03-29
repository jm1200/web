import React from "react";
import { Checkbox, FormControlLabel } from "@material-ui/core";

interface ISettingsProps {}

const Settings: React.FC<ISettingsProps> = props => {
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
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
