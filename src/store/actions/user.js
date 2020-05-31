import * as actionTypes from "./actionTypes";
import firebase, { db } from "../firebase";

const fetchRestaurantesSuccess = (restaurantes) => {
  return {
    type: actionTypes.FETCH_RESTAURANTE_SUCCESS,
    restaurantes: restaurantes
  }
}

export const fetchRestaurantes = () => {
  return dispatch => {
    db.ref("/users").orderByChild("role").equalTo("restaurante")
    .on("value", snapshot => {
      if(snapshot.val() === null){
        console.log("Nao ha restaurantes cadastrados")
      }else{
        console.log('here!')
        dispatch(fetchRestaurantesSuccess(snapshot.val()));
      }
    })
  }
}
