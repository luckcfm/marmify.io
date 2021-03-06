import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect,withRouter } from "react-router-dom";
import Spinner from "../../components/UI/Spinner/Spinner";
import Input from "../../components/UI/Input/Input";
import classes from "./Auth.module.css";
import "./Auth.css"
import LoginIcon from '../../assets/login.svg'
import * as action from "../../store/actions/index";
class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Endereço de E-mail",
          name: 'email'
        },
        ico: "pi pi-envelope",
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: "input",
        ico: "pi pi-lock",
        elementConfig: {
          type: "password",
          placeholder: "Senha",
          name: 'password'
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
    },
  };

  componentDidMount() {
    this.props.onHideToolbar();
    if (this.props.authRedirectPath !== "/") {
      this.props.setAuthRedirectPath();
    }
  }
  goToRegister = () => {
    this.props.history.push('/registro')
  }
  submitHandler = (event) => {
    console.log('hello')
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignUp
    );
  };
  checkValidity(value, rules) {
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
  }
  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true,
      },
    };
    this.setState({ controls: updatedControls });
  };
  render() {
    if (this.props.isAuthenticated) {
      this.props.history.push("/pratos");
    }
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }
    let form = formElementsArray.map((formElement) => {
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
    });
    if (this.props.loading) {
      form = <Spinner></Spinner>;
    }
    let errorMessage = null;
    if (this.props.error) {
      errorMessage = <p>{this.props.error.error}</p>;
    }
    let authRedirect = null;
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to={this.props.authRedirectPath}></Redirect>;
    }

    return (
        <>
        {authRedirect}
          <div className={classes.LoginForm}>
            <div className={classes.ImageLeft}>
              <img src={LoginIcon} alt="Food"></img>
            </div>
            <div className={classes.FormRight}>
              {errorMessage}
            <h1>Bem vindo ao <i style={{color: '#BE63FF'}}>Marmify.io</i></h1>
                {form}
                <input 
                  type="submit" 
                  value="Login"
                  onClick={this.submitHandler}
                  className={`${classes.input_field} ${classes.input_submit}`} />
                <span>Esqueceu seu <a href="#"> Usuario / Senha ?</a></span>
                <span className={classes.create_account}>
                    <a href="#" onClick={this.goToRegister}>Crie agora sua conta ➡ </a>
                </span>
            </div>
          </div>
        </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    authRedirectPath: state.auth.authRedirectPath
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(action.signin(email, password, isSignup)),
    setAuthRedirectPath: () => dispatch(action.setAuthRedirectPath("/")),
    onHideToolbar: () => dispatch(action.hideToolbar())
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Auth));
