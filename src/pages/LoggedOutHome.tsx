import React from "react";

interface ILoggedOutHomeProps {}

const LoggedOutHome: React.FC<ILoggedOutHomeProps> = props => {
  return (
    <div>
      <div>LoggedOutHome Page</div>
      <div>Log in to do stuff.</div>
    </div>
  );
};

export default LoggedOutHome;
