import React from "react";
import classes from "./DropDown.module.css";

const DropDown = (props) => {

  const changeHandler = (event) => {

    const selectedElement = event.target;

    const optionIdentifier = selectedElement.selectedOptions[0].value

    if(optionIdentifier === props.placeholder) {
      return;
    }

    props.onChange(optionIdentifier);
  }

  return (
    <div className={classes.dropDownWrapper}>
      <select
        className={classes.dropDown}
        onChange={changeHandler}
        value={props.defaultValue}
      >
        {props.placeholder && <option value={props.placeholder}>{props.placeholder}</option>}
        
        {props.options.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.name}
          </option>
        ))}

      </select>
    </div>
  );
};

export default DropDown;
