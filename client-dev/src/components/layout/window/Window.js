import classes from "./Window.module.css";
import WindowContent from "./WindowContent";
import TitleBar from './TitleBar';
import { useSelector } from "react-redux";
import detectElectron from "../../../helpers/detectElectron";

const isElectronClient = detectElectron();

const Window = (props) => {

  const appTitle = useSelector(
    (state) => state.appSlice.title
  );

  const handleWindowAction = (action) => {

  
    console.log("Handling window action");
    if (!isElectronClient) {
      console.log("Not an electron client");
      return;
    }
    console.log("We are an electron client");

    switch(action){
      case "minimize":
        window.electron.minimize();
        console.log("Minimizing");
        break;
      case "maximize":
        window.electron.maximize();
        console.log("Maximizing");
        break;
      case "close":
        window.electron.close();
        console.log("Closing");
        break;
      default:
        break;
    }
  }

  return (
    <div className={classes.window}>
      {isElectronClient && <TitleBar titleName={appTitle} onWindowAction={handleWindowAction}/>}
      <WindowContent>{props.children}</WindowContent>
    </div>
  );
};

export default Window;
