import * as actionTypes from "./actionTypes";
import store from "../store";
import firebase, { db } from "../firebase";
import * as actions from './index';
const addCarrinhoSuccess = (prato,rid) => {
  return {
    type: actionTypes.ADD_CARRINHO,
    prato: prato,
    rid: rid
  }
}

export const limparCarrinho = () => {
  return {
    type: actionTypes.LIMPAR_CARRINHO
  }
}
export const fecharCarrinho = () => {
  
  const state = store.getState();
  const carrinho = state.carrinho;
  const uid = state.auth.user.uid;
  
  return dispatch => {
    carrinho.pratos.map(prato => {
      console.log(prato);
      firebase
    .database()
    .ref(`pedidos/${uid}/${carrinho.rid}`)
    .push(prato)
    .then((res) => {
      // console.log(res);
      dispatch(actions.setNotification(carrinho.rid, {msg: 'Voce tem um novo pedido!'}));
    });
    })
    
  }
 
}
export const addCarrinho = (prato, rid) => {
  return dispatch => {
    console.log('here', prato);
    dispatch(addCarrinhoSuccess(prato,rid))
  }
}