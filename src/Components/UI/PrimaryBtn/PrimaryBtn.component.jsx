import React from "react";
import { t } from "../../../Languages/languages";
import Btn from "../Btn/Btn.component"

// layer to connect the reusable Btn component to our App
const PrimaryBtn = ({ label, lanState, lanTable, writability, ...other }) => {
 // remove unnecessary props to keep the dom clean
 delete other.dispatch
 delete other.fieldType
  return (
    <Btn
      label={
        t(label) ? t(label) : label
      }
      disabled={!writability}
      {...other}
    />
  );
};


export default (PrimaryBtn);

