import React, { useContext } from "react";
import { Checkbox, FormControlLabel } from "@material-ui/core";
//import { useUpdateThemeMutation } from "../generated/graphql";
import { UserContext } from "../App";
interface ISettingsProps {}

const Settings: React.FC<ISettingsProps> = props => {
  const [checked, setChecked] = React.useState(false);
  //const [updateTheme, {client}] = useUpdateThemeMutation();
  const user = useContext(UserContext);
  console.log("User context", user);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);

    // make async call
    // const updateFunc = async () => {
    //   try {
    //     const response = await updateTheme({
    //       variables: {
    //         userId: user.id,
    //         theme: event.target.checked ? "dark":"light"
    //       },
    //       update: (store, { data }) => {
    //         console.log("login sent 2");
    //         if (!data) {
    //           console.log("no data");
    //           return null;
    //         }
    //         console.log("login sent 3");
    //         store.writeQuery<MeQuery>({
    //           query: MeDocument,
    //           data: {
    //             __typename: "Query",
    //             me: {
    //               __typename: "MeResponse",
    //               user: data.login.user,
    //               userSettings: data.login.userSettings
    //             }
    //           }
    //         });
    //       }
    //     });

    //     console.log("LOGIN RESPONSE: ", response.errors);

    //     if (response && response.data) {
    //       setAccessToken(response.data.login.accessToken);
    //     }

    //     await client?.resetStore();
    //     history.push("/loggedInHome");
    //   } catch (err) {
    //     //invalid login
    //     if (err.graphQLErrors) {
    //       setLoginError(err.graphQLErrors[0].message);
    //     } else {
    //       setLoginError("Something went wrong. Try again later.");
    //     }
    //   }
    // };

    //updateFunc();
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
