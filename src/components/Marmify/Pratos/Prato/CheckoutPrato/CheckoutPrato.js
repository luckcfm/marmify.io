import React, {useState} from 'react'
import { Card } from "primereact/card";
import Modal from '../../../../UI/Modal/Modal';
import comida_padrao from '../../../../../assets/comida_padrao.jpg'
export default function CheckoutPrato(props) {
    const prato = props.prato;
    console.log(prato);
    let img_prato = null;
    if(!prato || !prato.foto){
        img_prato = <div className="p-col-12" style={{float: 'center', margin: '0 auto'}}><img style={{height: '200px', float: 'center', margin: '0 auto'}} alt="Foto prato" src={comida_padrao}></img></div>
    }else{
        img_prato = <div className="p-col-12"><img alt="Foto prato" src={prato.foto}></img></div>
    }
    return (
        <Modal show={props.showModal} modalClosed={props.modalClosed}>
            <Card title={prato.nome_prato} subTitle={props.prato.descricao}>
                {img_prato}
                {props.prato.descricao}
                <h3>Itens</h3>
                <i>Selecione os itens adicionais para adicionar ao seu pedido.</i>
                <ul>
                    {prato.itens && prato.itens.map(item => {
                        return <li>{item.nome_item}  <span style={{float: 'right'}}><b>R$ {item.preco_item}</b></span></li>
                    })}
                </ul>
            </Card>
        </Modal>
    )
}
