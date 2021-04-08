import React from "react";
import style from "./StatusBar.module.scss";

const StatusBar = props => {
    // console.log("StatusBar render")
    const show = props.show ? style.show : style.hidden
    const classes = [style.statusContainer, style.success, show].join(' ');
    return(
        <div className={classes}>
            <div className={style.content}>
                {props.children}
            </div>
            <div className={style.statusColor}></div>
        </div>
    )
}

export default StatusBar;