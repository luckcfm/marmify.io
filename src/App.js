import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { Container } from "react-bootstrap";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";
import Layout from "./hoc/Layout/Layout";
import Auth from "./containers/Auth/Auth";
import Homepage from './containers/Homepage/Homepage'
import Restaurante from './containers/Restaurante/Restaurante';
// import PratosRestaurante from './containers/Restaurante/Pratos/PratosRestaurante';
import Registro from './containers/Auth/Register/Register';
import Logout from "./containers/Auth/Logout/Logout";
import {PublicRoute, PrivateRoute, PrivateRouteUser, PrivateRouteRestaurante} from './hoc/PrivateRoute/PrivateRoute';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';


class App extends Component {

  componentDidMount() {
    // this.props.onLogout();
    this.props.onTryAutoSignUp();
  }
  render() {
    console.log(this.props.user.role);
    console.log(this.props.isAuthenticated);
    let enabledRoutes = (
      <Switch>
        <Route exact path="/" component={Homepage}></Route>
        <PrivateRouteRestaurante 
          path="/restaurante" 
          role={this.props.user.role} 
          authenticated={this.props.isAuthenticated} 
          component={Restaurante}>

          </PrivateRouteRestaurante>
        <PrivateRoute path="/logout" authenticated={this.props.isAuthenticated} component={Logout}></PrivateRoute>
        {/* <PublicRoute path="/signup" authenticated={this.state.authenticated} component={Register}></PublicRoute> */}
        <PublicRoute path="/login" authenticated={this.props.isAuthenticated} component={Auth}></PublicRoute>
        <PublicRoute path="/registro" authenticated={this.props.isAuthenticated} component={Registro}></PublicRoute>
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
            <Container fluid>{enabledRoutes}</Container>
          </Layout>
        </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    isAuthenticated:
      state.auth.token !== null && state.auth.token !== undefined,
    user: state.auth.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState()),
    onLogout: () => dispatch(actions.logout())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
