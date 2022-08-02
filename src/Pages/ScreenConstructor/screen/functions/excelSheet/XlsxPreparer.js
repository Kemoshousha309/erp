import { XlsxMatcher } from './XlsxMatcher';
import { XlsxTypier } from './XlsxTypier';

export class XlsxPreparer {
  constructor(recordPropNames, data) {
    this.recordPropNames = recordPropNames;
    this.data = data;
  }

  prepareRawSheet() {
    const { recordPropNames, data } = this;
    const matcher = new XlsxMatcher(recordPropNames, data);
    this.rawSheet = matcher.match();
    return this.rawSheet;
  }

  // under development ..
  prepareTypedSheet() {
    const { recordPropNames, columns, rawSheet } = this;
    const typier = new XlsxTypier(recordPropNames, rawSheet, columns);
    this.typedSheet = typier.type();
    return this.typedSheet;
  }
}
