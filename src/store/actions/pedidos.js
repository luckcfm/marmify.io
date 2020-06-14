
import * as actionTypes from "./actionTypes";
import axios from "../../axios-marmify";
import firebase, { db } from "../firebase";
import store from "../store";



const fetchPedidosSuccess = (pedidos) => {
  return {
    type: actionTypes.FETCH_PEDIDOS_SUCCESS,
    pedidos: [].concat(pedidos)
  }
}

const fetchPedidosStart = () => {

}

export const aceitaPedido = (pedido) => {
  // Os pedidos sao organizados em:
  // Usuario que pediu -> Restaurante -> id do pedido
 return dispatch => {
  const state = store.getState();
  const rid = state.auth.user.uid;
  const uid = pedido.userId;
  const pid = pedido.pid;
  pedido.status = {
    aceito: true,
    preparando: false,
    entregue: false,
    hora: new Date()
  }
  db.ref(`pedidos/${uid}/${rid}/${pid}/0`).update(pedido);
 }

}


export const getPedidosUser = () => {
  const uid = store.getState().auth.user.uid;
  return dispatch => {
    db.ref(`pedidos/${uid}`).on('value', pedidos => {
      if(pedidos && pedidos.exists()){
        dispatch(fetchPedidosSuccess(pedidos.val()))
      }
    })
  }
}

export const fetchPedidos = () => {
  return dispatch => {
    const uid = store.getState().auth.user.uid;
    let pedidos = {};
    db.ref('pedidos/').on('value', usuarios => {
      if(usuarios && usuarios.exists()){
       usuarios.forEach(usuario => {
         if(usuario.val()[uid]){
           const pedido = usuario.val()[uid]
           //TESTAR SE ISSO VAI FUNCIOANR
           pedido.uid = usuario.key;
           if(!pedidos[uid])
            pedidos[uid] = {};
           pedidos[uid] = {...pedidos[uid], ...pedido};
         }
       })
       dispatch(fetchPedidosSuccess(pedidos));
      }
    })
    
  }
}

const mudarStatusPedido = (pedido) => {
  return {
    type: actionTypes.MUDAR_STATUS_PEDIDO,
    pedido: pedido
  }
}

const registrarPedidoSucces = (pedido) => {
  return {
    type: actionTypes.REGISTRAR_PEDIDO_SUCCESS,
    pedido: pedido
  }
}


const registrarPedido = (pedido) => {
  //Realizar callback do servidor aqui.
  return dispatch => {
    dispatch(registrarPedidoSucces())
  }
}