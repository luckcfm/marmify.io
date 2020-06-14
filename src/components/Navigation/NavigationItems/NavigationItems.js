import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
import Carrinho from '../../Marmify/Carrinho/Carrinho'
const navigationItems = (props) => {
  let itemsToShow = (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/login">Login</NavigationItem>
    </ul>
  );
  if (
    props.user !== undefined &&
    props.user !== "undefined" &&
    props.isAuth
  ) {
    itemsToShow = (
      <ul className={classes.NavigationItems}>
        <Carrinho></Carrinho>
        <NavigationItem link="/logout">Logout</NavigationItem>
        
      </ul>
    );
  }

  return <ul className={classes.NavigationItems}>{itemsToShow}</ul>;
}
export default navigationItems;