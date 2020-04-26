import React, { useState } from "react";
import classes from './Sidebar.module.css'
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";

export default function Side(props) {
  const [state, setState] = useState({ visible: true });
  return (
    <>
      <Sidebar
      style={{backgroundColor: '#594994', color: 'white', border: '0px'}}
        visible={state.visible}
        onHide={(e) => setState({ visible: false })}
      >
        <div className="p-grid p-dir-col">
          <div className="p-col">
            <img className={classes.Avatar} src="https://www.w3schools.com/howto/img_avatar.png"></img>
          </div>
        </div>
        <div className="p-grid">
          <div className="p-col">
            <h3>Bem vindo, Restaurante</h3>
          </div>
        </div>
        <hr style={{border: '1px solid white', padding: 0, margin: 0}}></hr>
        <div className="p-grid">
          <div className="p-col">
            <h3>Pedidos</h3>
          </div>
        </div>
        <div className="p-grid">
          <div className="p-col">
            <h3>Pratos</h3>
          </div>
        </div>
      </Sidebar>
      <Button
        style={{ zIndex: 99 }}
        icon="pi pi-arrow-right"
        onClick={(e) => setState({ visible: true })}
      />
    </>
  );
}
