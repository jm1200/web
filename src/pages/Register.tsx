import React, { useState } from "react";
import { useRegisterMutation } from "../generated/graphql";
import { RouteComponentProps } from "react-router-dom";

interface IRegisterProps {}

const Register: React.FC<IRegisterProps & RouteComponentProps> = ({
  history
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [register] = useRegisterMutation();

  return (
    <form
      onSubmit={async e => {
        e.preventDefault();

        const response = await register({
          variables: {
            email,
            password
          }
        });

        console.log("Register response: ", response);
        //TODO: work on register response, login after register.
        // need to return user on register mustation in server.
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
