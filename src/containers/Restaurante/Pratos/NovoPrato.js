import React, { useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { FileUpload } from "primereact/fileupload";
import { Card } from "primereact/card";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

import classes from "./NovoPrato.module.css";
const pratoInicial = {
  nome_prato: "",
  descricao: "",
  itens: [],
  preco_base: 0.0,
  totalItem: 0.0,
  rating: 0,
  image: null,
  pedidos: 0,
  totalVendido: 0.0,
};
const NovoPrato = function (props) {
  const [state, setState] = useState(pratoInicial);
  const [item, setItem] = useState({ preco_item: 0, nome_item: "" });
  const [title, setTitle] = useState("Novo Prato");
  const [showAlerta, setShowAlerta] = useState(false);
  const { itens } = state;

  if (
    (Object.keys(props.pratoSelecionado).length > 1 &&
      state.id === undefined) ||
    (Object.keys(props.pratoSelecionado).length > 1 &&
      state.id !== props.pratoSelecionado.id)
  ) {
    console.log("here");
    setTitle("Edite o seu Prato!");
    setState(props.pratoSelecionado);
  }
  const handleChange = (evt) => {
    const newState = { ...state };
    newState[evt.target.name] = evt.target.value;
    setState(newState);
  };
  const handleRemove = () => {
    const id = state.id;
    setShowAlerta(false);
    setState(pratoInicial);
    props.onRemovePrato(id, props.user);
  };
  const handleEditar = () => {
    console.log("Editando prato", state);
  };
  const handleChangeItem = (evt) => {
    const newItem = { ...item };
    newItem[evt.target.name] = evt.target.value;
    setItem(newItem);
  };
  const handlerAddItem = (evt) => {
    evt.preventDefault();
    if(item.nome_item === '' || item.preco_item === 0)
    {
      return;
    }
    const newState = { ...state };
    itens.push(item);
    newState.itens = itens;
    newState.totalItem = newState.totalItem + parseFloat(item.preco_item);
    setState(newState);
    setItem({ preco_item: 0, nome_item: "" });
  };
  const handleSave = (evt) => {
    evt.preventDefault();
    props.onSavePrato(state, props.user);
  };
  const handleCancel = () => {
    console.log("clicked", pratoInicial);
    setState(pratoInicial);
    props.setPratoSelecionado({});
  };
  const uploadHandler = (e) => {
    const newState = { ...state };
    newState.image = e.files[0];
    setState(newState);
  };
  const footer = (
    <div>
      <Button
        label="Sim"
        icon="pi pi-check"
        className="p-button-danger"
        onClick={handleRemove}
      />
      <Button
        label="Cancelar"
        icon="pi pi-times"
        onClick={() => {
          setShowAlerta(false);
        }}
      />
    </div>
  );

  let imageElement = <></>;
  if (state.image) {
    imageElement = (
      <span style={{textAlign: 'center', float: 'center', margin: '0 auto'}}>
      <img
        src={state.image}
        style={{ width: "300px", height: "150px", textAlign: 'center', float: 'center' }}
        alt="Imagem do prato"
      ></img>
      <br></br>
      <br></br>
      </span>
    );
  }
  let buttonToShow = <></>;
  if (state.id) {
    buttonToShow = (
      <Button label="Editar Prato" onClick={handleEditar}></Button>
    );
  } else {
    buttonToShow = <Button label="Salvar Prato" style={{width: '100%'}} onClick={handleSave}></Button>;
  }
  return (
    <Card title={title}>
      {imageElement}
      
      <span className="p-float-label">
        <InputText
          id="name"
          value={state.name}
          // placeholder="Nome do prato"
          style={{ width: "100%" }}
          name="nome_prato"
          value={state.nome_prato}
          onChange={handleChange}
        />
        <label htmlFor="name">Nome do prato</label>
      </span>
      <br></br>
      <br></br>
      <span className="p-float-label">
        <InputTextarea
          value={state.descricao}
          style={{ width: "100%" }}
          name="descricao"
          onChange={handleChange}
        />
        <label htmlForm="descricao">Descrição</label>
      </span>
      <br></br>
      <br></br>
      <span className="p-float-label">
        <InputText
          value={state.preco_base}
          name="preco_base"
          style={{ width: "100%" }}
          onChange={handleChange}
        />
        <label htmlForm="preco_base">Preço base</label>
      </span>
      <br></br>
      <br></br>
      <FileUpload
        name="demo"
        style={{ width: "100%" }}
        chooseLabel="Enviar foto do prato"
        mode="basic"
        customUpload={true}
        auto={true}
        uploadHandler={uploadHandler}
      />
      <hr></hr>
      <div className={classes.Items}>
        <h3>Itens</h3>
        {itens && itens.map((itemL) => {
          return (
            <li key={itemL.nome_item}>
              {itemL.nome_item} - {itemL.preco_item}
            </li>
          );
        })}
        <div className={classes.Bottom}>
          <hr></hr>
          <span style={{ float: "right" }}>
            <b>Total do prato: </b> R$ {" "}
            {(state.totalItem + parseFloat(state.preco_base)).toFixed(2)}{" "}
          </span>
          <br></br>
          <hr></hr>
          
          <br></br>
          <div></div>
          <span
            className="p-float-label"
            style={{ float: "left", width: "50%" }}
          >
            <InputText
              value={item.nome_item}
              name="nome_item"
              // style={{width: '50%'}}
              onChange={handleChangeItem}
            />
            <label htmlForm="nome_item">Nome do Item</label>
          </span>
          <span
            className="p-float-label"
            style={{ float: "left", width: "50%" }}
          >
            <InputText
              value={item.preco_item}
              name="preco_item"
              onChange={handleChangeItem}
            />
            <label htmlForm="preco_item">Preço do Item</label>
          </span>
          <button onClick={handlerAddItem}>Adicionar</button>
        </div>
      </div>
      <br></br>
      <br></br>
      {state.id !== undefined ? (
        <Button
          label="Remover prato"
          className="p-button-danger"
          onClick={() => {
            setShowAlerta(true);
          }}
        ></Button>
      ) : null}{" "}
      {buttonToShow}
      <Button
        label="Cancelar"
        style={{ width: "100%" }}
        className="p-button-warning"
        onClick={handleCancel}
      ></Button>
      <Dialog
        header="Remover Prato"
        visible={showAlerta}
        footer={footer}
        modal={true}
        onHide={() => setShowAlerta(false)}
      >
        Tem certeza que deseja remover o prato <b>{state.nome_prato}</b>? <br />
        Esta ação não poderá ser desfeita!
      </Dialog>
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onSavePrato: (prato, user) => {
      dispatch(actions.registrarPrato(prato, user));
    },
    onRemovePrato: (id, user) => {
      dispatch(actions.removerPrato(id, user));
    },
    onUpdatePrato: (prato, user) => {
      dispatch(actions.updatePrato(prato, user));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(NovoPrato);
