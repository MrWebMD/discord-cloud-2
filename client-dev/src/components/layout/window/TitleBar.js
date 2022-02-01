import classes from "./TitleBar.module.css";

function TitleBar(props) {
  const minimizeHandler = () => {
    props.onWindowAction("minimize");
  };
  const maximizeHandler = () => {
    props.onWindowAction("maximize");
  };
  const closeHandler = () => {
    props.onWindowAction("close");
  };

  return (
    <div className={classes.titleBar}>
      <span className={classes.titleName}>{props.titleName}</span>
      <div className={classes.windowControls}>
        <i className="far fa-window-minimize" onClick={minimizeHandler}></i>
        <i className="fas fa-window-maximize" onClick={maximizeHandler}></i>
        <i className="far fa-window-close" onClick={closeHandler}></i>
      </div>
    </div>
  );
}

export default TitleBar;
