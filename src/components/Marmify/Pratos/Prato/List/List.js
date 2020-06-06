import React from 'react'
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

export default function List(props) {
    const pratos = props.pratos.pratos;
    let pratosArray = [];
    if(Object.keys(pratos).length > -1 ) {
        console.log(pratos);
        pratosArray = Object.keys(pratos).map(prato => {
            let tmpPrato = pratos[prato]
            return {
                id:prato,
                ...tmpPrato
            }
        })
    }
    return (
        <div>
              <DataTable value={pratosArray}>
                <Column field="nome_prato" header="Prato" />
                <Column field="rating" header="Avaliação geral" />
                <Column field="preco_base" header="Preço" />
                <Column field="disponivel" header="Disponivel" />
            </DataTable>
        </div>
    )
}
