import React from "react";
import style from "./Backdrop.module.scss";

const Backdrop = (props) =>
  props.show ? (
    <div
      style={{ opacity: props.opacity }}
      className={style.Backdrop}
      onClick={props.click}
    >
      {
        // console.log("Backdrop render")
      }
    </div>
  ) : null;

export default Backdrop;
