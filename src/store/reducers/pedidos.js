import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../helpers/utility";
const initialState = {
  pedidos_aceitos: [],
  pedidos_negados: [],
  pedidos_esperando_aprovacao: [],
};

const registrarPedido = (state, action) => {
  return updateObject(state, {
    pedidos_esperando_aprovacao: state.pedidos_esperando_aprovacao.concat(
      action.pedido
    ),
  });
};

const aprovarPedido = (state,action) => {
    const novo_pedido = action.pedido;
    const arr_pedido = state.pedidos_esperando_aprovacao;
    const pedido = arr_pedido.filter(pedido => {
        return pedido.id === novo_pedido
    });
    if(Object.keys(pedido).length > 0){
        //pedido existe, vamos remover da aprovacao e adicionar no outro array.
        arr_pedido.splice(arr_pedido.indexOf(pedido),1);
        updateObject({pedidos_esperando_aprovacao: arr_pedido, pedidos_aceitos: state.pedidos_aceitos.concat(pedido)});
    }else{
        //pedido n existe, retorna o state.
        return state;
    }
}
const mudarStatusPedido = (state, action) => {
//   const pedido = action.pedido;
//   const pedidos = state.pedidos_aceitos;
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REGISTRAR_PEDIDO_SUCCESS:
      return registrarPedido(state, action);
    case actionTypes.MUDAR_STATUS_PEDIDO:
      return mudarStatusPedido(state, action);
    default:
      return state;
  }
};

export default reducer;