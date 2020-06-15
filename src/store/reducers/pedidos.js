import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../helpers/utility";
const initialState = {
  pedidos_aceitos: [],
  pedidos_negados: [],
  pedidos_entregues: [],
  pedidos_esperando_aprovacao: [],
  pedidos: [],
  novos_pedidos: [],
  faturamento: 0
};

const registrarPedido = (state, action) => {
  return updateObject(state, {
    pedidos_esperando_aprovacao: state.pedidos_esperando_aprovacao.concat(
      action.pedido
    ),
  });
};

const fetchPedidosEngregues = (state,action) => {
  return updateObject(state,{
    pedidos_entregues: action.pedidos
  })
}
const fetchPedidosVendidos = (state,action) => {
  const pedidos = action.pedidos;
  let faturamento = 0;
  
  Object.keys(pedidos).map(pedido => {
    const {totalItem, preco_base} = pedidos[pedido];
    faturamento += totalItem + parseFloat(preco_base);
  });
  
  return updateObject(state, {faturamento: faturamento});
}
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
const fetchPedidosSuccess = (state, action) => {
  console.log('[REDUX_PEDIDOS]', [...action.pedidos])
  return updateObject(state, {pedidos: [...action.pedidos]})
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
    case actionTypes.FETCH_PEDIDOS_SUCCESS:
      return fetchPedidosSuccess(state,action);
    case actionTypes.FETCH_PEDIDOS_ENTREGUES:
      return fetchPedidosEngregues(state,action);
    case actionTypes.FETCH_PEDIDOS_VENDIDOS:
      return fetchPedidosVendidos(state,action);
    default:
      return state;
  }
};

export default reducer;
