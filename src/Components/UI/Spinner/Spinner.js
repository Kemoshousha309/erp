import React from "react";
import style from "./Spinner.module.scss";

const Spinner = props => {
    return (
        <div className={style.loader} style={{color: props.color}} >loading..</div>
    )
}

export default Spinner;