import axios from "../../../../axios";
import { setDefaultValues, setReadOnlyFields } from "../fields";

/**
 * This class contain the sharable data 
 * and methods from all function classes
 */

export class FuncConstructor {
  constructor(screen) {
    this.screen = screen;
  }

  // sharable methods

  /**
   * To handle the pre add or modify behavoir
   * @param {string} type to decide add or modify url  
   * @param {object} fields refrence to state fields 
   * @returns {preActionContent, fieldsUpdate} 
   */
  preHanler(type, fields) {
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
