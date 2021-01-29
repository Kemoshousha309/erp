import React from "react";
import style from "./SelectDrop.module.scss";

const SelectDrop = props => {
    return(
        <select onChange={props.changed} value={props.current} className={style.selectDrop}>
           {props.children}
        </select>
    )
}

export default SelectDrop;