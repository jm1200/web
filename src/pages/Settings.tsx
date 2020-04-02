import React, { useContext } from "react";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import { UserContext } from "../App";
import {
  useUpdateThemeMutation,
  MeQuery,
  MeDocument
} from "../generated/graphql";

interface ISettingsProps {}

const Settings: React.FC<ISettingsProps> = props => {
  let [updateTheme] = useUpdateThemeMutation();
  let user: any;
  let userSettings: any;

  const userContext = useContext(UserContext);

  if (userContext) {
    user = userContext.me?.user;
    userSettings = userContext.me?.userSettings;
  }

  let checked = true;
  if (userSettings && userSettings.theme === "light") {
    checked = false;
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updateThemeFunc = async () => {
      try {
        await updateTheme({
          variables: {
            userId: user.id,
            theme: checked ? "light" : "dark"
          },
          update: (store, { data }) => {
            if (!data) {
              return null;
            }
            store.writeQuery<MeQuery>({
              query: MeDocument,
              data: {
                me: {
                  __typename: "MeResponse",
                  user: user,
                  userSettings: {
                    __typename: "UserSettings",
                    theme: data.updateTheme!.theme
                  }
                }
              }
            });
          }
        });
      } catch (err) {
        console.log("errors: ", err);
      }
    };

    updateThemeFunc();
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
