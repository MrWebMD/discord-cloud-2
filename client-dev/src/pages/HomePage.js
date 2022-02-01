import React from "react";
import classes from './HomePage.module.css';
import Coin from '../components/ui/LoadingIcons/Coin.js';

const HomePage = () => {
  return (
    <div className={classes.homePage}>
      <i className={`fab fa-cloudversify ${classes.logo}`}> </i>
      <p>Select a guild on the left to get started</p>
      <Coin className={classes.loadingIcon}/>
    </div>
  );
};

export default HomePage;
