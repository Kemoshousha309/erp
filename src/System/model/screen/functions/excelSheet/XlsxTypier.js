import _ from 'lodash';

export class XlsxTypier {
  constructor(recordPropNames, matchedSheet, columns) {
    this.recordPropNames = recordPropNames;
    this.matchedSheet = matchedSheet;
    this.columns = columns;
  }

  // all the values of excel sheet is string
  // the typier job is to convert each string to the nearest js type according to the columns information

  typeNumber(value) {
    if (value === '') return null;
    const numType = Number(value);
    if (numType || numType === 0) return numType;
    return value;
  }

  typeBool(value) {
    const numType = Number(value);
    if (numType || numType === 0) {
      // 1, 0
      if (numType === 0) return false;
      if (numType === 1) return true;
      return numType;
    }
    // true, false
    const lowStr = value.toLowerCase();
    if (lowStr === 'true') return true;
    if (lowStr === 'false') return false;
    return value;
  }

  type() {
    const { matchedSheet, columns } = this;
    const matchedSheetClone = _.cloneDeep(matchedSheet);
    matchedSheetClone.forEach((record) => {
      columns.forEach((property) => {
        switch (property.type) {
          case 'number':
            record[property.name] = this.typeNumber(record[property.name]);
            break;
          case 'boolean':
            record[property.name] = this.typeBool(record[property.name]);
            break;
          default:
            if (record[property.name] === '') {
              record[property.name] = null;
            }
            break;
        }
      });
    });
    this.typedSheet = matchedSheetClone;
    return this.typedSheet;
  }
}
