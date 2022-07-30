import _ from "lodash";
import { t } from "../Languages/languages";
import { getDtailsPropnams } from "../Pages/ScreenConstructor/screen/utilities";

export const setValidity = (fields) => {
  const fieldsClone = { ...fields };
  let validState = true;
  for (const key in fieldsClone) {
    if (!fieldsClone[key].readOnly) {
      const [valid, message] = isValid(
        fieldsClone[key].value,
        fieldsClone[key].validation
      );
      fieldsClone[key].validity.valid = valid;
      if (message === "max_length") {
        fieldsClone[key].value = "";
      }
      fieldsClone[key].validity.message = message;
      validState = fieldsClone[key].validity.valid && validState;
    }
  }
  return [fieldsClone, validState];
};

export const isValid = (value, rule, thisK) => {
  let message = null;
  let isValid = true;
  if (rule) {
    if (rule.requiered) {
      if (value !== undefined) {
        isValid = value.toString().trim() !== "" && isValid;
      }
      if (!isValid && !message) {
        message = t("required_field");
      }
    }
    if (rule.size && value !== "") {
      isValid = parseInt(value) <= parseInt(rule.size) && isValid;
      if (!isValid && !message) {
        message = t("max_size");
      }
    }
    if (rule.length) {
      isValid = parseInt(value.length) <= parseInt(rule.length) && isValid;
      if (!isValid && !message) {
        message = t("max_length");
      }
    }
    if (rule.int) {
      isValid = Number.isInteger(Number(value)) && isValid;
      if (!isValid && !message) {
        message = t("must_integer");
      }
    }
    if (rule.point6Format) {
      isValid = point6Format(value) && isValid;
      if (!isValid && !message) {
        message = t("not_accept_intput");
      }
    }
  }
  return [isValid, message];
};

export const deepClone = (l) => {
  const list = [];
  l.forEach((i) => {
    list.push({ ...i });
  });
  return list;
};

export const checkValidity = (screen) => {
  const {
    state: { fields },
  } = screen;
  const fieldsClone = _.cloneDeep(fields);
  let isValid = true;
  for (const key in fieldsClone) {
    const f = fieldsClone[key];
    if (!f.readOnly && f.writability && f.validity && f.validation) {
      if (f.value.length === 0 && f.validation.requiered) {
        f.validity.valid = false;
        f.validity.message = t("required_field");
      }
      if (key === "confirm_password") {
        const passValue = fieldsClone.password.value;
        const confimValue = fieldsClone.confirm_password.value;
        if (passValue !== confimValue) {
          f.validity.valid = false;
          f.validity.message = t("pass_not_identical");
        }
      }
      isValid = f.validity.valid && isValid;
    }
  }
  return [isValid, fieldsClone];
};

export const detialFieldValidity = (page, id) => {
  let valid = true;
  let message = null;
  if (page[`${id}#validity`]) {
    valid = page[`${id}#validity`].valid;
    message = page[`${id}#validity`].message;
  }
  return [valid, message];
};

export function checkDetailsValidity() {
  const {
    record,
    details: { tabs },
  } = this.state;
  const recordClone = _.cloneDeep(record);
  const properties = getDtailsPropnams(tabs, true);
  let detailsValid = true;
  if (recordClone) {
    properties.forEach((prop) => {
      if (prop) {
        const pages = recordClone[prop.recordDetailPropName];
        const { headers } = prop;
        if (pages) {
          pages.forEach((page) => {
            if (page.action !== "delete") {
              Object.values(headers).forEach((header) => {
                if (header.validationRules) {
                  const [valid, message] = isValid(
                    page[header.propName],
                    header.validationRules,
                    this
                  );
                  detailsValid = valid && detailsValid;
                  page[`${header.propName}#validity`] = {
                    valid,
                    message,
                  };
                }
              });
            }
          });
        }
      }
    });
  }
  return [detailsValid, recordClone];
}

function point6Format(str) {
  if (str.includes(".")) {
    const arr = str.split(".");
    if (arr.length > 2) {
      return false;
    }
    let valid = true;
    arr.forEach((side) => {
      valid = side.length <= 6 && valid;
    });
    return valid;
  }
  if (str.length <= 6) {
    return true;
  }
  return false;
}
