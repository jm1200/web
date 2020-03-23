import React from "react";
import { useByeQuery } from "../generated/graphql";

interface IByeProps {}

const Bye: React.FC<IByeProps> = props => {
  const { data, error, loading } = useByeQuery({ fetchPolicy: "network-only" });

  if (loading) {
    return <div>loading...</div>;
  }
  if (error) {
    console.log(error);
    return <div>err</div>;
  }
  if (!data) {
    return <div>no data</div>;
  }
  return (
    <div>
      <h1>Bye Component</h1>
      {data.bye}
    </div>
  );
};

export default Bye;
