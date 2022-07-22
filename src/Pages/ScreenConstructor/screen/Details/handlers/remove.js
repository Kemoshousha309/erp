// REOMVE HANDLERS ************************************************************************
export class DetailsRemover {
  constructor(screen) {
    this.screen = screen;
  }

  removeHandler(index, e) {
    e.preventDefault();
    const {
      record,
      details: { current_tab, tabs },
    } = this.screen.state;
    const row = record[tabs[current_tab].recordDetailPropName][index];
    // saving the previous action to use later in the row at the record
    if (row.action) {
      row.prevAction = row.action;
    }
    // set the delete action to reflect later on the UI
    row.action = 'delete';
    this.screen.setState({ record });
  }
}

export class LimitDetialsRomver extends DetailsRemover {
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

    this.removeHandler(index, e);

    if (!this.isExceedMaxRecordNum()) {
      // activate the add button
      details.tabs[current_tab].addState = true;
      this.screen.setState({ details });
    }
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
