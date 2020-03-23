import React from "react";
import { Link } from "react-router-dom";
import { useMeQuery, useLogoutMutation } from "./generated/graphql";
import { setAccessToken } from "./accessToken";

interface IHeaderProps {}

const Header: React.FC<IHeaderProps> = props => {
  const { data, loading } = useMeQuery();
  const [logout, { client }] = useLogoutMutation();
  let body: any = null;

  if (loading) {
    body = <div>Loading</div>;
  }
  if (data && data.me) {
    body = <div>You are logged in as {data.me.email}</div>;
  } else {
    body = <div>not logged in</div>;
  }

  return (
    <header>
      <div>
        <Link to="/">Home</Link>
      </div>
      <div>
        <Link to="/register">Register</Link>
      </div>
      <div>
        <Link to="/login">Login</Link>
      </div>
      <div>
        <Link to="/bye">Bye</Link>
      </div>
      {!loading && data && data.me ? (
        <button
          onClick={async () => {
            await logout();
            setAccessToken("");
            await client!.resetStore();
          }}
        >
          Logout
        </button>
      ) : null}
      {body}
    </header>
  );
};

export default Header;
