/**
 * @module privInputs 
 */

import _ from "lodash";
import { FuncConstructor } from "../../../../ScreenConstructor/screen/functions/funcConstructor";

/**
 * PrivInputHandler is responsible for handle input changes and control inputs (row, column)
 */
export class PrivInputsHandler extends FuncConstructor {
  /**
   * handle the row or column or all inputs change
   * @param {Object} e event
   * @param {string} type COLUMN | ROW | ALL
   * @param {string} identifier 
   * @returns {Object} input privs update
   */
  handleControlInputChange(e, type, identifier) {
    const value = e.target.checked;
    const {
      state: {
        input_privs,
        content: { header },
      },
    } = this.screen;
    const controls = [];
    header.forEach((i) =>
      typeof i === "object" ? controls.push(i.control) : null
    );
    switch (type) {
      case "COLUMN": return this.columnControl(input_privs, identifier, value);
      case "ROW": return this.rowControl(controls, input_privs, identifier, value);
      case "ALL": return this.allControl(input_privs, controls, value);
      default:
        break;
    }
    // this.setState({ input_privs: inputPrivsUpdate });
  }

  columnControl(input_privs, identifier, value) {
    const inputPrivsUpdate = _.cloneDeep(input_privs)
    Object.keys(inputPrivsUpdate).forEach((i) => {
      const item = inputPrivsUpdate[i];
      if (
        item.can_change_add_priv &&
        item.can_change_view_priv &&
        !item.admin_group
      ) {
        item[identifier] = value;
        item.edited = true;
      }
    });
    return inputPrivsUpdate;
  }

  rowControl(controls, input_privs, identifier, value) {
    const inputPrivsUpdate = _.cloneDeep(input_privs)
    controls.forEach((i) => {
      if (
        inputPrivsUpdate[identifier].can_change_add_priv &&
        inputPrivsUpdate[identifier].can_change_view_priv &&
        !inputPrivsUpdate[identifier].admin_group
      ) {
        inputPrivsUpdate[identifier][i] = value;
        inputPrivsUpdate[identifier].edited = true;
      }
    });
    return inputPrivsUpdate
  }
  allControl(input_privs, controls, value) {
    const inputPrivsUpdate = _.cloneDeep(input_privs)
    Object.keys(inputPrivsUpdate).forEach((i) => {
      const item = inputPrivsUpdate[i];
      if (
        item.can_change_add_priv &&
        item.can_change_view_priv &&
        !item.admin_group
      ) {
        controls.forEach((i) => {
          item[i] = value;
          item.edited = true;
        });
      }
    });
    return inputPrivsUpdate;
  }

  /**
   * handle the privs table inputs change
   * @param {Object} e event
   * @param {Object} record that is changed
   * @returns {Object} inputPrivsUpdate
   */
  inputChangeHandler(e, record) {
    const value = e.target.checked;
    const id = e.target.id;
    const {
      state: { input_privs, identifiers: pks },
    } = this;
    const inputPrivsUpdate = _.cloneDeep(input_privs)
    Object.keys(inputPrivsUpdate).forEach((i) => {
      const item = inputPrivsUpdate[i];
      if (item[pks[0]] === record[pks[0]] && item[pks[1]] === record[pks[1]]) {
        item[id] = value;
        item.edited = true;
      }
    });
    return inputPrivsUpdate;
  }
}