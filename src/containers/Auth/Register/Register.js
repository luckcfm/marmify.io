import React, { useState } from "react";
import {Form} from 'react-bootstrap';
import RegisterIcon from "../../../assets/RegisterIcon.svg";
import * as classes from "./Register.module.css";
import Input from "../../../components/UI/Input/RegisterInput";
export default function Register() {
  const initialState = {
    controls: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Seu nome",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Endereco",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Codigo postal",
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5,
          isNumeric: true,
        },
        valid: false,
        touched: false,
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Cidade",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Seu email",
        },
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      role: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "usuario", displayValue: "Quero pedir" },
            { value: "restaurante", displayValue: "Quero entregar" },
          ],
        },
        value: "fastest",
        validation: {},
        valid: true,
      },
      formIsValid: false,
    },
  };
  const [registro, setRegistro] = useState(initialState);
  const submitHandler = () => {
    console.log("fakiiie");
  };
  const formElementsArray = [];
  for (let key in registro.controls) {
    formElementsArray.push({
      id: key,
      config: registro.controls[key],
    });
  }
  let form = formElementsArray.map((formElement) => {
   if(formElement.id !== 'formIsValid')
   {
    return (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        ico={formElement.config.ico}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        changed={(event) => this.inputChangedHandler(event, formElement.id)}
      ></Input>
    );
   }
    
  });
  return (
    <>
      <div className={classes.LoginForm}>
      <div className={classes.FormRight}>
          {/* <h1>
            Bem vindo ao <i style={{ color: "#BE63FF" }}>Marmify.io</i>
          </h1> */}
          <Form>
            {form}
          </Form>
          <input
            type="submit"
            value="Registrar"
            onClick={submitHandler}
            className={`${classes.input_field} ${classes.input_submit}`}
          />
        </div>
        <div className={classes.ImageLeft}>
          <img src={RegisterIcon}></img>
        </div>
       
      </div>
    </>
  );
}
