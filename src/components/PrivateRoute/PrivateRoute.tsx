import React, { FC } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { Spin } from "antd";
import { useAuth } from "../../features/auth/AuthContextProvider";

type Tprops = {
  children: React.ReactNode;
} & RouteProps;

export const PrivateRoute: FC<Tprops> = ({ children, ...rest }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated === null) {
    return (
      <div style={{ padding: 20, textAlign: "center" }}>
        <Spin />
      </div>
    );
  }

  return (
    <Route
      {...rest}
      render={() => {
        return isAuthenticated ? children : <Redirect to={"/login"} />;
      }}
    ></Route>
  );
};
