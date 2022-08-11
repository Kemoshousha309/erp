import axios from "../../../../axios";
import { setDefaultValues, setReadOnlyFields } from "../handlers/fields";

/**
 * FuncConstructor contains the sharable data and 
 * methods from all function classes
 */

export class FuncConstructor {
  constructor(screen) {
    this.screen = screen;
  }

  /**
   * To handle the pre add or modify behavior
   * @param {string} type to decide add or modify url the  type => Modify | Add
   * @param {Object} fields reference to state fields 
   * @returns {Object} Object contains :
   *  preActionContent to be set in the state
   *  fieldsUpdate 
   */
  preHandler(type, fields) {
    // type => Modify | Add
    const pre = `pre${type}`;
    let {
      urls: { [pre]: preUrl },
    } = this.screen.state;

    return new Promise((resolve, reject) => {
      axios
        .get(preUrl)
        .then((res) => {
          const {data} = res;
          // set default values ... (would be added later)
          let fieldsUpdate = setDefaultValues(fields, data.default_values);
          
          // set readOnly fields
          if (data.read_only.length > 0) {
            fieldsUpdate = setReadOnlyFields(data.read_only, fieldsUpdate);
          }
          resolve({data, fieldsUpdate})
        })
        .catch((err) => console.log(err));
    });
  }
}
