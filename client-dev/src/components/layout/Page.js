import classes from "./Page.module.css";
// import { TransitionGroup, CSSTransition } from "react-transition-group";
// import { useLocation } from "react-router-dom";
import '../../assets/css/transitions.css';
const Page = (props) => {

  // const location = useLocation();

  return (
    <div className={classes.page}>
      {/* {<TransitionGroup component={null}>
        <CSSTransition key={location.key} classNames="page" timeout={1500}>} */}
          <div className={classes.pageContent}>{props.children}</div>
       {/* { </CSSTransition>
      </TransitionGroup>} */}
    </div>
  );
};

export default Page;
