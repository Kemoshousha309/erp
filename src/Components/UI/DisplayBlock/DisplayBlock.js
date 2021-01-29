import React from "react";
import style from "./DisplayBlock.module.scss"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye} from "@fortawesome/free-solid-svg-icons";
const DisplayBlock = props => <div className={style.displayBlock}><i><FontAwesomeIcon icon={faEye} /></i> {props.children}</div>

export default DisplayBlock;