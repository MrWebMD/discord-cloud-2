import classes from './FileTableMessage.module.css';
import wumpus from '../../../assets/images/wumpus.svg';
const FileTableMessage = (props) => {
  return <div className={classes.tableMessage}>

    {props.showWumpus && <img src={wumpus} alt={props.message}></img>}
    
    <p>{props.message}</p>
  </div>
}

export default FileTableMessage;