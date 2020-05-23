import React, { useState } from "react";
import { InputText } from "primereact/inputtext";

export default function NovoPrato() {
  const [state, setState] = useState({ nome: "", descricao: "" });

  return (
    <div>
      <InputText
        value={state.name}
        placeholder="Nome do prato"
        onChange={(e) => setState({ name: e.target.value })}
      />
      <br></br>
      <br></br>
      <InputText
        value={state.descricao}
        placeholder="Descricao"
        onChange={(e) => setState({ name: e.target.value })}
      />
      <br></br>
      <InputText
        value={state.descricao}
        placeholder="Preco"
        onChange={(e) => setState({ name: e.target.value })}
      />
    </div>
  );
}
