import classes from './RoundButton.module.css';
const RoundButton = (props) => {
  return <button {...props} className={classes.RoundButton}>{props.children}</button>
}

export default RoundButton;