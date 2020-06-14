import React, { useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { FileUpload } from "primereact/fileupload";
import { Card } from "primereact/card";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
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
    console.log("Removendo", id);
    setShowAlerta(false);
    setState(pratoInicial);
    props.onRemovePrato(id, props.user);
  };
  const handleChangeItem = (evt) => {
    const newItem = { ...item };
    newItem[evt.target.name] = evt.target.value;
    setItem(newItem);
  };
  const handlerAddItem = (evt) => {
    evt.preventDefault();
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
  const uploadHandler = (e) => {
    const newState = { ...state };
    newState.image = e.files[0];
    setState(newState);
  };
  const footer = (
    <div>
      <Button label="Sim" icon="pi pi-check" className="p-button-danger"  onClick={handleRemove} />
      <Button label="Cancelar" icon="pi pi-times" onClick={() => {setShowAlerta(false)}} />
    </div>
  );
  let imageElement = <></>
  console.log(state.image);
  if(state.image) {
    imageElement = <img src={state.image} style={{width: '300px'}} alt="Imagem do prato"></img>
  }
  return (
    <Card title={title}>
      {imageElement}
      <InputText
        value={state.name}
        placeholder="Nome do prato"
        name="nome_prato"
        value={state.nome_prato}
        onChange={handleChange}
      />
      <br></br>
      <br></br>
      <InputTextarea
        value={state.descricao}
        placeholder="Descricao"
        name="descricao"
        onChange={handleChange}
      />
      <br></br>
      <br></br>
      <InputText
        value={state.preco_base}
        name="preco_base"
        placeholder="Preco base"
        onChange={handleChange}
      />
      <br></br>
      <br></br>
      <FileUpload
        name="demo"
        chooseLabel="Enviar foto do prato"
        url="./upload"
        mode="basic"
        customUpload={true}
        auto={true}
        uploadHandler={uploadHandler}
      />
      <hr></hr>
      <h3>Itens</h3>
      {itens.map((itemL) => {
        return (
          <li key={itemL.nome_item}>
            {itemL.nome_item} - {itemL.preco_item}
          </li>
        );
      })}
      <b>Total do item: </b> {state.totalItem + parseFloat(state.preco_base)}{" "}
      <br></br>
      <input
        type="text"
        name="nome_item"
        value={item.nome_item}
        placeholder="Nome item"
        onChange={handleChangeItem}
      />
      <input
        type="text"
        name="preco_item"
        value={item.preco_item}
        placeholder="Preco item"
        onChange={handleChangeItem}
      />
      <button onClick={handlerAddItem}>Adicionar</button>
      <br></br>
      <br></br>
      {state.id !== undefined ? (
        <button
          onClick={() => {
            setShowAlerta(true);
          }}
        >
          Remover Prato
        </button>
      ) : null}{" "}
      <button onClick={handleSave}>Salvar Prato</button>
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
    onRemovePrato: (id,user) => {
      dispatch(actions.removerPrato(id,user));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(NovoPrato);
