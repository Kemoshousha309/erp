import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import style from "./Tool.module.scss";
import {connect} from "react-redux"
import {
    faClipboard,
    faPlusCircle,
    faSearch,
    faEdit,
    faArrowCircleLeft,
    faArrowCircleRight,
    faAngleDoubleLeft,
    faAngleDoubleRight,
    faSave
} from "@fortawesome/free-solid-svg-icons";
import Tooltip from "@material-ui/core/Tooltip";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import {t} from "../../../utilities"

const Tool = props => {
    let icon = null;
    let toolTip = null;
    switch (props.type) {
        case "display":
            icon = faClipboard;
            toolTip = t("list", props.lanTabel, props.lanState);
            break;
        case "search":
            icon = faSearch;
            toolTip = t("search", props.lanTabel, props.lanState);
            break;
        case "add":
            icon = faPlusCircle;
            toolTip = t("add", props.lanTabel, props.lanState);
            break;
        case "update":
            icon = faEdit;
            toolTip = t("modify", props.lanTabel, props.lanState);
            break;
        case "nextLeft":
            icon = faArrowCircleLeft;
            toolTip = t("previous", props.lanTabel, props.lanState);
            break;
        case "nextRight":
            icon = faArrowCircleRight;
            toolTip = t("next", props.lanTabel, props.lanState);
            break;
        case "forwardLeft":
            icon = faAngleDoubleLeft;
            toolTip = t("first", props.lanTabel, props.lanState);
            break;
        case "forwardRight":
            icon = faAngleDoubleRight;
            toolTip = t("last", props.lanTabel, props.lanState);
            break;
        case "save":
            icon = faSave;
            toolTip = t("save", props.lanTabel, props.lanState);
            break;
        default:
            icon = null;
            break;
    }
 
    let state = props.state ? style.active : style.inactive;
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
        lanTabel: state.lang.langTables
    }
}

export default connect(mapStateToProps, null)(Tool);

