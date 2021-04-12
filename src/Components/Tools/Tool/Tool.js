import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import style from "./Tool.module.scss";
import {connect} from "react-redux"
import Tooltip from "@material-ui/core/Tooltip";
import { getRelatedIcon } from "../../../utilities/tools";




const Tool = props => {
    // console.log("Tool render")
    const [icon, toolTip] = getRelatedIcon(props.type, props.lanTable, props.lanState)
    let onMode = null
    if(props.onMode){
        onMode = style.onMode
    }
    let state = props.state ? [style.active, style[props.type], onMode].join(' ') : style.inactive;
    let tool = null;
    if(!props.state){
       tool = (
        <button disabled={!props.state} onClick={() => props.clicked(props.type)}>
            <FontAwesomeIcon icon={icon} />
        </button>
       )
    }else{
        tool = (
            <Tooltip title={toolTip} arrow placement="bottom" enterDelay={800}  >
                <button disabled={!props.state} onClick={() => props.clicked(props.type)}>
                    <FontAwesomeIcon icon={icon} />
                </button>
            </Tooltip>
        )
    }
    return(
        <li  className={[style.Tool, state].join(" ")}>
               {tool}
        </li>
    )
}



const mapStateToProps = state => {
    return {
        lanState: state.lang.lan,
        lanTable: state.lang.langTables
    }
}

export default connect(mapStateToProps, null)(Tool);

