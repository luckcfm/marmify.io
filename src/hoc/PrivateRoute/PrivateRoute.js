import React, {Component} from 'react';
import {Route,Redirect} from 'react-router-dom';
export const PrivateRoute = ({component: component,authenticated,...rest}) => {
  return (
    <Route
      {...rest}
      render = {props => authenticated === true ? 
      <Component {...props} /> : 
      <Redirect to={{pathname:"/login", state:{from: props.location}}}>

      </Redirect>}
    
    />
  )
}
export const PrivateRouteUser = ({component: component,authenticated,...rest}) => {
  return (
    <Route
      {...rest}
      render = {props => authenticated === true ? 
      <Component {...props} /> : 
      <Redirect to={{pathname:"/login", state:{from: props.location}}}>

      </Redirect>}
    
    />
  )
}
export const PrivateRouteRestaurante = ({component: Component, role, authenticated, ...rest}) => {
  console.log(role);
  return (
    <Route
      {...rest}
      render = {props => authenticated === true && role === "restaurante" ? 
      <Component {...props} /> : 
      <Redirect to={{pathname:"/homepage", state:{from: props.location}}}>
      </Redirect>}
    
    />
  )
}

export const PublicRoute = ({component: Component, authenticated, ...rest}) => {
  return (
    <Route
      {...rest}
      render={props => authenticated === false ? 
      <Component {...props} ></Component>:
      <Redirect to="/restaurante"></Redirect>
      }
      ></Route>
      
  )
}