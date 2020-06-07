import * as actionTypes from "./actionTypes";


const addCarrinhoSuccess = (prato) => {
  return {
    type: actionTypes.ADD_CARRINHO,
    prato: prato
  }
}


export const addCarrinho = (prato) => {
  return dispatch => {
    console.log('here', prato);
    dispatch(addCarrinhoSuccess(prato))
  }
}