import {XlsxMatcher} from "./XlsxMatcher";
import { XlsxTyper } from "./XlsxTyper";

export class XlsxPreparer {
  constructor(recordPropNames, data) {
    this.recordPropNames = recordPropNames;
    this.data = data;
  }

  prepareRawSheet() {
    const {recordPropNames, data} = this;
    const matcher = new XlsxMatcher(recordPropNames, data);
    this.rawSheet = matcher.match();
    return this.rawSheet;
  }


  // under development ..
  prepareTypedSheet() {
    const {recordPropNames, columns, rawSheet} = this;
    const typer = new XlsxTyper(recordPropNames, rawSheet, columns);
    this.typedSheet = typer.type();
    return this.typedSheet
  }

}