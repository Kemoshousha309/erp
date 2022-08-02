/**
 * @module modify
 */

import { handleFields } from "../fields";
import { updateMode } from "../mode";
import { FuncConstructor } from "./funcConstructor";

// modify handle *******************************

/**
 * Modifier manages the modify process in the screen
 */
export class Modifier extends FuncConstructor {
  /**
   * handle the local behavior of the modify process
   * @returns {Object} fieldsUpdate 
   */
  localHandle() {
    const { fields, pks, specialFields } = this.screen.state;
    // handle modify fields
    let fieldsUpdate = handleFields(fields, "open", false);
    fieldsUpdate = handleFields(fieldsUpdate, "close", false, pks);
    if (specialFields) {
      specialFields.forEach((f) => {
        if (f.modify) {
          const specific = [f.key];
          fieldsUpdate = handleFields(fieldsUpdate, f.modify, false, specific);
        }
      });
    }
    return fieldsUpdate;
  }

  /**
   * handle the async behavior of the modify process
   * @param {Object} fieldsUpdate the updated fields from local handle
   * @returns {Object} object contains:
   * - preModify data to be put to the pre modify content
   * - fields update
   */
  asyncHandle(fieldsUpdate) {
    const { preModify } = this.screen.state;
    if (!preModify) return null;
    return new Promise((resolve, reject) => {
      this.preHandler("Modify", fieldsUpdate)
        .then(({ data, fieldsUpdate }) =>
          resolve({ preData: data, fieldsUpdate })
        )
        .catch((err) => console.log(err));
    });
  }
}


/** manages the modify model behavior */
export async function handleModifyModel() {
  const fieldsUpdate = this.modifyHandler.localHandle();
  const {tools} = updateMode("modify", this.state, this.props)
  this.setState({ mode: "modify", fields: fieldsUpdate, tools });
  const res = await this.modifyHandler.asyncHandle(fieldsUpdate);
  if (!res) return;
  const { preData, fieldsUpdate: changedFields } = res;
  this.setState((state) => {
    const preModify = state.preModify;
    preModify.content = preData;
    return { mode: "modify", fields: changedFields, preModify, tools };
  });
}
