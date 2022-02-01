import React from "react";
import Button from "../ui/Inputs/Button";

const BrowserToolbarButton = (props) => {

  const clickHandler = (event) => {

    if(props.disabled) {
      return;
    }
    props.onClick(props.action)
  }

  return <Button text="" onClick={clickHandler} disabled={props.disabled}>
    {props.children}
  </Button>;
};

export default BrowserToolbarButton;
