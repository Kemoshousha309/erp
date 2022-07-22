import { t } from '../../../../../Helpers/lang';
import { timer } from '../../utilities';
import { transformForiegnDetailsData } from '../requestDetails';

export class DetailsList_ADD {
  // handle the details lists coming from add button
  constructor(screen) {
    this.screen = screen;
  }

  // close foreign details list ADD *******************
  handleCloseDetailsFkList_ADD() {
    this.screen.setState({ addDtlForeignList: null });
  }

  // handle details Record Click
  handleDetailsRecordClick_ADD(record) {
    // data structure
    let {
      state: {
        record: stateRecord,
        details: { tabs, current_tab },
      },
      props: { lanState, lanTable },
    } = this.screen;
    // if the state has record check if it has a Dtl property else create a record
    if (stateRecord) {
      // check presence of detials
      if (stateRecord[tabs[current_tab].recordDetailPropName]) {
        // create a row then check if it's present or not
        const { fk } = tabs[current_tab];
        let present = false;
        const newRow = transformForiegnDetailsData(
          record,
          Object.values(tabs[current_tab].headers),
        );
        stateRecord[tabs[current_tab].recordDetailPropName].forEach((i) => {
          if (newRow[fk] === i[fk] && i.action !== 'delete') {
            present = true;
          }
        });
        if (!present) {
          stateRecord[tabs[current_tab].recordDetailPropName].unshift(newRow);
          this.screen.setState({
            addDtlForeignList: null,
            record: stateRecord,
          });
        } else {
          const message = {
            content: t('item_exist', lanTable, lanState),
            type: 'error',
          };
          this.screen.setState({ addDtlForeignList: null, message });
          timer(this.screen);
        }
      } else {
        // add details if not
        stateRecord[tabs[current_tab].recordDetailPropName] = [];
        stateRecord[tabs[current_tab].recordDetailPropName].unshift(
          transformForiegnDetailsData(record, Object.values(tabs[current_tab].headers)),
        );
        this.screen.setState({ addDtlForeignList: null, record: stateRecord });
      }
    } else {
      // there is no record in the state so create one
      stateRecord = {};
      stateRecord[tabs[current_tab].recordDetailPropName] = [];
      stateRecord[tabs[current_tab].recordDetailPropName].unshift(
        transformForiegnDetailsData(record, Object.values(tabs[current_tab].headers)),
      );
      this.screen.setState({ addDtlForeignList: null, record: stateRecord });
    }
    document.getElementById('detailsTableContainer').scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}

export class DetailsList {
  constructor(screen) {
    this.screen = screen;
    this.choosedRecords = [];
  }

  // close foreign details list  *******************
  handleCloseDtlFkList() {
    const {
      details,
      details: { current_tab },
    } = this.screen.state;
    details.tabs[current_tab].activeForeignList = null;
    this.screen.setState({ details });
  }

  handleRecordClick(choosedRecord) {
    const {
      state: {
        record: stateRecord,
        details,
        details: { current_tab },
      },
    } = this.screen;
    const activeFkListName = details.tabs[current_tab].activeForeignList;
    const activeFkHeader = Object.values(details.tabs[current_tab].headers).filter(
      (header) => header.propName === activeFkListName,
    );
    // these are the details fields names that should be filled
    const detailsFillFields = activeFkHeader[0].fillFields;
    const recordDtlPropName = details.tabs[current_tab].recordDetailPropName;
    const rowIndex = details.tabs[current_tab].detailsRowIndex;
    const row = stateRecord[recordDtlPropName][rowIndex];
    if (!stateRecord) throw new Error('there is no record in the state');
    detailsFillFields.forEach((fieldName) => {
      row[fieldName] = choosedRecord[fieldName];
    });
    this.choosedRecords.push(choosedRecord);
    this.handleCloseDtlFkList();
    this.screen.setState({ details });
  }
}
