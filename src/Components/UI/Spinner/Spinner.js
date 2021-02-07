import React from "react";
import style from "./Spinner.module.scss";

const Spinner = props => {
    const small = props.small ? style.small : null
    const classes = [style.loader, small].join(' ')
    return (
        <div className={classes} style={{color: props.color, margin: props.margin}} >loading..</div>
    )
}

export default Spinner;