import _ from "lodash";
import { dtlFuncConstructor } from "./dtlFuncConstructor";

// REMOVE HANDLERS ************************************************************************
export class DetailsRemover extends dtlFuncConstructor {

  removeHandler(index, e) {
    e.preventDefault();
    const {
      record,
      details: { current_tab, tabs },
    } = this.screen.state;
    const recordClone = _.cloneDeep(record);
    const row = recordClone[tabs[current_tab].recordDetailPropName][index];
    // saving the previous action to use later in the row at the record
    if (row.action) {
      row.prevAction = row.action;
    }
    // set the delete action to reflect later on the UI
    row.action = 'delete';
    return recordClone
  }
}

export class LimitDetailsRemover extends DetailsRemover {
  /// this class handles the removing of limited number of records
  constructor(screen, recordsNum) {
    super(screen);
    this.recordsNum = recordsNum;
  }

  limitRemover(index, e) {
    const {
      details: { current_tab },
      details,
    } = this.screen.state;

    const recordUpdate = this.removeHandler(index, e);
    let addState = details.tabs[current_tab].addState;
    if (!this.isExceedMaxRecordNum()) {
      // activate the add button
      addState = true;
    }
    return {addState, recordUpdate};
  }

  isExceedMaxRecordNum() {
    // check the number of records to enable or disabe the add button
    const {
      record,
      details: { current_tab, tabs },
    } = this.screen.state;
    // the details list in record
    const recordDtl = record[tabs[current_tab].recordDetailPropName];

    // get the records with no action: "delete"
    let notDeletedActionRecords = 0;
    for (const rec of recordDtl) {
      if (rec.action !== 'delete') ++notDeletedActionRecords;
    }
    if (notDeletedActionRecords <= this.recordsNum) return false;
    return true;
  }
}


export async function handleDtlRemoveModel(index, e) {
  const recordUpdate = this.dtlRemover.removeHandler(index, e);
  this.setState({record: recordUpdate});
}