import { useEffect } from "react";
import { createPortal } from "react-dom";
// import { CSSTransition } from "react-transition-group";
import Transition from "react-transition-group/Transition";
import { useLocation } from "react-router-dom";
import RoundButton from './Inputs/RoundButton';
import '../../assets/css/transitions.css';

import classes from "./Modal.module.css";
const Modal = (props) => {
  const overlayPortal = document.getElementById("overlays");
  const backdropPortal = document.getElementById("backdrops");

  const location = useLocation();

  useEffect(() => {
    document.getElementById("root").classList.add(classes.blur);
    return () => {
      document.getElementById("root").classList.remove(classes.blur);
    };
  }, []);

  const modalContent = (
/*     <Transition
    mountOnEnter
    unmountOnExitclassNames="fade" 
    in={props.visible}
    timeout={1500}> */
      <div className={classes.modal}>
        <div>
          <h2>{props.text}</h2>
        </div>
        <div>
          <RoundButton onClick={props.onConfirm}>Confirm</RoundButton>
          <RoundButton onClick={props.onCancel}>Cancel</RoundButton>
        </div>
      </div>
   /*  </Transition> */
  );

  return (
    <>
      {createPortal(modalContent, overlayPortal)}
      {createPortal(<div className={classes.backdrop}></div>, backdropPortal)}
    </>
  );
};

export default Modal;
