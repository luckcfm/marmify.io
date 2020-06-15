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
    pedido: null,
    preparando: 0
  }
  componentDidMount() {
    this.props.onShowSideBar();
    this.props.onShowToolbar();
    this.props.onFetchPedidos();
  }
  templateItens = (rowData, column) => {
    let itens = [];
    if(rowData.itens){
      itens = rowData.itens.map(item => {
        return item.nome_item
      })
    }
   
    return <>{itens.join(',')}</>
  }
  templateAddress = (rowData, column) => {
    if(rowData.user){
      return <p>{rowData.user.address}</p>
    }else{
      return <p>N/A</p>
    }
  }
  templateTotal = (rowData, column) => {
    const base = parseFloat(rowData.preco_base) + rowData.totalItem;
    return <p>Rs$ {base} </p>
  }
  templateAceite = (rowData, column) => {
    if(!rowData.status){
      return <p style={{color: 'red'}}><b>Item ainda não foi aceito</b></p>
    }else{
      const status = rowData.status;
      if(status.preparando && !status.entregue){
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
    const data = new Date();
    const month = data.getMonth();
    const pedidos = this.props.pedidos.pedidos;
    const rows = [];
    const rows_entregues = [];
    let pedidosRestaurante = null;
    let preparando = 0;
    let entregues = 0;
    try{
      pedidosRestaurante = pedidos.map(pedido => {
        return pedido[this.props.uid];
      });
      pedidosRestaurante.map(ped => {
        const uid = ped.uid;
        Object.keys(ped).map(newPedido => {
          if(newPedido !== 'uid' && Object.keys(ped[newPedido]).length > 2)
          {
            const pedidoLimpo = ped[newPedido];
            pedidoLimpo.userId = uid;
            pedidoLimpo.pid = newPedido;
            preparando += 1;
            rows.push(pedidoLimpo);
              
          }

        })        
      })
      // this.setState({preparando:preparando})
      this.props.pedidos.pedidos_entregues.map(pedido => {
        Object.keys(pedido).map(key => {
          Object.keys(pedido[key]).map(key2 => {
            entregues += 1;
            rows_entregues.push(pedido[key][key2]);
          })
        })
        // 
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
              {preparando} pedidos
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
              {entregues}
            </Card>
          </div>
          <div className="p-col-3">
            <Card
              title="Faturamento"
              style={{ height: "90%" }}
              subTitle={`Faturamento do mês (${month + 1})`}
            >
              <h2 style={{ textAlign: "right" }}>R$ {this.props.pedidos.faturamento.toFixed(2)}</h2>
            </Card>
          </div>
        </div>
        <Card title="Novos pedidos">
          <DataTable value={rows}
           selectionMode="single"
           emptyMessage="Não há pedidos no momento!"
           style={{height: '300px', overflow: 'auto'}}
           rowHover={true}
           onRowClick={this.handleClick}
          >
            <Column field="nome_prato" header="Prato" />
            <Column field="address" body={this.templateAddress} header="Endereco" />
            <Column field="itens" body={this.templateItens} header="itens" />
            <Column field="totalItem" body={this.templateTotal} header="Total pedido" />
            <Column field="aceite" body={this.templateAceite} header="Aceite" />
          </DataTable>
        </Card>
        <Card title="Pedidos Entregues">
        <DataTable value={rows_entregues}
           selectionMode="single"
           style={{height: '300px', overflow: 'auto'}}
           rowHover={true}
           emptyMessage="Você ainda não entregou nenhum pedido, tente mais tarde."
           onRowClick={this.handleClick}
          >
            <Column field="nome_prato" header="Prato" />
            <Column field="endereco" body={this.templateAddress} header="Endereco" />
            <Column field="itens" body={this.templateItens} header="itens" />
            <Column field="totalItem" body={this.templateTotal} header="Total pedido" />
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
    onFetchPedidos: () => {dispatch(actions.fetchPedidos())},
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Restaurante);
