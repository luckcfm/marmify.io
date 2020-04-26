import React from "react";
import { Card } from "primereact/card";
import { Rating } from "primereact/rating";

export default function Prato(props) {
  console.log(props);
  const header = <img style={{height: '200px'}} alt="Card" src={props.prato.img} />;
  const footer = (
    <span>
      <span style={{ float: "right", color: "#7CF87C" }}>{props.prato.preco === undefined ? "Vendidos: " + props.prato.qtd : props.prato.preco}</span>
      <br></br>
    </span>
  );

  const titulo = (
    <>
      {" "}
      {props.prato.nome}{" "}
      <span style={{ float: "right" }}>
        <Rating
          value={props.prato.rating}
          onChange={() => {
            console.log("change");
          }}
          cancel={false}
          stars={5}
        />{" "}
      </span>
    </>
  );

  return <div>
  <Card title={titulo} footer={footer} header={header}>
    {props.prato.descricao}
  </Card>
</div>;
}
