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
    return <>{itens.join(',')}</>
  }
  templateAceite = (rowData, column) => {
    if(!rowData.status){
      return <p style={{color: 'red'}}><b>Item ainda não foi aceito</b></p>
    }else{
      const status = rowData.status;
      console.log(status);
      if(!status.preparando && !status.entregue){
        return <p style={{color: 'orange'}}>
          Pedido aceito em: {status.hora}
        </p>
      }else{
        return <p style={{color: 'green'}}>
          Pedido entregue!
        </p>
      }
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
    const rows_entregues = [];
    let pedidosRestaurante = null;
    try{
      pedidosRestaurante = pedidos.map(pedido => {
        return pedido[this.props.uid];
      });
      pedidosRestaurante.map(ped => {
        const uid = ped.uid;
        Object.keys(ped).map(newPedido => {
          if(newPedido !== 'uid')
          {
            const pedidoLimpo = ped[newPedido][0];
            pedidoLimpo.userId = uid;
            pedidoLimpo.pid = newPedido;
            if(pedidoLimpo.status && pedidoLimpo.status.entregue === true)
              rows_entregues.push(pedidoLimpo);
            else
              rows.push(pedidoLimpo);
          }

        })        
      })
    }catch(e) {
      console.log(e);
    }
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
           style={{height: '300px', overflow: 'auto'}}
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
        <Card title="Pedidos Entregues">
        <DataTable value={rows_entregues}
           selectionMode="single"
           rowHover={true}
           emptyMessage="Você ainda não entregou nenhum pedido, tente mais tarde."
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
