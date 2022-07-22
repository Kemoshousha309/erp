export class XlsxValidator {
  constructor(sheetColumnsNum) {
    this.sheetColumnsNum = sheetColumnsNum;
    this.result = {};
  }

  checkNumber() {
    // check columns number
    let {
      sheetColumnsNum, columns, errMessages, result,
    } = this;
    let valid = true;
    if (sheetColumnsNum < columns.length) {
      valid = false;
      errMessages = [];
      errMessages.push('The columns number is less than the required');
      result.columnsNum = { valid, errMessages };
      return { valid, errMessages };
    }
    result.columnsNum = { valid: true, errMessages: null };
    return true;
  }

  checkValidity(typedSheet) {
    // raw sheet is prepared but not typed
    const { columns, result } = this;
    let valid = true;
    // check mandatory and type
    const validationErrors = {};
    typedSheet.forEach((row, index) => {
      columns.forEach((field) => {
        let errorObj;
        const value = row[field.name];
        // chekc mandatory
        if (field.mandatory && (value === undefined || value === null)) {
          valid = false;
          errorObj = {
            mess: `the ${field.name} in row number ${index} is required`,
            index,
            fieldName: field.name,
          };
          // check type
        } else if (
          !field.mandatory
          && (value === undefined || value === null)
        ) {
        } // do nothing
        else if (typeof value !== field.type && value !== null) {
          valid = false;
          errorObj = {
            mess: `the ${
              field.name
            } in row number ${index} has type error, entered ${typeof row[
              field.name
            ]} and required ${field.type}`,
            index,
            fieldName: field.name,
          };
        }
        if (errorObj) {
          if (validationErrors[field.name]) {
            validationErrors[field.name].push(errorObj);
          } else {
            validationErrors[field.name] = [];
            validationErrors[field.name].push(errorObj);
          }
        }
      });
    });
    result.validity = { valid, validationErrors };
    result.validity.errMessages = this.prepareErrorMess(validationErrors);
    return result.validity;
  }

  prepareErrorMess(validationErrors) {
    const errorMessages = [];
    for (const columnName in validationErrors) {
      const arr = [];
      validationErrors[columnName].forEach((errorObj) => {
        arr.push(errorObj.mess);
      });
      errorMessages.push(arr);
    }
    return errorMessages;
  }
}
