import React, { useState } from "react";
import {
  useRegisterMutation,
  MeDocument,
  MeQuery,
  useLoginMutation
} from "../generated/graphql";
import { RouteComponentProps } from "react-router-dom";
import { setAccessToken } from "../accessToken";

interface IRegisterProps {}

const Register: React.FC<IRegisterProps & RouteComponentProps> = ({
  history
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [register, { client }] = useRegisterMutation();

  return (
    <form
      onSubmit={async e => {
        e.preventDefault();

        const response = await register({
          variables: {
            email,
            password
          },
          update: (store, { data }) => {
            if (!data) {
              return null;
            }

            store.writeQuery<MeQuery>({
              query: MeDocument,
              data: {
                me: data.register.user
              }
            });
          }
        });
        if (response && response.data) {
          setAccessToken(response.data.register.accessToken);
        }
        await client?.resetStore();
        history.push("/loggedInHome");
      }}
    >
      <div>
        <input
          value={email}
          placeholder="email"
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      <div>
        <input
          type={password}
          value={password}
          placeholder="password"
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
