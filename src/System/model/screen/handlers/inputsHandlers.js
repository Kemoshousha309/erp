/**
 * @module inputsHandlers
 */


import _ from "lodash";
import { selectMessage, t } from "../../../../Languages/languages";
import { isValid } from "../../../../Validation/validation";
import { FuncConstructor } from "../functions/funcConstructor";
import axios from "../../../../axios"

/**
 * FieldsAutoDisplayer manages the auto field display
 */
export class FieldsAutoDisplayer extends FuncConstructor {
  /**
   * the change handler which is passed to the field to coll in the change
   * procedural of method is provided as comments in the method body
   * @param {Object} event the event of change in the field
   * @param {string} listenField the prop name in the state to set change handle on it
   * @param {Array} fillFields the fields that should filled on the change of target field
   * @param {string} url used in request send to get the data to display
   * @returns undefined update the fields of the  state
   */
  async changeHandler(event, listenField, url, fillFields) {
    const { main, others, fields, lanState, value } = this.#retrieveData(
      event,
      fillFields
    );

    let fieldsUpdate = _.cloneDeep(fields);

    if (value === "") {
      // empty the main field and other fielded
      fieldsUpdate = this.setMainField(main, "", fieldsUpdate);
      if (others) {
        fieldsUpdate = this.emptyOtherFields(others, fieldsUpdate, lanState);
      }
      fieldsUpdate[listenField].usedRecord = null;
      this.screen.setState({ fields: fieldsUpdate });
      return;
    }

    // prepare for a request

    // set loading ui until the response is fulfilled
    fieldsUpdate = this.setMainField(main, t("loading"), fields);

    // set the used record in filling the records as it's used in other places
    fieldsUpdate[listenField].usedRecord = "LOADING";

    this.screen.setState({ fields: fieldsUpdate });

    // send a request
    try {
      const res = await this.requestSender(value, listenField, fillFields, url);
      const { fieldsUpdate } = res;
      this.screen.setState({ fields: fieldsUpdate });
    } catch ({ fieldsUpdate }) {
      this.screen.setState({ fields: fieldsUpdate });
    }
  }

  requestSender(value, listenField, fillFields, url) {
    return new Promise((resolve, reject) => {
      let {
        state: { fields },
      } = this.screen;
      axios
        .get(`${url}/${value}`)
        .then((res) => {
          const { data: record } = res;
          // fill the fields main and others
          let fieldsUpdate = this.fillFields(record, fillFields, fields);
          fieldsUpdate[listenField].usedRecord = record;
          resolve({ fieldsUpdate });
        })
        .catch((err) => {
          let errorMess = "";
          if (err.response) {
            const {
              data: { message },
            } = err.response;
            errorMess = selectMessage(message);
          }
          // put the err message
          console.log(err);
          const fieldsUpdate = this.setMainField(
            fillFields.main,
            errorMess,
            fields
          );
          fieldsUpdate[listenField].usedRecord = null;
          reject({ fieldsUpdate });
        });
    });
  }

  #retrieveData(event, fillFields) {
    // structure the data
    const { main, others } = fillFields;
    let {
      state: { fields },
      props: { lanState },
    } = this.screen;
    const {
      target: { value },
    } = event;
    return { main, others, fields, lanState, value };
  }
  fillFields(record, fillFields, fields) {
    // set the fillFields that are provided form there record
    // decide the lanState to access the right prop names
    const {
      props: { lanState: lang_no },
    } = this.screen;
    let lanState = "d";
    let otherState = "f";
    if (parseInt(lang_no) === 2) {
      lanState = "f";
      otherState = "d";
    }

    let fieldClone = _.cloneDeep(fields);
    for (const key in fillFields) {
      const item = fillFields[key];
      if (key === "main") {
        const { stateProp, recordProp } = item[lanState];
        // other props names based on other state
        const { recordProp: recordPropO } = item[otherState];
        this.fill(fieldClone, stateProp, recordProp, record, recordPropO);
      } else {
        item.forEach((i) => {
          const { stateProp, recordProp } = i[lanState];
          const { recordProp: recordPropO } = i[otherState];
          this.fill(fieldClone, stateProp, recordProp, record, recordPropO);
        });
      }
    }

    return fieldClone;
  }

  fill(fields, stateProp, recordProp, record, recordPropO) {
    // not pure function
    if (fields[stateProp]) {
      if (record[recordProp]) {
        fields[stateProp].value = record[recordProp];
        fields[stateProp].autoFilledSuccess = true;
      }
      // if the f props is null we should display the f prop by using recordPropO
      else if (record[recordPropO]) {
        fields[stateProp].value = record[recordPropO];
        fields[stateProp].autoFilledSuccess = true;
      } else if (record[recordProp] === null) {
        fields[stateProp].value = "null";
        fields[stateProp].autoFilledSuccess = false;
      }
    }
    return fields;
  }

  setMainField(main, value, fields) {
    // helps us to set the value of main field of auto display fields
    // we use is in setting the "" and loading value
    const {
      props: { lanState: lang_no },
    } = this.screen;
    const fieldClone = _.cloneDeep(fields);
    let lanState = "d";
    if (parseInt(lang_no) === 2) {
      lanState = "f";
    }
    const { stateProp } = main[lanState];
    if (fieldClone[stateProp]) {
      fieldClone[stateProp].value = value;
      fieldClone[stateProp].autoFilledSuccess = false;
    }
    return fieldClone;
  }

  emptyOtherFields(otherFields, fields) {
    const {
      props: { lanState: lang_no },
    } = this.screen;
    const fieldsClone = _.cloneDeep(fields);
    let lanState = "d";
    if (parseInt(lang_no) === 2) {
      lanState = "f";
    }
    for (const key in otherFields) {
      const item = otherFields[key];
      const { stateProp } = item[lanState];
      if (fieldsClone[stateProp]) {
        fieldsClone[stateProp].value = "";
      }
    }
    return fieldsClone;
  }
}

/**
 * set the change handle to the target field
 * the params is declared in the changeHandler method
 */
export function autoDisplayModel(listenField, url, fillFields, fields) {
  // set change Handler
  console.log({ listenField, url, fillFields, fields });
  const fieldsClone = _.cloneDeep(fields);
  fieldsClone[listenField].changeHandler = (event) => {
    this.autoDisplayHandler.changeHandler(event, listenField, url, fillFields);
  };
  return fieldsClone;
}


// input change handler ******************************
export const handleInputChange = (thisK, state, identifier) => {
  const fieldsUpdate = _.cloneDeep(thisK.state.fields);
  if (!fieldsUpdate[identifier].readOnly) {
    fieldsUpdate[identifier].value = state.value;
  }
  if (fieldsUpdate[identifier].validity) {
    fieldsUpdate[identifier].validity.valid = state.valid;
    fieldsUpdate[identifier].validity.message = state.invalidFeedBack;
  }
  thisK.setState({ fields: fieldsUpdate });
};

// password confirmation
export const checkPassConfirm = (thisK, fields) => {
  const fieldsClone = _.cloneDeep(fields)
  fieldsClone.confirm_password.changeHandler = (event, field) => {
    const passValue = thisK.state.fields.password.value;
    const confirmValue = event.target.value;
    const fieldClone = { ...field };
    if (confirmValue.length >= passValue.length && passValue !== confirmValue) {
      fieldClone.valid = false;
      fieldClone.invalidFeedBack = t("pass_not_identical");
    } else {
      const [valid, message] = isValid(
        event.target.value,
        field.props.field.validation,
        thisK
      );
      fieldClone.valid = valid;
      fieldClone.invalidFeedBack = message;
    }
    field.setState(fieldClone);
    return "pass_confirm";
  };
  return fieldsClone;
};

// handle change field name to fit the record prop name
const renameObjKey = (obj, oldKey, newKey) => {
  const objClone = _.cloneDeep(obj);
  const objArr = [];
  for (const key in objClone) {
    const elementObj = {
      key,
      ...objClone[key],
    };
    objArr.push(elementObj);
  }
  objArr.forEach((ele, i) => {
    if (ele.key === oldKey) {
      ele.key = newKey;
    }
  });
  const newObj = {};
  objArr.forEach((ele) => {
    newObj[ele.key] = {
      ...ele,
    };
    delete newObj[ele.key].key;
  });
  return newObj;
};

// only on field should be active
export const onlyActiveField = (fields, firstField, secondField, mode) => {
  // pure function
  const fieldClone = _.cloneDeep(fields)
  const fieldOne = fieldClone[firstField];
  const fieldTwo = fieldClone[secondField];
  if (mode === "modify") {
    if (fieldOne.value.toString().length >= 1) {
      fieldClone[secondField].writability = false;
      fieldClone[secondField].value = "";
    } else {
      fieldClone[secondField].writability = true;
    }
    if (fieldTwo.value.toString().length >= 1) {
      fieldClone[firstField].writability = false;
      fieldClone[firstField].value = "";
    } else {
      fieldClone[firstField].writability = true;
    }
  }
  return fieldClone;
};

/**
 * - used to change the field prop name in the state fields when the language changed
 * - usually used in getDerivedStateFromProps
 * - you don't have explicit control on the produced prop names
 * @param {Object} props
 * @param {Object} fields
 * @param {string} startPropName the prop name in the state
 * @param {string} propFieldName the prop name with out d_ for f_ name
 * @param {*} gatheredFieldName
 * @param {string} extension the extension to be add to the produced prop name
 * @returns {Object} fieldsUpdate
 */
export function changeFieldPropNameAccordingToLanNo(
  props,
  fields,
  startPropName,
  propFieldName,
  gatheredFieldName,
  extension
) {
  let currentKey = null;
  let d_name = `${propFieldName}_d_name`;
  let f_name = `${propFieldName}_f_name`;
  // if the extension not d_name or f_name
  if (extension) {
    d_name = `${propFieldName}${extension.d}`;
    f_name = `${propFieldName}${extension.f}`;
  }
  if (fields[startPropName]) {
    currentKey = startPropName;
  } else if (fields[d_name]) {
    currentKey = d_name;
  } else if (fields[f_name]) {
    currentKey = f_name;
  }
  let newKey = f_name;
  if (parseInt(props.lanState) === 1) {
    newKey = d_name;
  }
  if (gatheredFieldName) {
    fields[gatheredFieldName].readOnlyField = newKey;
  }
  const fieldsUpdate = renameObjKey(fields, currentKey, newKey);
  return fieldsUpdate;
}
