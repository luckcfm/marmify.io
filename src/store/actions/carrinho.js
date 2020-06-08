import * as actionTypes from "./actionTypes";
import store from "../store";
import firebase, { db } from "../firebase";

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

}
export const addCarrinho = (prato, rid) => {
  return dispatch => {
    console.log('here', prato);
    dispatch(addCarrinhoSuccess(prato,rid))
  }
}