import React from 'react';
import classes from "./IndicatorLight.module.css";

const IndicatorLight = (props) => {

  const indicatorStyles = {
    backgroundColor: props.on ? props.color : "rgba(0,0,0,0)",
  }

  return <div className={classes.indicator} style={indicatorStyles}></div>
}

export default IndicatorLight;