import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => {
  console.log(props);
  let itemsToShow = (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/auth">Login</NavigationItem>
    </ul>
  );
  if (
    props.user !== undefined &&
    props.user !== "undefined" &&
    props.isAuth
  ) {
    itemsToShow = (
      <ul className={classes.NavigationItems}>
        <NavigationItem link="/central">Central</NavigationItem>
        <NavigationItem link="/decoders">My Decoders</NavigationItem>
        <NavigationItem link="/logout">Logout</NavigationItem>
      </ul>
    );
  }

  return <ul className={classes.NavigationItems}>{itemsToShow}</ul>;
}
export default navigationItems;