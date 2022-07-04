import React from "react";
import { connect } from "react-redux";
import { t } from "../../../utilities/lang";
import Btn from "../Btn/Btn.component"

// layer to connect the reusable Btn component to our App
const PrimaryBtn = ({ label, lanState, lanTable, writability, ...other }) => {
 // remove unnecessary props to keep the dom clean
 delete other.dispatch
 delete other.fieldType
  return (
    <Btn
      label={
        t(label, lanTable, lanState) ? t(label, lanTable, lanState) : label
      }
      disabled={!writability}
      {...other}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    lanState: state.lang.lan,
    lanTable: state.lang.langTables,
  };
};

export default connect(mapStateToProps, null)(PrimaryBtn);

