import _ from "lodash";
import { formatDate } from "../../../../Helpers/date";

export const handleFields = (fields, mode, empty = true, specific) => {
  const fieldsClone = _.cloneDeep(fields);
  if (specific) {
    for (const field in fieldsClone) {
      if (empty && !fieldsClone[field].controlField) {
        switch (fieldsClone[field].fieldType) {
          case "checkbox":
            fieldsClone[field].value = false;
            break;
          case "chips":
            fieldsClone[field].value = [];
            break;
          default:
            fieldsClone[field].value = "";
            break;
        }
      }
    }
    specific.forEach((fName) => {
      if (mode === "open") {
        fieldsClone[fName].writability = true;
      } else {
        fieldsClone[fName].writability = false;
      }
    });
  } else {
    for (const field in fieldsClone) {
      if (!fieldsClone[field].readOnly && fieldsClone[field].validity) {
        fieldsClone[field].validity.valid = true;
        fieldsClone[field].validity.message = null;
      }
      if (!fieldsClone[field].controlField) {
        if (empty) {
          switch (fieldsClone[field].fieldType) {
            case "checkbox":
              fieldsClone[field].value = false;
              break;
            case "chips":
              fieldsClone[field].value = [];
              break;
            default:
              fieldsClone[field].value = "";
              break;
          }
        }
        if (mode === "open") {
          if (fieldsClone[field].readOnly) {
            fieldsClone[field].writability = false;
          } else {
            fieldsClone[field].writability = true;
          }
        } else if (mode === "close") {
          fieldsClone[field].writability = false;
        }
      }
    }
  }
  return fieldsClone;
};

export const fillRecord = (fields, record) => {
  const fieldsClone = _.cloneDeep(fields);
  if (record) {
    if (Object.keys(record).length > 0) {
      for (const i in fieldsClone) {
        if (record[i] !== undefined) {
          if (record[i] === null) {
            fieldsClone[i].value = "";
          } else if (fieldsClone[i].type === "dateFormat") {
            fieldsClone[i].value = formatDate(record[i], 12);
          } else {
            fieldsClone[i].value = record[i];
          }
        } else if (record[i] === false) {
          fieldsClone[i].value = false;
        }
      }
    }
  }
  return fieldsClone;
};

export const extractRecordData = (fields, targetRecord) => {
  const recordData = {};
  fields.forEach((f) => {
    recordData[f] = targetRecord[f];
  });
  return recordData;
};

export const getValues = (fields) => {
  const values = {};
  for (const key in fields) {
    values[key] = fields[key].value;
  }
  return values;
};

export const getHeaders = (thisK) => {
  const headers = {};
  if (thisK.state.specialFields) {
    thisK.state.specialFields.forEach((f) => {
      if (f.header && thisK.state.fields[f.key].value !== "") {
        headers[f.headerName] = thisK.state.fields[f.key].value;
      }
    });
  }
  return headers;
};

export const getPk = (fields) => {
  for (const key in fields) {
    if (fields[key].pk) {
      return key;
    }
  }
};

export const getPkUrl = (pks, record) => {
  let pkUrl = "";
  pks.forEach((p) => {
    pkUrl += `/${record[p]}`;
  });
  return pkUrl;
};

export const setReadOnlyFields = (fieldNames, fields) => {
  const fieldsClone = _.cloneDeep(fields);
  fieldNames.forEach((i) => {
    fieldsClone[i].writability = false;
  });
  return fieldsClone;
};

export const setDefaultValues = (fields, defaultValues) => {
  const fieldsClone = _.cloneDeep(fields);
  Object.keys(defaultValues).forEach((key) => {
    fieldsClone[key].value = defaultValues[key];
  });
  return fieldsClone;
};

export function fieldListener(fieldName, handler) {
  const { fields } = this.state;
  // handle Args => event or value in case of checkbox, field this keyword, screen this keyword
  fields[fieldName].changeHandler = (e, fieldThisK) =>
    handler(e, fieldThisK, this);
}
