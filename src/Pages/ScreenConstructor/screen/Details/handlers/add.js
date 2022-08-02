import _ from "lodash";
import { dtlFuncConstructor } from "./dtlFuncConstructor";

// DETAILS ADD HANDLERS **********************************************************
export class DetailsAdder extends dtlFuncConstructor {
  // this class is responsible for the default add process of details

  // ADD HANDLERS
  addHandler(e) {
    // this is a default details add handler which decide the way to handle add base on the
    // details type  PRIMARY OR FOREIGN
    switch (this.screen.state.details.type) {
      case 'PRIMARY':
        this.primaryAddHandler(e);
        break;
      case 'FOREIGN':
        this.foreignAddHandler(e);
        break;
      default:
        break;
    }
  }


  primaryAddHandler(e) {
    // Add rows to details from the same screen

    // prevent the default behavior of the form
    e.preventDefault();

    // destructure of the used date
    let {
      record,
      details: { current_tab, tabs },
    } = this.screen.state;

    // prepare the skelton of the row
    const row = {
      action: 'add',
      frontRow: true,
    };

    // add the properties of the details to the row object
    Object.values(tabs[current_tab].headers).forEach((i) => {
      let propName;
      typeof i === 'object' ? (propName = i.propName) : (propName = i);
      if (i.hasOwnProperty('defaultValue')) row[propName] = i.defaultValue;
      else row[propName] = '';
    });

    let recordClone = _.cloneDeep(record);
    // add the record to the state
    if (!recordClone) { // if there is no record
      recordClone = {};
      recordClone[tabs[current_tab].recordDetailPropName] = [row];
    } else if (!recordClone[tabs[current_tab].recordDetailPropName]) {
      // if there is record but with no details
      recordClone[tabs[current_tab].recordDetailPropName] = [row];
    } else {
      // if there is a record with details add our row at the top off the details list
      recordClone[tabs[current_tab].recordDetailPropName].unshift(row);
    }
    // move the scroll bar to the top (UI EFFECT)
    document.getElementById('detailsTableContainer').scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    // update the record in the state
    return recordClone
  }
}

// Other special add handlers
export class LimitAdder extends DetailsAdder {
  constructor(screen) {
    super(screen);
    this.recordsNum = screen.state.details.tabs.bnk_dtl_list.recordsNum;
  }

  limitAddHandler(e) {
    // destructure date
    const {
      details,
      details: { current_tab },
      record
    } = this.screen.state;

    let addState = details.tabs[current_tab].addState;
    let recordUpdate = _.cloneDeep(record)
    // update the add button state
    if (this.isExceedMaxRecordNum()) {
      addState = false;
    }else {
      // this will add a details row in the record in state which will reflect on the UI
      recordUpdate = this.primaryAddHandler(e);
    }
    return {addState, recordUpdate}
  }

  isExceedMaxRecordNum() {
    // check the number of records to enable or disable the add button
    const {
      record,
      details: { current_tab, tabs },
    } = this.screen.state;

    // when the record is null this means that no adds to the record until now
    if (!record) return false;

    // the details list in record
    const recordDtl = record[tabs[current_tab].recordDetailPropName];

    // get the records with no action: "delete"
    let notDeletedActionRecords = 0;
    for (const rec of recordDtl) {
      if (rec.action !== 'delete') ++notDeletedActionRecords;
    }
    if (notDeletedActionRecords < this.recordsNum) return false;
    return true;
  }
}


export async function handleDtlAddModel(e) {
  switch (this.state.details.type) {
    case 'PRIMARY':
      return this.setState({ record:  this.dtlAdder.primaryAddHandler(e)});
    case 'FOREIGN':
      const { details } = this.state;
      return this.setState({ addDtlForeignList: details.current_tab });
    default:
      break;
  }
}