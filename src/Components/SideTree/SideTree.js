import React from "react";
import style from "./SideTree.module.scss";
import { connect } from 'react-redux';
import logo from "../../assests/logo.png"
import Tree from "./Tree/Tree";

const SideTree = props => {

    const classes = [style.SideTree,
        props.sideNavActivity ? style.active : style.inActive,
    ].join(" ");
     
    return(
        <div className={classes}>
            <div >
                <span>
                    <img src={logo} alt="logo" ></img>
                    {props.sideNavActivity ? " Experts Vision" : null }
                </span> 
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
        lanState: state.lan
    }
}

const mapDispatchToProps = dispatch => {
    return {
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideTree);