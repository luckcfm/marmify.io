import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Spinner from "../../components/UI/Spinner/Spinner";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
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
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Senha",
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
    isSignUp: true,
  };

  componentDidMount() {
    if (this.props.authRedirectPath !== "/") {
      this.props.setAuthRedirectPath();
    }
  }
  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignUp
    );
  };
  switchAuthModeHandler = () => {
    this.setState((prevState) => {
      return { isSignUp: !prevState.isSignUp };
    });
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
      this.props.history.push("/central");
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
      errorMessage = <p>{this.props.error.message}</p>;
    }
    let authRedirect = null;
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to={this.props.authRedirectPath}></Redirect>;
    }
    return (
        <>
          <div className={classes.LoginForm}>
            <div className={classes.ImageLeft}>
              <img src={LoginIcon}></img>
            </div>
            <div className={classes.FormRight}>
            <h1>Bem vindo ao Marmify</h1>
           
                <div className={classes.input_container}>
                    <i className="pi pi-envelope"></i>
                    <input 
                      placeholder="Email" 
                      type="email" 
                      name="Email" 
                      className={classes.input_field} />
                </div>
                <div className={classes.input_container}>
                    <i className="pi pi-lock"></i>
                    <input  
                      placeholder="Senha" 
                      type="password" 
                      name="Password" 
                      className={classes.input_field} />
                </div>
                <input 
                  type="submit" 
                  value="Login"
                  className={`${classes.input_field} ${classes.input_submit}`} />
                <span>Forgot <a href="#"> Username / Password ?</a></span>
                <span className={classes.create_account}>
                    <a href="#">Create your account ➡ </a>
                </span>
            </div>
          </div>
        
        {/* <div id="form_wrapper">
            <div id="form_left">
                <img src="icon.png" alt="computer icon" />
            </div>
            <div id="form_right">
                <h1>Member Login</h1>
                <div class="input_container">
                    <i class="fas fa-envelope"></i>
                    <input placeholder="Email" type="email" name="Email" id="field_email" class='input_field' />
                </div>
                <div class="input_container">
                    <i class="fas fa-lock"></i>
                    <input  placeholder="Password" type="password" name="Password" id="field_password" class='input_field' />
                </div>
                <input type="submit" value="Login" id='input_submit' class='input_field' />
                <span>Forgot <a href="#"> Username / Password ?</a></span>
                <span id='create_account'>
                    <a href="#">Create your account ➡ </a>
                </span>
            </div>
        </div> */}
        </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null && state.auth.token !== undefined,
    authRedirectPath: state.auth.authRedirectPath
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(action.signin(email, password, isSignup)),
    setAuthRedirectPath: () => dispatch(action.setAuthRedirectPath("/")),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Auth);