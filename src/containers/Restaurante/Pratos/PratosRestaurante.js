import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputSwitch } from "primereact/inputswitch";
import Prato from "../../../components/Marmify/Pratos/Prato/Prato";
import NovoPrato from "./NovoPrato";
import * as actions from "../../../store/actions/index";
/*
    Aqui devera conter o registro de pratos
    exibir os pratos mais pedidos
    registrar itens
    remover itens
    habilitar prato 
    desabilitar pratos

*/

const columns = [
  { field: "id", header: "ID" },
  { field: "image", header: "Foto" },
  { field: "nome_prato", header: "Nome do Prato" },
  { field: "itens", header: "Ingredientes" },
  { field: "totalItem", header: "Preco (R$)" },
  { field: "disponivel", header: "Disponivel" },
];

export const PratosRestaurante = (props) => {
  const [pratoSelecionado, setPratoSelecionado] = useState({});
  let highlightedPratos = [];
  useEffect(() => {
    console.log("called");
    props.onFetchPratos();
  }, []);
  const pratosArr = Object.keys(props.pratos.pratos).map((pid) => {
    return {
      id: pid,
      ...props.pratos.pratos[pid],
    };
  });
  const toggleDisponivel = (id, value) => {
    props.onToggleDisponivel(id, !value);
  };
  const templateImage = (rowData, Column) => {
    let retVal = null;
    if (rowData.image) {
      retVal = (
        <span style={{ width: "64px", height: "64px", margin: "0 auto" }}>
          <img
            style={{
              width: "64px",
              height: "64px",
              margin: "0 auto",
              display: "block",
            }}
            src={rowData.image}
            alt={rowData.nome_prato}
          ></img>
        </span>
      );
    } else {
      retVal = (
        <span style={{ width: "64px", height: "64px", margin: "0 auto" }}>
          <img
            style={{
              width: "64px",
              height: "64px",
              margin: "0 auto",
              display: "block",
            }}
            src={
              "https://blog.livup.com.br/wp-content/uploads/2018/09/descubra-comida-de-verdade-e-adote-a-sua-dieta.jpg"
            }
            alt={rowData.nome_prato}
          ></img>
        </span>
      );
    }
    return retVal;
  };
  const templateDisponivel = (rowData, Column) => {
    return (
      <InputSwitch
        checked={rowData.disponivel === true ? true : false}
        onChange={() =>
          toggleDisponivel(
            rowData.id,
            rowData.disponivel ? rowData.disponivel : false
          )
        }
      />
    );
  };
  const templateIngredientes = (rowData, Column) => {
    try{
      return rowData.itens.map((item) => {
        return item.nome_item + ",";
      });
    }catch(e){

    }
   
  };
  const templateTotal = (rowData, column) => {
    const base = parseFloat(rowData.preco_base) + rowData.totalItem;
    return <p>Rs$ {base} </p>
  }
  if(props.pratos && props.pratos.pratos){
    highlightedPratos = Object.keys(props.pratos.pratos).map(key => {
      return props.pratos.pratos[key]
    })
  }
  const pratos = highlightedPratos.map((prato) => {
    return (
      <div style={{ width: "300px", height: "300px", paddingRight: "10px" }}>
        <Prato prato={prato}></Prato>
      </div>
    );
  });
  const dynamicColumns = columns.map((col, i) => {
    console.log(col);
    switch (col.field) {
      case "image":
        return (
          <Column
            key={col.field}
            field={col.field}
            body={templateImage}
            // style={{display: "none"}}
          ></Column>
        );
      case "id":
        return (
          <Column
            key={col.field}
            field={col.field}
            style={{ display: "none" }}
          ></Column>
        );
      case "totalItem":
        return(
          <Column
          key={col.field}
          field={col.field}
          body={templateTotal}
          header={col.header}
        />
        )
      case "itens":
        return (
          <Column
            key={col.field}
            field={col.field}
            body={templateIngredientes}
            header={col.header}
          />
        );
      case "disponivel":
        return (
          <Column
            key={col.field}
            field={col.field}
            body={templateDisponivel}
            header={col.header}
          />
        );
      default:
        return <Column key={col.field} field={col.field} header={col.header} />;
    }
  });
  const handleClick = (line) => {
    const pratoSelecionado = line.data;
    setPratoSelecionado(pratoSelecionado);
  }
  return (
    <>
      <div className="p-grid">
        <div className="p-col-1"></div>
        <div className="p-col-7">
          <Card title="Pratos mais pedidos">
            <div className="p-grid">{pratos}</div>
            
          </Card>
          <br></br>
          <Card title="Todos os pratos" subTitle="Clique para editar">
            <DataTable
              selectionMode="single"
              rowHover={true}
              onRowClick={handleClick}
              style={{ height: "300px", overflow: "auto" }}
              value={pratosArr}
            >
              {dynamicColumns}
            </DataTable>
          </Card>
        </div>
        <div className="p-col-4">
            <NovoPrato 
              pratoSelecionado={pratoSelecionado} 
              setPratoSelecionado={setPratoSelecionado}>
            </NovoPrato>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  pratos: state.pratos,
});

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchPratos: () => {
      dispatch(actions.fetchPratos());
    },
    onToggleDisponivel: (id, value) => {
      dispatch(actions.toggleDisponivel(id, value));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PratosRestaurante);
