/**
 * @module list
 */

import _ from "lodash";
import { getDetails } from "../Details/requestDetails";
import { fillRecord, handleFields } from "../fields";
import { updateMode } from "../mode";
import { FuncConstructor } from "./funcConstructor";


/**
 * List manages the primary list behavior 
 */
export class List extends FuncConstructor {
  open() {
    const currentMode = this.screen.state.mode;
    const listShow = true;
    const mode = "list";
    return { currentMode, listShow, mode };
  }

  close() {
    const listShow = !this.screen.state.listShow;
    /**get the prev mode to update the current mode */
    const prevMode = this.screen.state.prevMode;
    return { listShow, prevMode };
  }

  recordClick(record) {
    const { fields } = this.screen.state;
    let fieldsUpdate = fillRecord(fields, record);
    fieldsUpdate = handleFields(fieldsUpdate, "close", false);
    this.#checkNullName(record, fieldsUpdate);
    return fieldsUpdate;
  }

  #checkNullName(record, fieldsUpdate) {
    const { fks } = this.screen.state;
    if (fks) {
      fks.forEach((fk) => {
        const fkField = fieldsUpdate[fk];
        if (fkField.readOnlyField) {
          if (!record[fkField.readOnlyField]) {
            const propertyName = `${extractName(fkField.readOnlyField)}_d_name`;
            if (record[propertyName] === null) {
              fieldsUpdate[fkField.readOnlyField].value = "";
            } else {
              fieldsUpdate[fkField.readOnlyField].value = record[propertyName];
            }
          }
        }
      });
    }
    return fieldsUpdate;
  }
}

/**
 * remove the d_name or f_name string from the property name
 * @param {string} propName the property name 
 * @returns {string}
 */
export function extractName(propName) {
  let newName = propName.replace("_d_name", "");
  newName = newName.replace("_f_name", "");
  return newName;
};

/**
 * manages the primary list record click behavior
 * @param {Object} record received from primary list 
 * @param {Number} i the index of the record used in moves and many other places
 */
export async function handleRecordClickModel(record, i) {
  const fields = this.listHandler.recordClick(record);
  const { tools } = updateMode("d_record", this.state, this.props);
  const { details } = this.state;
  if (details) {
    this.setState({
      listShow: false,
      mode: "d_record",
      recordIndex: i,
      record,
      fields,
      tools,
      details: { ...this.state.details, loading: true },
    });
    const recordWithDtl = await getDetails(record, this);
    return this.setState({
      record: recordWithDtl,
      details: { ...this.state.details, loading: false },
    });
  }
  this.setState({
    listShow: false,
    mode: "d_record",
    recordIndex: i,
    record,
    fields,
    tools,
  });
}

/**
 * the model that manages the clearness of all lists
 */
export function handleClearListsModel() {
  const {
    prevMode,
    mode,
    listShow,
    details: { current_tab },
    details
  } = this.state;
  const { tools } = updateMode(prevMode || mode, this.state, this.props);
  if (listShow) {
    return this.setState({ listShow: false, mode: prevMode || mode, tools });
  }
  const dtlClone = _.cloneDeep(details); 
  dtlClone.tabs[current_tab].activeForeignList = null;
  this.setState({
    fkListShow: null,
    addDtlForeignList: null,
    customizedList: { open: false, render: null },
    ShortCutsList: false,
    details: dtlClone
  });
}

/**
 * check if there is any list render or not
 * @param {Object} screen current render screen
 * @returns {boolean}
 */
export function checkActiveList(screen) {
  const {
    state: {
      details: { current_tab, tabs },
      fkListShow,
      listShow,
      ShortCutsList,
      addDtlForeignList,
      customizedList: { open: customizedListActive },
    },
  } = screen;
  const activeForeignList = tabs[current_tab].activeForeignList;
  const lists = [
    fkListShow,
    listShow,
    ShortCutsList,
    addDtlForeignList,
    customizedListActive,
    activeForeignList,
  ];
  return lists.reduce((previousValue, currentValue) => {
    return previousValue || currentValue;
  }, false);
}
