import React, { useEffect } from "react";
import { useLogoutMutation } from "../generated/graphql";
import { setAccessToken } from "../accessToken";
import { RouteProps } from "react-router-dom";

const Logout: React.FC<RouteProps> = (props: RouteProps) => {
  const [logout, { client }] = useLogoutMutation();

  useEffect(() => {
    const _logout = async () => {
      await logout();
      setAccessToken("");
      await client!.resetStore();
    };
    _logout();
  }, [logout, client]);
  return <div>Logout</div>;
};

export default Logout;
