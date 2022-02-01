import React from "react";
import classes from './Coin.module.css';

const Coin = (props) => {

  var coinClasses = classes.coin;

  if(props.className) {
    coinClasses = `${props.className}  ${coinClasses}`;
  }

  return (
    <div className={classes.box}>
      <div className={coinClasses}></div>
    </div>
  );
};

export default Coin;
