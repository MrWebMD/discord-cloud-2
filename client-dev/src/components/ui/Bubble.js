import classes from "./Bubble.module.css";

const Bubble = (props) => {

  const bubbleStyles = {
    backgroundImage: props.icon ? `url(${props.icon})` : "none"
  }
  var bubbleClasses = classes.bubble;
  
  if(props.className) {
    bubbleClasses += ` ${props.className}`
  }
  
  return (
    <div
      style={bubbleStyles}
      className={bubbleClasses}
      onClick={props.onClick}
    >
      <span className={classes.bubbleText}>
        {props.icon ? "" : props.text}
      </span>
    </div>
  );
}

export default Bubble;
