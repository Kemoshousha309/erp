import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import style from "./Tool.module.scss";
import {
    faClipboard,
    faPlusCircle,
    faSearch,
    faEdit,
    faArrowCircleLeft,
    faArrowCircleRight,
    faAngleDoubleLeft,
    faAngleDoubleRight
} from "@fortawesome/free-solid-svg-icons"


const Tool = props => {
    let icon = null;
    switch (props.type) {
        case "display":
            icon = faClipboard;
            break;
        case "search":
            icon = faSearch;
            break;
        case "add":
            icon = faPlusCircle;
            break;
        case "update":
            icon = faEdit;
            break;
        case "nextLeft":
            icon = faArrowCircleLeft;
            break;
        case "nextRight":
            icon = faArrowCircleRight;
            break;
        case "forwardLeft":
            icon = faAngleDoubleLeft;
            break;
        case "forwardRight":
            icon = faAngleDoubleRight;
            break;
        default:
            icon = null;
            break;
    }
    let state = props.state ? style.active : style.inactive
    return(
        <li  className={[style.Tool, state].join(" ")}>
            <button disabled={!props.state} onClick={() => props.clicked(props.type)}>
                <FontAwesomeIcon icon={icon} />
            </button>
        </li>
    )
}

export default Tool;

