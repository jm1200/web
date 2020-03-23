import React from "react";
import { useUsersQuery } from "../generated/graphql";
import ImportFile from "../graphql/Components/importFile";

interface IHomeProps {}

const Home: React.FC<IHomeProps> = props => {
  const { data } = useUsersQuery({ fetchPolicy: "network-only" });
  if (!data) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <div>Home Page</div>
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

export default Home;
