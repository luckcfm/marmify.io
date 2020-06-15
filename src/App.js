import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { Container } from "react-bootstrap";
import { connect } from "react-redux";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import * as actions from "./store/actions/index";
import Layout from "./hoc/Layout/Layout";
import Spinner from "./components/UI/Spinner/Spinner";
import Auth from "./containers/Auth/Auth";
import Restaurante from "./containers/Restaurante/Restaurante";
import PratosRestaurante from "./containers/Restaurante/Pratos/PratosRestaurante";
import Registro from "./containers/Auth/Register/Register";
import Logout from "./containers/Auth/Logout/Logout";
import HomePage from "./containers/Homepage/Homepage";
import RestauranteUser from "./containers/Homepage/Restaurante/Restaurante";
import PedidosUser from "./containers/Homepage/Pedidos/Pedidos";
import {
  PublicRoute,
  PrivateRoute,
  PrivateRouteRestaurante,
} from "./hoc/PrivateRoute/PrivateRoute";
import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

class App extends Component {
  state = {
    showAlerta: false
  }
  componentDidMount() {
    // this.props.onLogout();
    console.log("[MOUNTING] APP");
    this.props.onTryAutoSignUp();
  }
  render() {
    let modal = null;
    const footer = (
      <div>
         <Button label="Ok" onClick={() => {
           this.setState({showAlerta: false})
           this.props.history.push("/logout");
           }}></Button>
      </div>
    );
    if (this.props.isAuthenticated && !this.props.user.emailVerified) {
      if(this.state.showAlerta === false){
        this.setState({showAlerta: true})
      }
      modal = (
        <Dialog
          header="Email ainda não foi verificado"
          visible={this.state.showAlerta}
          footer={footer}
          modal={true}
          onHide={() => this.setState({showAlerta: false})}
        >
          O email <b>{this.props.user.email}</b> ainda não foi verificardo <br></br>
          Por favor, verifique a sua caixa de email e tente novamente. <br></br>
          Caso necessário, 
          clique <a onClick={() => {this.props.onSendConfirmation(this.props.user)}}>aqui</a> para reenviar o código para o seu email e tente novamente.
         
        </Dialog>
      );
    }
    let enabledRoutes = (
      <Switch>
        <PrivateRouteRestaurante
          path="/restaurante"
          role={this.props.user.role}
          authenticated={this.props.isAuthenticated}
          component={Restaurante}
        ></PrivateRouteRestaurante>
        <PrivateRouteRestaurante
          path="/pedidos_restaurante"
          role={this.props.user.role}
          authenticated={this.props.isAuthenticated}
          component={Restaurante}
        ></PrivateRouteRestaurante>
        <PrivateRouteRestaurante
          path="/pratos"
          role={this.props.user.role}
          authenticated={this.props.isAuthenticated}
          component={PratosRestaurante}
        ></PrivateRouteRestaurante>
        <PrivateRoute
          path="/restaurante_user"
          authenticated={this.props.isAuthenticated}
          component={RestauranteUser}
        ></PrivateRoute>
        <PrivateRoute
          path="/meus_pedidos"
          authenticated={this.props.isAuthenticated}
          component={PedidosUser}
        ></PrivateRoute>
        <PrivateRoute
          path="/logout"
          authenticated={this.props.isAuthenticated}
          component={Logout}
        ></PrivateRoute>
        {/* <PublicRoute path="/signup" authenticated={this.state.authenticated} component={Register}></PublicRoute> */}
        <PublicRoute
          path="/login"
          authenticated={this.props.isAuthenticated}
          component={Auth}
        ></PublicRoute>
        <PublicRoute
          path="/registro"
          authenticated={this.props.isAuthenticated}
          component={Registro}
        ></PublicRoute>
        <Route exact path="/" component={HomePage}></Route>
        {/* <Route path="/auth" component={Auth}></Route>
        <Route path="/home" component={Homepage}></Route>
        <Route path="/restaurante" component={Restaurante}></Route>
        <Route path="/pratos" component={PratosRestaurante}></Route>
        <Route path="/about" component={Auth}></Route> */}
      </Switch>
    );

    return (
      <div>
        <Layout>
          {modal}
          {this.props.loading ? (
            <Spinner></Spinner>
          ) : (
            <Container fluid>{enabledRoutes}</Container>
          )}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated:
      state.auth.token !== null && state.auth.token !== undefined,
    user: state.auth.user,
    loading: state.auth.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState()),
    onLogout: () => dispatch(actions.logout()),
    onSendConfirmation: (user) => {dispatch(actions.sendConfirmation(user))}
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
