export class XlsxMatcher {
  constructor(recordPropNames, data) {
    this.recordPropNames = recordPropNames;
    this.data = data;
  }

  match() {
    const { recordPropNames, data } = this;
    const rawSheet = []; // to store the raw copy of the sheet
    data.forEach((row) => {
      const rawObj = {};
      for (let i = 0; i < recordPropNames.length; i++) {
        const propName = recordPropNames[i];
        const rowPropValue = Object.values(row)[i];
        rawObj[propName] = rowPropValue;
      }
      rawSheet.push(rawObj);
    });
    this.rawSheet = rawSheet;
    return this.rawSheet;
  }
}
