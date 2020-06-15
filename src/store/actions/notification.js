import * as actionTypes from "./actionTypes";
import { db } from "../firebase";
import store from "../store";



const setNotificationSuccess = notifications => {
  return {
    type: actionTypes.SET_NOTIFICATION,
    notifications: notifications
  }
}

export const setNotification = (userId, notification) => {
  return dispatch => {
    db.ref(`notifications/${userId}`).push(notification)
  }
}
export const clearNotifications = (userId) => {
  return dispatch => {
    db.ref(`notifications/${userId}`).remove()
  }
}
export const fetchNotifications = (userId) => {
  return dispatch => {
    console.log('Fetching for ', userId);
    db.ref(`notifications/${userId}`).on('value',notifications => {
      if(notifications && notifications.exists){
        dispatch(setNotificationSuccess(notifications.val()));
      }
    })
  }
}