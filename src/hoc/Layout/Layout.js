import React, { Component } from "react";
import { connect } from 'react-redux'
import Aux from "../Aux/Aux";
import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import Sidebar from '../../components/UI/Sidebar/Sidebar';
class Layout extends Component {
  state = {
    showSideDrawer: false,
  };

  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  sideDrawerToggleHandler = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };

  render() {
    let classToShow = null;
    if (this.props.showToolbar) {
      classToShow = classes.Content;
    } else {
      classToShow = classes.Content_sem_top;
    }
    return (
      <Aux>
        {this.props.loading === false ? <><Sidebar showSidebar={this.props.layout.showSidebar}></Sidebar>
          <Toolbar showToolbar={this.props.layout.showToolbar} user={this.props.user} isAuth={this.props.isAuth} drawerToggleClicked={this.sideDrawerToggleHandler} />
          <SideDrawer
            open={this.state.showSideDrawer}
            closed={this.sideDrawerClosedHandler}
          />
          <main className={classToShow}>{this.props.children}</main></> : <p>Loading</p>}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.token !== null,
    user: state.auth.user,
    loading: state.auth.loading,
    layout: state.layout
  }
}


export default connect(mapStateToProps)(Layout);
