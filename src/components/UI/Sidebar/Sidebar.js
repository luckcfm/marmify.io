import React, { useState } from "react";
import { connect } from 'react-redux';

import classes from "./Sidebar.module.css";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { withRouter } from "react-router";


const Side = function (props) {
  const [state, setState] = useState({ visible: false });
  const classNames = [classes.menuItem, "p-col"];
  const clickHandler = (menuClicked) => {
    switch (menuClicked) {
      case "pratos":
        props.history.push("/pratos");
        setState({visible: false});
        break;
      case "pedidos":
        setState({visible: false});
        props.history.push("/restaurante");
        break;
      case "logout":
        setState({visible: false});
        console.log("loggin out")
        props.history.push("/logout");
        break;
      default:
        setState({visible: false});
        props.history.push("/home");
    }
  };
  return (
    props.showSidebar  ? <>
      <Sidebar
        style={{ backgroundColor: "#594994", color: "white", border: "0px" }}
        visible={state.visible}
        onHide={(e) => setState({ visible: false })}
      >
        <div className="p-grid p-dir-col">
          <div className="p-col">
            <img
              className={classes.Avatar}
              src="https://www.w3schools.com/howto/img_avatar.png"
            ></img>
          </div>
        </div>
        <div className="p-grid">
          <div className="p-col">
            <h2>Bem vindo, Restaurante</h2>
          </div>
        </div>
        <div className="p-grid">
          <div
            onClick={() => clickHandler("pedidos")}
            className={classNames.join(" ")}
          >
            <h3>Pedidos</h3>
          </div>
        </div>
        <div className="p-grid">
          <div
            onClick={() => clickHandler("pratos")}
            className={classNames.join(" ")}
          >
            <h3>Pratos</h3>
          </div>
        </div>
        <div className="p-grid">
          <div
            onClick={() => clickHandler("logout")}
            className={classNames.join(" ")}
          >
            <h3>Logout</h3>
          </div>
        </div>
      </Sidebar>
      <Button
        style={{ zIndex: 99 }}
        icon="pi pi-arrow-right"
        onClick={(e) => setState({ visible: true })}
      />
    </> : null
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

export default withRouter(connect(mapStateToProps,null)(Side));
