import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import style from "./Btn.module.scss"



// pure reusable and composable button component
const Btn = ({label, center, variant, icon, disabled, ...other}) => {
  const containerClasses = [style.container];
  if(center) containerClasses.push(style.center)
  const btnClasses = [style.Btn];
  if(variant) {
    btnClasses.push(style[variant])
  }else {
    btnClasses.push(style.contained)
  }
  if(disabled) btnClasses.push(style.disabled)
  return (
    <div className={containerClasses.join(" ")}>
    <button className={btnClasses.join(" ")} disabled={disabled} {...other}>
      <FontAwesomeIcon icon={icon} />
      {`  ${label}`}
    </button>
    </div>
  );
};


export default Btn;


// we used fontawsom to apply icons here