/**
 * @module undo
 */

import _ from "lodash";
import { handleFields } from "../handlers/fields";
import { updateMode } from "../handlers/mode";
import { getDetailsPropanes } from "../handlers/utilities";
import { FuncConstructor } from "./funcConstructor";

// undo handle ******************************

/**
 * UndoHandler Manages the normal undo behaviors
 */
export class UndoHandler extends FuncConstructor {
  /**
   * manages the undo behavior
   * @returns {Object} contains:
   * - mode update
   * - record update
   * - fields update
   */
  handleUndo = () => {
    const { fields, mode, record } = this.screen.state;
    let fieldsUpdate = null;
    switch (mode) {
      case "modify":
        fieldsUpdate = handleFields(fields, "close", false);
        return { fieldsUpdate, mode: "d_record", record };
      case "copy":
        fieldsUpdate = handleFields(fields, "close", false);
        return { fieldsUpdate, mode: "d_record", record };
      default:
        // undo to start mode
        fieldsUpdate = handleFields(fields, "close");
        return { fieldsUpdate, mode: "start", record: null };
    }
  };
}

/**
 * DetailsUndoHandler manages details undo behaviors
 */
export class DetailsUndoHandler extends UndoHandler {
  /**
   * go through all the details row and check: 
   * - if this row is added in front end => remove it
   * - if one of its values changed return it to the server value
   * @returns {Object} record update
   */
  handleDtlRecordUndo() {
    const {
      record,
      details: { tabs },
    } = this.screen.state;
    const recordClone = _.cloneDeep(record);
    const properties = getDetailsPropanes(tabs);
    properties.forEach((prop) => {
      if (prop && recordClone) {
        const pages = recordClone[prop];
        let index = 0;
        if (pages) {
          while (index < pages.length) {
            const row = pages[index];
            if (row.frontRow) {
              pages.splice(index, 1);
            } else {
              if (row.serverValue) {
                row.value = row.serverValue;
              }
              delete row.action;
              delete row.serverValue;
              index++;
            }
          }
        }
      }
    });
    return recordClone;
  }
}


/**
 * decide to use normal undo or dtl undo model
 * @returns undefined
 */
export async function handleUndoModel() {
  const { details } = this.state;
  if (!details) return handleNormalUndoModel.call(this);
  handleDtlUndoModel.call(this);
}


/**
 * - get the fieldsUpdate, mode and record 
 * - update the state and remover the content of pre content
 * @returns undefined
 */
export async function handleNormalUndoModel() {
  const {
    state: { preAdd, preModify },
  } = this;
  const { fieldsUpdate, mode, record } = this.undoHandler.handleUndo();
  const { tools } = updateMode(mode, this.state, this.props);
  if (!preAdd || !preModify)
    return this.setState({ fields: fieldsUpdate, mode, record, tools });
  this.setState({
    fields: fieldsUpdate,
    mode,
    record,
    preAdd: { ...preAdd, content: null },
    preModify: { ...preModify, content: null },
    tools,
  });
}

/** manages the model of details undo behavior 
 * - get the fieldsUpdate, mode (normal handle)
 * - get the updated record from handleDtlRecordUndo (details handle)
 * - update the state and remove the content of pre content if present
 * @returns undefined (model => updating the state)
 */
export async function handleDtlUndoModel() {
  const {
    state: { preAdd, preModify },
  } = this;
  const recordUpdate = this.dtlUndoHandler.handleDtlRecordUndo();
  const { fieldsUpdate, mode, record } = this.undoHandler.handleUndo();
  const { tools } = updateMode(mode, this.state, this.props);
  const finalRecordUpdate = !record ? record : recordUpdate
  if (!preAdd || !preModify)
    return this.setState({
      fields: fieldsUpdate,
      mode,
      record: finalRecordUpdate,
      tools,
    });
  this.setState({
    fields: fieldsUpdate,
    mode,
    record: finalRecordUpdate,
    preAdd: { ...preAdd, content: null },
    preModify: { ...preModify, content: null },
    tools,
  });
}
