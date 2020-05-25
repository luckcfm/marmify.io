import * as actionTypes from "./actionTypes";


export const hideSidebar = () => {
  return {
    type: actionTypes.HIDE_SIDEBAR,
  };
};


export const showSidebar = () => {
  return {
    type: actionTypes.SHOW_SIDEBAR,
  };
};


export const hideToolbar = () => {
  return {
    type: actionTypes.HIDE_TOOLBAR,
  };
};

export const showToolbar = () => {
  return {
    type: actionTypes.SHOW_TOOLBAR,
  };
};