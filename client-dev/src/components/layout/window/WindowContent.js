import classes from './WindowContent.module.css'
import detectElectron from '../../../helpers/detectElectron';
const WindowContent = (props) => {

  const isElectronClient = detectElectron();

  const classNames = `${classes.windowContent} ${isElectronClient ? "" : classes.fullHeight}`;

  return <div className={classNames}>{props.children}</div>
}

export default WindowContent;