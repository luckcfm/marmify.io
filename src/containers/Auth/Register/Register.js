import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { connect } from "react-redux";
import { FileUpload } from "primereact/fileupload";
import RegisterIcon from "../../../assets/RegisterIcon.svg";
import * as classes from "./Register.module.css";
import * as actions from "../../../store/actions/index";
import Input from "../../../components/UI/Input/RegisterInput";
import { updateObject } from "../../../shared/utility";
import Spinner from "../../../components/UI/Spinner/Spinner";
const Register = function (props) {
  const initialState = {
    controls: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          name: "name",
          placeholder: "Seu nome",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      phone: {
        elementType: 'input',
        elementConfig: {
          type: "text",
          name: "phone",
          placeholder: "Número de telefone"
        },
        value: "",
        validation: {
          required: true,
          isNumeric: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          name: "street",
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
          name: "zipCode",
          placeholder: "Codigo postal",
        },
        value: "",
        validation: {
          required: true,
          minLength: 8,
          maxLength: 9,
          isNumeric: true,
        },
        valid: false,
        touched: false,
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          name: "country",
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
          name: "email",
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
      password: {
        elementType: "password",
        elementConfig: {
          type: "password",
          name: "password",
          placeholder: "Digite a sua senha",
        },
        value: "",
        validation: {
          required: true,
          isPassword: true,
        },
      },
      secondPassword: {
        elementType: "password",
        elementConfig: {
          type: "password",
          placeholder: "Confirme sua senha",
        },
        value: "",
        validation: {
          required: true,
          isSecondPassword: true,
        },
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
  const uploadHandler = (e) => {
    const newState = { ...registro };
    newState.image = e.files[0];
    setRegistro(newState);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    const formData = {};
    for (let formElementIdentifier in registro.controls) {
      formData[formElementIdentifier] =
        registro.controls[formElementIdentifier].value;
    }
    formData.image = registro.image;
    props.onRegister(formData);
  };
  const checkValidity = (value, rules) => {
    let isValid = true;
    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }

    return isValid;
  };
  const inputChangedHandler = (event, inputIdentifier) => {
    const updatedFormElement = updateObject(
      registro.controls[inputIdentifier],
      {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          registro.controls[inputIdentifier].validation
        ),
        touched: true,
      }
    );
    const updatedOrderForm = updateObject(registro.controls, {
      [inputIdentifier]: updatedFormElement,
    });
    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }
    setRegistro({ controls: updatedOrderForm, formIsValid: formIsValid });
  };
  const formElementsArray = [];
  for (let key in registro.controls) {
    formElementsArray.push({
      id: key,
      config: registro.controls[key],
    });
  }

  let form = formElementsArray.map((formElement) => {
    if (formElement.id !== "formIsValid") {
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

          changed={(event) => inputChangedHandler(event, formElement.id)}
        ></Input>
      );
    }
  });
  if (props.loading) {
    form = <Spinner></Spinner>;
  }
  let msg = <></>
  if( props.successMsg !== null) {
    msg = <p> {props.successMsg} </p>
  }

  return (
    <>
    {msg}
      <div className={classes.LoginForm}>
        <div className={classes.FormRight}>
          <h1>
            Bem vindo ao <i style={{ color: "#BE63FF" }}>Marmify.io</i>
          </h1>
          <b>Insira seus dados para se registrar.</b>
          <Form>{form}
          <div style={{float:'center', textAlign: 'center'}}>
           <FileUpload
              name="demo"
              chooseLabel="Enviar foto do usuário/restaurante"
              mode="basic"
              customUpload={true}
              auto={true}
              uploadHandler={uploadHandler}
            />
            </div>
          </Form>
          <input
            type="submit"
            value="Registrar"
            onClick={submitHandler}
            className={`${classes.input_field} ${classes.input_submit}`}
          />
          <span>
            Ja e registrado ?{" "}
            <a onClick={() => props.history.push("/login")} href="#">
              {" "}
              Clique aqui
            </a>{" "}
            para entrar.
          </span>
        </div>
        <div className={classes.ImageLeft}>
          <img src={RegisterIcon}></img>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.auth.loadingSignUp,
    successMsg: state.auth.loadingSignUpMsg
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onRegister: (formData) => dispatch(actions.signup(formData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
