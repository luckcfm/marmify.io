import React from "react";
import { Card } from "primereact/card";
import { Rating } from "primereact/rating";

export default function Prato(props) {
  const header = <img style={{height: '200px'}} alt="Card" src={props.prato.image ? props.prato.image : props.prato.img} />;
  const footer = (
    <span>
      <span 
       style={{ float: "right", color: "#594994" }}>
         <b>{props.prato.preco === undefined ? 
          "Vendidos: " + props.prato.totalVendido : props.prato.preco}</b>
       </span>
      <br></br>
    </span>
  );
    console.log(props.prato);
  const titulo = (
    <>
      {" "}
      {props.prato.nome}{" "}
      <div style={{position: 'relative' }}>
        <span style={{position: 'absolute', top: '-22px'}}>
        <Rating
          value={props.prato.rating}
          onChange={() => {
            console.log("change");
          }}
          cancel={false}
          stars={5}
        />{" "}
        </span>
       
      </div>
    </>
  );

  return <div>
  <Card title={titulo} style={{height: '300px'}} footer={footer} header={header}>
    <div style={{height: '30px', fontSize: '12px'}}>{props.prato.descricao}</div>
  </Card>
</div>;
}
