import _ from "lodash";
import { t } from "../../../../../Helpers/lang";
import { timer } from "../../utilities";
import { transformForiegnDetailsData } from "../requestDetails";

export class DetailsList_ADD {
  // handle the details lists coming from add button
  constructor(screen) {
    this.screen = screen;
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
    let stateRecordClone = _.cloneDeep(stateRecord);
    // if the state has record check if it has a Dtl property else create a record
    if (!stateRecordClone) {
      // there is no record in the state so create one
      stateRecordClone = {};
      stateRecordClone[tabs[current_tab].recordDetailPropName] = [];
      stateRecordClone[tabs[current_tab].recordDetailPropName].unshift(
        transformForiegnDetailsData(
          record,
          Object.values(tabs[current_tab].headers)
        )
      );
      return {stateRecordClone};
    }

    if (stateRecordClone[tabs[current_tab].recordDetailPropName]) {
      // create a row then check if it's present or not
      const { fk } = tabs[current_tab];
      let present = false;
      const newRow = transformForiegnDetailsData(
        record,
        Object.values(tabs[current_tab].headers)
      );
      stateRecordClone[tabs[current_tab].recordDetailPropName].forEach((i) => {
        if (newRow[fk] === i[fk] && i.action !== "delete") {
          present = true;
        }
      });
      if (present) {
        const message = {
          content: t("item_exist", lanTable, lanState),
          type: "error",
        };
        return { message, stateRecordClone };
      }
      stateRecordClone[tabs[current_tab].recordDetailPropName].unshift(newRow);
      return {stateRecordClone};
    }

    stateRecordClone[tabs[current_tab].recordDetailPropName] = [];
    stateRecordClone[tabs[current_tab].recordDetailPropName].unshift(
      transformForiegnDetailsData(
        record,
        Object.values(tabs[current_tab].headers)
      )
    );
    document.getElementById("detailsTableContainer").scrollTo({
      top: 0,
      behavior: "smooth",
    });
    return {stateRecordClone};
  }
}

export class DetailsList {
  constructor(screen) {
    this.screen = screen;
    this.choosedRecords = [];
  }

  handleRecordClick(choosedRecord) {
    const {
      state: {
        record: stateRecord,
        details,
        details: { current_tab },
        mode
      },
    } = this.screen;
    const stateRecordClone = _.cloneDeep(stateRecord);
    const activeFkListName = details.tabs[current_tab].activeForeignList;
    const activeFkHeader = Object.values(
      details.tabs[current_tab].headers
    ).filter((header) => header.propName === activeFkListName);
    // these are the details fields names that should be filled
    const detailsFillFields = activeFkHeader[0].fillFields;
    const recordDtlPropName = details.tabs[current_tab].recordDetailPropName;
    const rowIndex = details.tabs[current_tab].detailsRowIndex;
    const row = stateRecordClone[recordDtlPropName][rowIndex];
    if (!stateRecordClone) throw new Error("there is no record in the state");
    detailsFillFields.forEach((fieldName) => {
      row[fieldName] = choosedRecord[fieldName];
      row.action = mode === "add" ? "add" : "update"
    });
    this.choosedRecords.push(choosedRecord);
    return stateRecordClone;
  }
}

export function handleOpenFkListModel(activeDtlFk) {
  const { details } = this.state;
  let currentElement = document.activeElement;
  while (currentElement.tagName !== "TR") {
    currentElement = currentElement.parentElement;
  }
  const detailsRowIndex = currentElement.dataset.rowindex;
  const dtlUpdate = _.cloneDeep(details);
  dtlUpdate.tabs[dtlUpdate.current_tab].activeForeignList = activeDtlFk;
  dtlUpdate.tabs[dtlUpdate.current_tab].detailsRowIndex = detailsRowIndex;
  this.setState({ details: dtlUpdate });
}

export function handleDtlFkListCloseModel() {
  const {
    details,
    details: { current_tab },
  } = this.state;
  const dtlUpdate = _.cloneDeep(details);
  dtlUpdate.tabs[current_tab].activeForeignList = null;
  this.setState({ details: dtlUpdate });
}

export function handleDtlFkListRecordClickModel(choosedRecord) {
  const {
    details,
    details: { current_tab },
  } = this.state;
  const recordUpdate = this.detailsList.handleRecordClick(choosedRecord);
  console.log(recordUpdate)
  const dtlUpdate = _.cloneDeep(details);
  // clsoe the list
  dtlUpdate.tabs[current_tab].activeForeignList = null;
  this.setState({ record: recordUpdate, details: dtlUpdate });
}

export function handelDtlFkListClickADDModel(record) {

  const { message, stateRecordClone } =
    this.detailsList_ADD.handleDetailsRecordClick_ADD(record);
  if (!message) {
    return this.setState({
      addDtlForeignList: null,
      record: stateRecordClone,
    });
  }
  this.setState({
    addDtlForeignList: null,
    record: stateRecordClone,
    message,
  });
  timer().then((res) => this.setState({ message: false }));
}