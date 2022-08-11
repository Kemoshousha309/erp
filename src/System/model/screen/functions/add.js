/**
 * @module add 
 */

import axios from "../../../../axios";
import { handleFields } from "../handlers/fields";
import { updateMode } from "../handlers/mode";
import { FuncConstructor } from "./funcConstructor";

// add handle ******************************

/**
 * Adder class is responsible for add process in the screen
 */

export class Adder extends FuncConstructor {

  /**
   * handle the local logic in add process 
    @returns {Object} the updated fields after being opened to be ready for adding
   */
  localHandle() {
    const { fields, specialFields} = this.screen.state;
    let fieldsUpdate = handleFields(fields, "open");
    if (specialFields) {
      specialFields.forEach((f) => {
        if (f.add) {
          const specific = [f.key];
          fieldsUpdate = handleFields(fieldsUpdate, f.add, true, specific);
        }
      });
    }
    return fieldsUpdate;
  }

  /**
   * handle the async request of pre add and auto increment
   * @param {Object} fieldsUpdate this is the fields updated from localHandle
   * @returns {Object} fieldsUpdate that contains: 
   * - preAdd data to set to the content
   * - fieldsUpdate 
   */
  asyncHandle(fieldsUpdate) {
    const { pks, preAdd } = this.screen.state;
    return new Promise((resolve, reject) => {
      const pkPropName = pks[0];
      if (fieldsUpdate[pkPropName].autoIncrement) {
        // apply auto increment primary key
        this.autoIncrementHandle(fieldsUpdate, pks)
          .then((fieldsUpdate) => resolve({ preData: null, fieldsUpdate }))
          .catch((err) => console.log(err));
      } else if (preAdd) {
        this.preHandler("Add", fieldsUpdate)
          .then(({ data, fieldsUpdate }) =>
            resolve({ preData: data, fieldsUpdate })
          )
          .catch((err) => console.log(err));
      }
    });
  }
 
  /**
   * handle the auto increment that present in some screens
   * @param {Object} fieldsUpdate 
   * @param {Array} pks 
   * @returns fieldsUpdate with auto increment value
   */
  autoIncrementHandle(fieldsUpdate, pks) {
    return new Promise((resolve, reject) => {
      const pkPropName = pks[0];
      axios
        .get(`${fieldsUpdate[pkPropName].autoIncrement}`)
        .then((res) => {
          fieldsUpdate[pkPropName].value = res.data.next_PK;
          resolve(fieldsUpdate);
        })
        .catch((err) => {
          console.log(err.response);
        });
    });
  }
}


/**
 * manage default update of the state in add process
 */
export async function handleAddModel() {
  const fieldsUpdate = this.addHandler.localHandle();
  const {tools} = updateMode("add", this.state, this.props)
    this.setState({ mode: "add", fields: fieldsUpdate, record: null, tools });
    const { preData, fieldsUpdate: changedFields } =
      await this.addHandler.asyncHandle(fieldsUpdate);
    this.setState((state) => {
      const preAdd = state.preAdd;
      if (!preAdd) return { mode: "add", fields: changedFields, record: null };
      preAdd.content = preData;
      return { mode: "add", fields: changedFields, record: null, preAdd, tools };
    });
}
