import classes from './Button.module.css';

function Button(props){
  return (
    <button className={classes.button} onClick={props.onClick} disabled={props.disabled}>
      
      <span className={classes.buttonChildWrapper}>
        {props.children}
      </span>
    </button>
  )
}

export default Button;