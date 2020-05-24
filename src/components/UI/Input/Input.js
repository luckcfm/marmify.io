import React from "react";

import classes from "./Input.module.css";

const input = (props) => {
  let inputElement = null;
  const inputClasses = [classes.input_container];

  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.input_field_invalid);
  }

  switch (props.elementType) {
    case "input":
      inputElement = (
        <div className={inputClasses.join(' ')}>
          <i className={props.ico}></i>
          <input
            onChange={props.changed}
            {...props.elementConfig}
            value={props.value}
            className={classes.input_field}
          />
        </div>
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          className={inputClasses.join(" ")}
          value={props.value}
          onChange={props.changed}
        >
          {props.elementConfig.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default input;
