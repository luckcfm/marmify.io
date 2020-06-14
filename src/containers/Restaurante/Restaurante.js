import React, { Component } from "react";
import { connect } from "react-redux";
import { Column } from "primereact/column";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import * as actions from '../../store/actions/index'
import "primeflex/primeflex.css";
import Aceite from './Aceite/Aceite';
export class Restaurante extends Component {
  state = {
    showModal: false,
    pedido: null
  }
  componentDidMount() {
    this.props.onShowSideBar();
    this.props.onShowToolbar();
    this.props.onFetchPedidos();
  }
  templateItens = (rowData, column) => {
    let itens = null;
    itens = rowData.itens.map(item => {
      return item.nome_item
    })
    console.log(itens);
    return <>{itens.join(',')}</>
  }
  templateAceite = (rowData, column) => {

    if(!rowData.status){
      return <p style={{color: 'red'}}><b>Item ainda não foi aceito</b></p>
    }

  }
  closeModal = () => {
    this.setState({showModal: false, pedido: null})
  }
  handleClick = (line) => {
    this.setState({showModal: true, pedido: line.data});
  }
  render() {
    const pedidos = this.props.pedidos.pedidos;
    const rows = [];
    let pedidosRestaurante = null;
    try{
      pedidosRestaurante = pedidos.map(pedido => {
        return pedido[this.props.uid];
      })
      pedidosRestaurante.map(ped => {
        const pedidoLimpo = ped[Object.keys(ped)[0]][0];
        pedidoLimpo.userId = ped[Object.keys(ped)[1]];
        rows.push(pedidoLimpo);
      })
    }catch(e) {
      console.log(e);
    }
    
    console.log(rows);
    return (
      <>
      <Aceite showModal={this.state.showModal} pedido={this.state.pedido} modalClosed={this.closeModal}></Aceite>
        <div className="p-grid" style={{ height: "130px" }}>
          <div className="p-col-3">
            <Card
              style={{ height: "90%" }}
              title="Preparando"
              subTitle="Preparados nesse momento"
            >
              0
            </Card>
          </div>
          <div className="p-col-3">
            <Card
              style={{ height: "90%" }}
              title="Prontos"
              subTitle="Pontos para entrega"
            >
              0
            </Card>
          </div>
          <div className="p-col-3">
            <Card
              title="Entregues"
              style={{ height: "90%" }}
              subTitle="Pratos engregues do dia"
            >
              0
            </Card>
          </div>
          <div className="p-col-3">
            <Card
              title="Faturamento"
              style={{ height: "90%" }}
              subTitle="Faturamento do dia"
            >
              <h2 style={{ textAlign: "right" }}>R$ 0</h2>
            </Card>
          </div>
        </div>
        <Card title="Novos pedidos">
          <DataTable value={rows}
           selectionMode="single"
           rowHover={true}
           onRowClick={this.handleClick}
          >
            <Column field="nome_prato" header="Prato" />
            <Column field="year" header="Endereco" />
            <Column field="itens" body={this.templateItens} header="itens" />
            <Column field="totalItem" header="Total pedido" />
            <Column field="aceite" body={this.templateAceite} header="Aceite" />
          </DataTable>
        </Card>
        {/* <Card title="Pratos Cadastrados">
          <DataTable></DataTable>
        </Card> */}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  pedidos: state.pedidos,
  uid: state.auth.user.uid
});

const mapDispatchToProps = dispatch => {
  return {
    onShowToolbar: () => {dispatch(actions.showToolbar())},
    onShowSideBar: () => {dispatch(actions.showSidebar())},
    onFetchPedidos: () => {dispatch(actions.fetchPedidos())}
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Restaurante);
