import { formatDate } from "../date";

export const fields = (fields, mode, empty = true, specific) => {
  if (specific) {
    for (const field in fields) {
      if (empty && !fields[field].controlField) {
        if (fields[field].type === "checkbox") {
          fields[field].value = false;
        } else {
          fields[field].value = "";
        }
      }
    }
    specific.forEach((fName) => {
      if (mode === "open") {
        fields[fName].writability = true;
      } else {
        fields[fName].writability = false;
      }
    });
  } else {
    for (const field in fields) {
      if (!fields[field].readOnly && fields[field].validity) {
        fields[field].validity.valid = true;
        fields[field].validity.message = null;
      }
      if (!fields[field].controlField) {
        if (empty) {
          if (fields[field].type === "checkbox") {
            fields[field].value = false;
          } else {
            fields[field].value = "";
          }
        }
        if (mode === "open") {
          if (fields[field].readOnly) {
            fields[field].writability = false;
          } else {
            fields[field].writability = true;
          }
        } else if (mode === "close") {
          fields[field].writability = false;
        }
      }
    }
  }
  return fields;
};

export const fillRecord = (fields, record) => {
  if (record) {
    if (Object.keys(record).length > 0) {
      for (let i in fields) {
        if (record[i] !== undefined) {
          if (record[i] === null) {
            fields[i].value = "";
          } else {
            if (fields[i].type === "dateFormat") {
              fields[i].value = formatDate(record[i], 12);
            } else {
              fields[i].value = record[i];
            }
          }
        } else if (record[i] === false) {
          fields[i].value = false;
        }
      }
    }
  }
  return fields;
};

export const extractRcordData = (fields, targetRecord) => {
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
    pkUrl = pkUrl + `/${record[p]}`;
  });
  return pkUrl;
};

export const setReadOnlyFields = (fieldnames, fields) => {
  const fieldsClone = JSON.parse(JSON.stringify(fields))
  fieldnames.forEach((i) => {
    fieldsClone[i].writability = false;
  });
  return fieldsClone;
};

export const setDefaultValues = (fields, defaultValues) => {
  const fieldsClone = JSON.parse(JSON.stringify(fields))
  Object.keys(defaultValues).forEach(key => {
    fieldsClone[key].value = defaultValues[key]
  })  
  return fieldsClone
};

export function fieldListner(fieldName, handler) {
  const { fields } = this.state;
  // handle Args => event or value in case of checkbox, field this keyword, screen this keyword
  fields[fieldName].changeHandler = (e, fieldThisK) =>
    handler(e, fieldThisK, this);
}
