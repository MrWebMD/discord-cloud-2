import React from "react";
import classes from "./ErrorPage.module.css";

const ErrorPage = (props) => {
  return (
    <div className={classes.errorPage}>
      <p>{props.message}</p>
    </div>
  );
};

export default ErrorPage;
