import React from "react";
import { Tabs, Tab } from "react-bootstrap";

import Modens from "../../../containers/Central/Modens/Modens";
import Configuration from "../../Central/Configuration/Configuration";
import Stat from "../../Central/Stat/Stat";
import classes from "./Sidebar.module.css";
import AddForm from '../../../containers/Central/AddForm/AddForm'
export default function Sidebar(props) {
  return (
    <div className={classes.Sidebar}>
      {props.livecast.name}
      <div className={classes.Preview}></div>
      <div className={classes.SimpleConfig}>
        <div
          style={{
            backgroundColor: "#6E92B2",
            width: "300px",
            margin: "0 auto",
            display: "inline-block",
            boxSizing: "border-box",
          }}
        >
          <h3>
            BITRATE{" "}
            <select style={{marginTop: '5px'}}>
              <option>1000</option>
              <option>2000</option>
              <option>3000</option>
              <option>4000</option>
            </select>
          </h3>
        </div>
      </div>
      <div className={classes.Modens}>
        <Tabs>
          <Tab eventKey="modems" title="Modens">
            <Modens livecast={props.livecast}></Modens>
          </Tab>
          <Tab eventKey="config" title="Config">
            <Configuration livecast={props.livecast}></Configuration>
          </Tab>
          <Tab eventKey="Stat" title="Estatistics">
            <Stat livecast={props.livecast}></Stat>
          </Tab>
          <Tab eventKey="Add" title="ADD LC">
            <AddForm></AddForm>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
