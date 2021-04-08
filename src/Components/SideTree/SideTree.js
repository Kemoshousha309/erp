import React from "react";
import style from "./SideTree.module.scss";
import { connect } from 'react-redux';
import logo from "../../assests/logo.png"
import Tree from "./Tree/Tree";
import { NavLink } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import {t} from "../../utilities/lang"

const SideTree = props => {
    // console.log("SideTree render")
    const classes = [style.SideTree,
        props.sideNavActivity ? style.active : style.inActive,
    ].join(" ");
 
      const output = t("dash_board", props.lanTable, props.lanState)
    return(
        <div className={classes}>
            <div >
                        <NavLink to='/' >
                            <span>
                            <Tooltip enterDelay={800} title={props.sideNavActivity ? "" : output} arrow placement="right">
                                <img src={logo} alt="logo" ></img>
                            </Tooltip>
                                {props.sideNavActivity ? "Experts Vision" : null }
                            </span> 
                        </NavLink>
                    <Tree {...props} /> 
                <span>
                    <i onClick={props.sideNavClick} className={style.toggleIcon}>{props.sideNavActivity ? "<" : ">"}</i>
                </span>
            </div>
        </div>
    )
}
const mapStateToProps = state => {
    return {
        lanState: state.lang.lan,
        lanTable: state.lang.langTables
    }
}

const mapDispatchToProps = dispatch => {
    return {
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideTree);