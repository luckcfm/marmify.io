import React, { useState } from "react";
import { connect } from 'react-redux';

import classes from "./Sidebar.module.css";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { withRouter } from "react-router";
import SidebarItem from './SidebarItem/SidebarItem';

const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

const Side = function (props) {
  const [state, setState] = useState({ visible: false });
  const classNames = [classes.menuItem, "p-col"];
  const clickHandler = (menuClicked) => {
    props.history.push(`/${menuClicked}`);
    setState({visible: false});
  };
  let menuToShow = null;
  if(props.auth.user.role === "restaurante"){
    console.log('Sou restaurante!');
    menuToShow = <>
      <SidebarItem 
          name="Pedidos"
          mode="pedidos_restaurante" 
          classNames={classNames} 
          clickHandler={clickHandler} />
        <SidebarItem 
          name="Pratos"
          mode="pratos" 
          classNames={classNames} 
          clickHandler={clickHandler} />
        <SidebarItem 
          name="Sair"
          mode="logout" 
          classNames={classNames} 
          clickHandler={clickHandler} />
    </>
  }else{
    console.log('Sou usuario normal!');
    menuToShow = <>
        <SidebarItem 
          name="Restaurantes"
          mode="restaurante_user" 
          classNames={classNames} 
          clickHandler={clickHandler} />
        <SidebarItem 
          name="Meus pedidos"
          mode="meus_pedidos" 
          classNames={classNames} 
          clickHandler={clickHandler} />
        <SidebarItem 
          name="Sair"
          mode="logout" 
          classNames={classNames} 
          clickHandler={clickHandler} />
    </>
  }
  let nome = ""
  if(props.auth.token){
    try{
      nome = capitalize(props.auth.user.name.split(' ')[0]);
    }catch(e) {
      console.log(e);
    }
    
  }
  return (
    props.showSidebar && props.auth.token !== null  ? <>
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
            <h2>Bem vindo, {nome}</h2>
          </div>
        </div>
        {menuToShow}
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
