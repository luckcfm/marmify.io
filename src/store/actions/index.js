export {
  logout,
  setAuthRedirectPath,
  authCheckState,
  signin,
  signup,
  sendConfirmation
} from './auth'

export {
  hideSidebar,
  hideToolbar,
  showSidebar,
  showToolbar
} from './layout'

export {
  fetchNotifications,
  setNotification,
  clearNotifications
} from './notification'

export {
  registrarPrato,
  fetchPratos,
  fetchPratosRestaurante,
  toggleDisponivel,
  removerPrato,
  updatePrato,

} from './pratosRestaurante'

export {
  fetchRestaurantes,
  addRating
} from './user'

export {
  addCarrinho,
  limparCarrinho,
  fecharCarrinho
} from './carrinho'

export {
  fetchPedidos,
  aceitaPedido,
  getPedidosUser,
  finalizarEntrega,
  negarPedido
} from './pedidos'