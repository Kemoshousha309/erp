import { isValid } from '../../../Validation/validation';
import axios from '../../../axios';
import { selectMessage, t } from '../../../Languages/languages';

// AUTO DISPLAY FUNCTIONS

// How auto Display work??
// the algorithm is based on the supply of props names in each record and state throw the fillFields object =>
// {
//     main: { // the main auto display field usually next to the listen field
//         d: { recordProp: "city_d_name", stateProp: "city_no_d_name" },
//         f: { recordProp: "city_f_name", stateProp: "city_no_f_name" },
//     },
//     others: [ // other fields that should auto display based on listen and main field
//         {
//             d: { recordProp: "province_no_d_name", stateProp: "province_no_d_name" },
//             f: { recordProp: "province_no_f_name", stateProp: "province_no_f_name" },
//         },
//         {
//             d: { recordProp: "province_no", stateProp: "province_no" },
//             f: { recordProp: "province_no", stateProp: "province_no" },
//         },
//         {
//             d: { recordProp: "country_no_d_name", stateProp: "country_no_d_name" },
//             f: { recordProp: "country_no_f_name", stateProp: "country_no_f_name" },
//         },
//         {
//             d: { recordProp: "country_no", stateProp: "country_no" },
//             f: { recordProp: "country_no", stateProp: "country_no" },
//         },
//     ]
// }

export const autoDisplay = (thisK, listenField, url, fillFields) => {
  // set onChange listener
  thisK.state.fields[listenField].changeHandler = (event) => {
    const { main, others } = fillFields;
    let {
      state: { fields },
      props: { lanState },
    } = thisK;
    const {
      target: { value },
    } = event;

    // set loading ui until the response is fulfilled
    fields = setMainField(
      main,
      t('loading'),
      fields,
      lanState,
    );
    fields[listenField].usedRecord = 'LOADING';
    thisK.setState({ fields });

    if (value !== '') {
      // if input value not "" we don't send a request
      axios
        .get(`${url}/${value}`)
        .then((res) => {
          const { data: record } = res;
          // fill the fields main and others
          fields[listenField].usedRecord = record;
          fillAutoDisplayFields(record, fillFields, fields, thisK, lanState);
        })
        .catch((err) => {
          let errorMess = '';
          if (err.response) {
            const {
              data: { message },
            } = err.response;
            errorMess = selectMessage(message);
          }
          // put the err message
          fields = setMainField(main, errorMess, fields, lanState);
          fields[listenField].usedRecord = null;
          thisK.setState({ fields });
        });
    } else {
      // empty the main field and other fielded
      fields = setMainField(main, '', fields, lanState);
      if (others) {
        fields = emptyOtherFields(others, fields, lanState);
      }
      fields[listenField].usedRecord = null;
      thisK.setState({ fields });
    }
  };
  thisK.setState({ fields: thisK.state.fields });
};

const setMainField = (main, value, fields, lang_no) => {
  // helps us to set the value of main field of auto display fields // we use is in setting the "" and loading value
  let lanState = 'd';
  if (parseInt(lang_no) === 2) {
    lanState = 'f';
  }
  const { stateProp } = main[lanState];
  if (fields[stateProp]) {
    fields[stateProp].value = value;
    fields[stateProp].autoFilledSuccess = false;
  }
  return fields;
};

const fill = (fields, stateProp, recordProp, record, recordPropO) => {
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
      fields[stateProp].value = 'null';
      fields[stateProp].autoFilledSuccess = false;
    }
  }
};

const fillAutoDisplayFields = (record, fillFields, fields, thisK, lang_no) => {
  // set the fillFields that are provided form there record
  let lanState = 'd';
  let otherState = 'f';
  if (parseInt(lang_no) === 2) {
    lanState = 'f';
    otherState = 'd';
  }
  for (const key in fillFields) {
    const item = fillFields[key];
    if (key === 'main') {
      const { stateProp, recordProp } = item[lanState];
      // other props names based on other state
      const { recordProp: recordPropO } = item[otherState];
      fill(fields, stateProp, recordProp, record, recordPropO);
    } else {
      item.forEach((i) => {
        const { stateProp, recordProp } = i[lanState];
        const { recordProp: recordPropO } = i[otherState];

        fill(fields, stateProp, recordProp, record, recordPropO);
      });
    }
  }
  thisK.setState({ fields });
};

const emptyOtherFields = (otherFields, fields, lang_no) => {
  let lanState = 'd';
  if (parseInt(lang_no) === 2) {
    lanState = 'f';
  }
  for (const key in otherFields) {
    const item = otherFields[key];
    const { stateProp } = item[lanState];
    if (fields[stateProp]) {
      fields[stateProp].value = '';
    }
  }
  return fields;
};

// password confirmation
export const checkPassConfirm = (thisK) => {
  thisK.state.fields.confirm_password.changeHandler = (event, field) => {
    const passValue = thisK.state.fields.password.value;
    const confirmValue = event.target.value;
    const fieldClone = { ...field };
    if (confirmValue.length >= passValue.length && passValue !== confirmValue) {
      fieldClone.valid = false;
      fieldClone.invalidFeedBack = t(
        'pass_not_identical',
      );
    } else {
      const [valid, message] = isValid(
        event.target.value,
        field.props.field.validation,
        thisK,
      );
      fieldClone.valid = valid;
      fieldClone.invalidFeedBack = message;
    }
    field.setState(fieldClone);
    return 'pass_confirm';
  };
};

// handle change field name to fit the record prop name
const renameObjKey = (obj, oldKey, newKey) => {
  const objArr = [];
  for (const key in obj) {
    const elementObj = {
      key,
      ...obj[key],
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
  const fieldOne = fields[firstField];
  const fieldTwo = fields[secondField];
  if (mode === 'modify') {
    if (fieldOne.value.toString().length >= 1) {
      fields[secondField].writability = false;
      fields[secondField].value = '';
    } else {
      fields[secondField].writability = true;
    }
    if (fieldTwo.value.toString().length >= 1) {
      fields[firstField].writability = false;
      fields[firstField].value = '';
    } else {
      fields[firstField].writability = true;
    }
  }
  return fields;
};

export const changePropName = (
  props,
  fields,
  startPropName,
  propFieldName,
  gatheredFieldName,
  extension,
) => {
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
};
