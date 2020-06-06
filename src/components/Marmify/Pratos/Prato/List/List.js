import React from 'react'
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Rating } from "primereact/rating";
import comida_padrao from '../../../../../assets/comida_padrao.jpg'
export default function List(props) {
    const pratos = props.pratos.pratos;
    let pratosArray = [];
    if(Object.keys(pratos).length > -1 ) {
        pratosArray = Object.keys(pratos).map(prato => {
            let tmpPrato = pratos[prato]
            return {
                id:prato,
                ...tmpPrato
            }
        })
    }
    const fotoTemplate = (rowData,column) => {
        if(rowData.foto) {
            return <img>{rowData.foto}</img>
        }else{
            return  <img src={comida_padrao} style={{height: '39px', float: 'center', margin: '0 auto'}}></img>
        }
    }
    const addRating = (serial, val ) => {
        val.preventDefault();
        const value = val.value;
        console.log('Changing rate for ', serial , value )
    }
    const ratingTemplate = (rowData, column) => {
        return  <Rating
        value={rowData.rating}
        onChange={(ev) => {
          addRating(rowData.id, ev)
        }}
        cancel={false}
        stars={5}
      />
    }

    const precoTemplate = (rowData, column) => {
        const preco = rowData.preco_base;
        return <p><b>R$ {parseFloat(preco)}</b></p>
    }

    const disponivelTemplate = (rowData, column) => {
        if(rowData.disponivel){
            return <span style={{color: 'green'}}><b>Sim</b></span>
        }else{
            return <span stype={{color: 'red'}}><b>Não</b></span>
        }
    }
    const handleRowSelect = (line) => {
        // console.log('selected', line)
    }
    const handleClick = (line) => {
        console.log('Clicked', line)
    }
    return (
        <div>
              <DataTable 
                value={pratosArray}
                selectionMode="single"
                selection={handleRowSelect}
                rowHover={true}
                onRowClick={handleClick}
                emptyMessage="Esse restaurente ainda não possui pratos registrados, por favor tente mais tarde"
              >
                <Column field="foto" header="#" body={fotoTemplate} style={{width: '120px', textAlign: 'center'}} />
                <Column field="nome_prato" header="Prato" />
                <Column field="rating" header="Avaliação geral" body={ratingTemplate} />
                <Column field="preco_base" header="Preço" style={{width: '120px', textAlign: 'center'}} body={precoTemplate} />
                <Column field="disponivel" header="Disponivel" style={{width: '120px', textAlign: 'center'}} body={disponivelTemplate} />
            </DataTable>
        </div>
    )
}
