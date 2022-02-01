import React from "react";
import classes from "./BoxFlip.module.css";

const BoxFlip = (props) => {

  var boxFlipClasses = classes.boxFlip;

  if(props.className) {
    boxFlipClasses = `${props.className}  ${boxFlipClasses}`;
  }

  return <div className={boxFlipClasses}></div>;
};

export default BoxFlip;
