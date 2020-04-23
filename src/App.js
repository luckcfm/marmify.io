import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { Container } from "react-bootstrap";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";
import Layout from "./hoc/Layout/Layout";
import Auth from "./containers/Auth/Auth";
import Homepage from './containers/Homepage/Homepage'
import Logout from "./containers/Auth/Logout/Logout";
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';


class App extends Component {
  
  render() {
    let enabledRoutes = (
      <Switch>
        <Route path="/auth" component={Auth}></Route>
        <Route path="/home" component={Homepage}></Route>
        <Route path="/about" component={Auth}></Route>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
