import React from "react";
import style from "./ErrorPage.module.scss";
import warning from "../../../assests/warning.png"
import {faExclamationCircle} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ErrorPage = props => {
    return (
        <div className={style.container}>
            <h1>{props.message.toUpperCase()}  <FontAwesomeIcon icon={faExclamationCircle} /> </h1>
            <img src={warning} className="img-fluid" alt="warning" />
        </div>
    )
};

export default  ErrorPage;
