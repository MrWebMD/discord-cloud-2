import React from "react";
import classes from "./SearchBar.module.css";

function SearchBar(props) {
  const searchTerm = props.value || "";

  return (
    <div className={classes.searchBar}>
      <input
        placeholder="Search"
        onChange={props.onChange}
        value={searchTerm}
      />
      <i
        className="fas fa-search"
        style={{ fontSize: "16px", color: "var(--theme-ui-noeyesore)" }}
      ></i>
    </div>
  );
}

export default SearchBar;
