import React from "react";
import { useUsersQuery } from "../generated/graphql";
import ImportFile from "../Components/ImportFile";

interface ILoggedInHomeProps {}

const LoggedInHome: React.FC<ILoggedInHomeProps> = props => {
  const { data } = useUsersQuery({ fetchPolicy: "network-only" });
  if (!data) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <div>LoggedInHome Page</div>
      <div>
        users:
        <ul>
          {data.users.map(x => {
            return (
              <li key={x.id}>
                {x.email},{x.id}
              </li>
            );
          })}
        </ul>
      </div>
      <ImportFile />
    </div>
  );
};

export default LoggedInHome;
