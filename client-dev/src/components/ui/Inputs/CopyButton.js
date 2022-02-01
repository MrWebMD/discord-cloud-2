import React, { useState, useEffect } from "react";
import classes from "./CopyButton.module.css";
const CopyButton = (props) => {
  const [showIndicator, setShowIndicator] = useState(false);

  const clickHandler = (event) => {
    event.stopPropagation();
    console.log(props.text);
    navigator.clipboard.writeText(props.text);
    setShowIndicator(true);
  };

  useEffect(() => {
    if (showIndicator) {
      const timeout = setTimeout(() => {
        setShowIndicator(false);
      }, 800);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [showIndicator]);

  return (
    <button className={classes.copyButton} onClick={clickHandler}>
      {showIndicator ? "Copied" : "Copy"}
    </button>
  );
};

export default CopyButton;
