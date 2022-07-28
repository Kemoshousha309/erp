import _ from "lodash";
import { FuncConstructor } from "./funcConstructor";


export class FkList extends FuncConstructor {
  recordClick(record) {
    const {
      state: { fields, fkListShow },
    } = this.screen;
    const fieldsClone = _.cloneDeep(fields);
    const { fillFields } = fields[fkListShow];
  
    document.getElementById(fkListShow).focus();
    if (fillFields) {
      fillFields.forEach((i) => {
        if (fieldsClone[i.stateName]) {
          fieldsClone[i.stateName].value = record[i.recordName];
          fieldsClone[i.stateName].autoFilledSuccess = true;
          if (fieldsClone[i.stateName].validity) {
            fieldsClone[i.stateName].validity.valid = true;
            fieldsClone[i.stateName].validity.message = null;
          }
        }
      });
    }
    return fieldsClone;
  }
}
