import * as actionTypes from "./actionTypes";
import firebase from "../firebase";


export const fetchRestaurantes = () => {
  dispatch => {
    firebase
    .database()
    .ref(`restaurantes/`)
    .push(restaurantes)
    .then((res) => {
      console.log(res);
    });
  }
}
