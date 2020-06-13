import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

export const PrivateRouteUser = ({
  component: Component,
  role,
  authenticated,
  ...rest
}) => {
  console.log("here");
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated === true && role === "fastest" ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          ></Redirect>
        )
      }
    />
  );
};
export const PrivateRouteRestaurante = ({
  component: Component,
  role,
  authenticated,
  ...rest
}) => {
  console.log("here", authenticated);
  console.log("role", role);
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated === true && role === "restaurante" ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          ></Redirect>
        )
      }
    />
  );
};

export const PublicRoute = ({
  component: Component,
  authenticated,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated === false ? (
          <Component {...props}></Component>
        ) : (
          <Redirect to="/"></Redirect>
        )
      }
    ></Route>
  );
};

export const PrivateRoute = ({
  component: Component,
  authenticated,
  ...rest
}) => {
  console.log(authenticated);
  console.log("here");
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          ></Redirect>
        )
      }
    />
  );
};
