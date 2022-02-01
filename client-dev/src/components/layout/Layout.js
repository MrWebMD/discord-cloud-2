import classes from "./Layout.module.css";
import Navigation from './navigation/Navigation';
import Page from './Page';
const Layout = (props) => {

  return <div className={classes.layout}>
    <Navigation/>
    <Page>
      {props.children}
    </Page>
   
  </div>
}

export default Layout;