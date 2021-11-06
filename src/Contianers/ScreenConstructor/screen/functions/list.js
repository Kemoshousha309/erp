import _ from "lodash";
import { fields, fillRecord } from "../fields";

// list handle ******************************
export const handleList = (thisK) => {
  const currentMode = thisK.state.mode;
  thisK.setState({ listShow: true, mode: "list", prevMode: currentMode });
};

// colse list Handler ************************
export const handleCloseList = (thisK) => {
  const currentState = thisK.state.listShow;
  const previousMode = thisK.state.prevMode;
  thisK.setState({ listShow: !currentState, mode: previousMode });
};

// close list Handler *******************************
export const handleCloseFkList = (thisK) => {
  thisK.setState({ fkListShow: null });
};

// record click Handler ************************
export const handleRecordClick = (thisK, record, i, func) => {
  if (func) {
    func.call(thisK, record, i);
  }
  fillRecord(thisK.state.fields, record);
  fields(thisK.state.fields, "close", false);
  checkNullName(thisK, record);
  thisK.setState({
    listShow: false,
    mode: "d_record",
    recordIndex: i,
    record: record,
  });
};

const checkNullName = (thisK, record) => {
  const fieldsClone = { ...thisK.state.fields };
  if (thisK.state.fks) {
    thisK.state.fks.forEach((fk) => {
      const fkField = fieldsClone[fk];
      if (fkField.readOnlyField) {
        if (!record[fkField.readOnlyField]) {
          const propertyName = `${extractName(fkField.readOnlyField)}_d_name`;
          if (record[propertyName] === null) {
            fieldsClone[fkField.readOnlyField].value = "";
          } else {
            fieldsClone[fkField.readOnlyField].value = record[propertyName];
          }
        }
      }
    });
  }
  return fieldsClone;
};

export const extractName = (propName) => {
  // get the property name after remove d_name or f_name
  let newName = propName.replace("_d_name", "");
  newName = newName.replace("_f_name", "");
  return newName;
};

// FK RECORD CLICK HANDLER *********************
export const fkRecordClickHandler = (thisK, record, func) => {
  const {
    state: { fields, fkListShow },
  } = thisK;
  const fieldsClone = _.cloneDeep(fields);
  const fillFields = thisK.state.fields[fkListShow].fillFields;

  document.getElementById(fkListShow).focus();
  if (fillFields) {
    fillFields.forEach((i) => {
      if (fieldsClone[i.stateName]) {
        fieldsClone[i.stateName].value = record[i.recordName];
        fieldsClone[i.stateName].autoFilledSuccess = true;
        if (fieldsClone[i.stateName].validity) {
          fieldsClone[i.stateName].validity.valid = true;
          fieldsClone[i.stateName].validity.message = null;
        }
      }
    });
  }
  thisK.setState((state, props) => {
    return { fkListShow: null, fields: fieldsClone, fkRecord: record };
  });
  if (func) {
    func.call(thisK, record);
  }
};
