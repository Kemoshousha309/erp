import React from "react";
import { NavLink } from "react-router-dom";
import { Tooltip } from "@mui/material";
import style from "./SideTree.module.scss";
import logo from "../../Assets/logo.png";
import Tree from "./Tree/Tree";
import { t } from "../../Languages/languages";

function SideTree(props) {
  // console.log("SideTree render")
  const classes = [
    style.SideTree,
    props.sideNavActivity ? style.active : style.inActive,
  ].join(" ");

  const output = t("dash_board");
  return (
    <div className={classes}>
      <div>
        <NavLink to="/">
          <span className={style.sideNavHeader}>
            <Tooltip
              enterDelay={800}
              title={props.sideNavActivity ? "" : output}
              arrow
              placement="right"
            >
              <img src={logo} alt="logo" />
            </Tooltip>
            {props.sideNavActivity ? "Experts Vision" : null}
          </span>
        </NavLink>
        <Tree {...props} />
        <span>
          <i onClick={props.sideNavClick} className={style.toggleIcon}>
            {props.sideNavActivity ? "<" : ">"}
          </i>
        </span>
      </div>
    </div>
  );
}

export default SideTree;
