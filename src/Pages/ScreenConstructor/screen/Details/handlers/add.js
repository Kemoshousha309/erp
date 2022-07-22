// DETIAL ADD HANDLERS **********************************************************
export class DetialsAdder {
  // this class is responsible for the default add process of details
  constructor(screen) {
    this.screen = screen;
  }

  // ADD HANDLERS
  addHandler(e) {
    // this is a default details add hanlder which decide the way to handle add base on the
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

    // prevent the default behavoir of the form
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

    // add the record to the state
    if (!record) { // if there is no record
      record = {};
      record[tabs[current_tab].recordDetailPropName] = [row];
    } else if (!record[tabs[current_tab].recordDetailPropName]) {
      // if there is record but with no details
      record[tabs[current_tab].recordDetailPropName] = [row];
    } else {
      // if there is a record with details add our row at the top off the detials list
      record[tabs[current_tab].recordDetailPropName].unshift(row);
    }
    // move the scroll bar to the top (UI EFFECT)
    document.getElementById('detailsTableContainer').scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    // update the record in the state
    this.screen.setState({ record });
  }

  foreignAddHandler(e) {
    // open the details list from foreign table
    const { details } = this.screen.state;
    this.screen.setState({ addDtlForeignList: details.current_tab });
  }
}

// Other sepcial add handlers
export class LimitAdder extends DetialsAdder {
  constructor(screen, recordsNum) {
    super(screen);
    this.recordsNum = recordsNum;
  }

  limitAddHandler(e) {
    // destructure date
    const {
      details,
      details: { current_tab },
    } = this.screen.state;

    // this will add a details row in the record in state which will reflect on the UI
    this.primaryAddHandler(e);

    // update the add button state
    if (this.isExceedMaxRecordNum()) {
      details.tabs[current_tab].addState = false;
    }
    this.screen.setState({ details });
  }

  isExceedMaxRecordNum() {
    // check the number of records to enable or disabe the add button
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
