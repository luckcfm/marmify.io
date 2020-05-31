import React from "react";
import classes from "../Sidebar.module.css";
const SidebarItem = (props) => {
  return (
    <div className="p-grid">
      <div
        onClick={() => props.clickHandler(props.mode)}
        className={props.classNames.join(" ")}
      >
        <h3>{props.name}</h3>
      </div>
    </div>
  );
};

export default SidebarItem;
