import classes from "./Navigation.module.css";
import NavIcon from "./NavIcon";
import { useSelector } from "react-redux";
import NavDivider from "./NavDivider";

const Navigation = (props) => {
  const guilds = useSelector((state) => state.appSlice.guilds);
  const pages = useSelector((state) => state.appSlice.pages);
  
  return (
    <div className={classes.navigation}>
      <NavIcon text={<i className="fab fa-cloudversify"></i>} url={pages.homePageURL} />
      <NavIcon text={<i className="fas fa-cog"></i>} url={pages.settingsPageURL} />
      <NavDivider />
      {guilds.map((item) => {
        const { id, nameAcronym, icon } = item;
        return (
          <NavIcon
            key={id}
            icon={icon}
            text={nameAcronym}
            url={`${pages.fileBrowserPageURL}/${id}`}
          />
        );
      })}
    </div>
  );
};
export default Navigation;
