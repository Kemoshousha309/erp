import _ from "lodash";
import { FuncConstructor } from "./funcConstructor";

/**
 * FkList manages the foreign key list behavior
 */
export class FkList extends FuncConstructor {
  /**
   * manages the foreign key list record click behavior
   * @param {Object} record the record received from user click
   * @returns {Object} fieldsUpdate
   */
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
