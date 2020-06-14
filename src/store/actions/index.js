export {
  logout,
  setAuthRedirectPath,
  authCheckState,
  signin,
  signup
} from './auth'

export {
  hideSidebar,
  hideToolbar,
  showSidebar,
  showToolbar
} from './layout'


export {
  registrarPrato,
  fetchPratos,
  fetchPratosRestaurante,
  toggleDisponivel,
  removerPrato,
  updatePrato
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
  fetchPedidos
} from './pedidos'