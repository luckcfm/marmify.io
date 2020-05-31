import React, { Component, useEffect } from "react";
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
const pratosMaisPedidos = [
  {
    nome: "Lasanha",
    qtd: 20,
    descricao: "Delicioso prato com camadas de macarrao, queijo e presunto",
    rating: 5,
    img:
      "https://img.itdg.com.br/tdg/images/recipes/000/138/558/325115/325115_original.jpg?mode=crop&width=710&height=400",
  },
  {
    nome: "Estrogonoff",
    qtd: 55,
    descricao: "Misturado com queijo, carnes e leite em po",
    rating: 4,
    img:
      "https://portal-amb-imgs.clubedaana.com.br/2018/07/estrogonofe-de-frango-2-600x400.jpg",
  },
];

const pratos = pratosMaisPedidos.map((prato) => {
  return (
    <div className="p-col-3">
      <Prato prato={prato}></Prato>
    </div>
  );
});

const columns = [
  { field: "id", header: "ID" },
  { field: "nome_prato", header: "Nome do Prato" },
  { field: "itens", header: "Ingredientes" },
  { field: "totalItem", header: "Preco (R$)" },
  { field: "disponivel", header: "Disponivel" },
];

export const PratosRestaurante = (props) => {
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
  const toggleDisponivel = (id,value) => {
    props.onToggleDisponivel(id,!value);
  };
  const templateDisponivel = (rowData, Column) => {
    return (
      <InputSwitch
        checked={rowData.disponivel === true ? true : false}
        onChange={() => toggleDisponivel(rowData.id, rowData.disponivel ? rowData.disponivel : false)}
      />
    );
  };
  const templateIngredientes = (rowData, Column) => {
    return rowData.itens.map((item) => {
      return item.nome_item + ",";
    });
  };
  const dynamicColumns = columns.map((col, i) => {
    switch (col.field) {
      case "id":
        return (
          <Column
            key={col.field}
            field={col.field}
            style={{display: "none"}}
          >
          </Column>
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
  console.log(pratosArr);
  return (
    <>
      <div className="p-grid">
        <div className="p-col-3"></div>
        <div className="p-col-6">
          <Card title="Pratos mais pedidos">
            <div className="p-grid">{pratos}</div>
          </Card>
        </div>
        <div className="p-col-3">
          <Card title="Novo prato">
            <NovoPrato></NovoPrato>
          </Card>
        </div>
      </div>
      <div className="p-grid">
        <div className="p-col-3"></div>
        <div className="p-col-6">
          <Card title="Todos os pratos" subTitle="Clique para editar">
            <DataTable value={pratosArr} selectionMode="single">
              {dynamicColumns}
            </DataTable>
          </Card>
        </div>
        <div className="p-col-3"></div>
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
    onToggleDisponivel: (id,value) => {
      dispatch(actions.toggleDisponivel(id,value));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PratosRestaurante);
