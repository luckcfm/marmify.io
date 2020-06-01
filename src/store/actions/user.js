import * as actionTypes from "./actionTypes";
import firebase, { db } from "../firebase";
import store from '../store'
const fetchRestaurantesSuccess = (restaurantes) => {
  return {
    type: actionTypes.FETCH_RESTAURANTE_SUCCESS,
    restaurantes: restaurantes
  }
}

const fetchStartsSuccess = (stars) => {
  return {
    type: actionTypes.FETCH_STARS_SUCCESS,
    stars: stars
  }
}

export const addRating = (restauranteId,rating, uid) => {
  const state = store.getState();
  return dispatch => {
    // db.ref(`/ratings/${restauranteId}/stars/${rating}`).increment(1)
    db.ref(`/ratings/${restauranteId}/stars/${rating}`).on('value', snapshot => {
      if(snapshot.val() === null) {
        db.ref(`/ratings/${restauranteId}/stars/${rating}`).set(0);
      }
    })
    const currentRating = state.user.stars[restauranteId].stars[rating];
    db.ref(`/ratings/${restauranteId}/stars/${rating}`).set(currentRating + 1)
  }
}

export const fetchRestaurantes = () => {
  return dispatch => {
    db.ref(`/ratings/`).on('value', snapshot => {
      dispatch(fetchStartsSuccess(snapshot.val()))
    })
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
