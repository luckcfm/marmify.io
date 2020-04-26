import React, { Component } from "react";
import { connect } from "react-redux";
import { Column } from "primereact/column";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import "primeflex/primeflex.css";

export class Restaurante extends Component {
  render() {
    let cols = [
      { field: "nome", header: "Nome" },
      { field: "itens", header: "itens" },
      { field: "preco", header: "Preco" },
      { field: "qtd", header: "Quantidade" },
      { field: "disponivel", header: "Disponivel" },
    ];
    const cars = [
      { brand: "VW", year: 2012, color: "Orange", vin: "dsad231ff" },
      { brand: "Audi", year: 2011, color: "Black", vin: "gwregre345" },
      { brand: "Renault", year: 2005, color: "Gray", vin: "h354htr" },
      { brand: "BMW", year: 2003, color: "Blue", vin: "j6w54qgh" },
      { brand: "Mercedes", year: 1995, color: "Orange", vin: "hrtwy34" },
      { brand: "Volvo", year: 2005, color: "Black", vin: "jejtyj" },
      { brand: "Honda", year: 2012, color: "Yellow", vin: "g43gr" },
      { brand: "Jaguar", year: 2013, color: "Orange", vin: "greg34" },
      { brand: "Ford", year: 2000, color: "Black", vin: "h54hw5" },
      { brand: "Fiat", year: 2013, color: "Red", vin: "245t2s" },
    ];
    return (
      <>
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
          <DataTable value={cars}>
            <Column field="vin" header="Prato" />
            <Column field="year" header="Endereco" />
            <Column field="brand" header="Aceitar" />
            <Column field="color" header="Negar" />
          </DataTable>
        </Card>
        {/* <Card title="Pratos Cadastrados">
          <DataTable></DataTable>
        </Card> */}
      </>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Restaurante);
