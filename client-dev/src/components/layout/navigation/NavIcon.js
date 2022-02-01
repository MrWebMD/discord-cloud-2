import classes from "./NavIcon.module.css";
import { useNavigate } from "react-router-dom";
import Bubble from "../../ui/Bubble";

const NavIcon = (props) => {
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate(props.url);
  };
  return (
    <Bubble
      icon={props.icon}
      text={props.text}
      onClick={clickHandler}
      className={classes.navIcon}
    />
  );
};

export default NavIcon;
