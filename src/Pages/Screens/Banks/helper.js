import { getValues } from "../../ScreenConstructor/screen/fields";
import {
  Saver,
  trackDetailsChange,
} from "../../ScreenConstructor/screen/functions/save";
import axios from "../../../axios";
import {
  checkDetailsValidity,
  checkValidity,
} from "../../../Validation/validation";
import { updateMode } from "../../ScreenConstructor/screen/mode";
import { timer } from "../../ScreenConstructor/screen/utilities";
import Page from "../../ScreenConstructor/screen/RecordDisplay/Page/Page";
import _ from "lodash";
import { selectMessage } from "../../../Languages/languages";

export class BanksSave extends Saver {
  async handleBanksSave() {
    const { fields: masterfields } = this.screen.state;
    const { url, method } = this.getRequestInfo();

    // prepare the body
    const detailsValues = await this.prepareDtlValues();
    const fieldsValues = getValues(masterfields);
    // add the accout number of details to the master


    const { record } = this.screen.state;
    if (record) {
      fieldsValues.account_no = record.bnk_dtl_list[0].acc_no;
    }

    const body = {
      ...detailsValues,
      ...fieldsValues,
    };

    console.log({ body });
    return new Promise((resolve, reject) => {
      axios({
        method,
        url,
        data: body,
      })
        .then((res) => this.handleDtlResponse(res, resolve))
        .catch((err) => this.handleCatch(err, reject));
    });
  }

  prepareDtlValues() {
    const { mode, fields } = this.screen.state;
    const detialsChange = trackDetailsChange(this.screen);
    return new Promise((resolve, reject) => {
      if (mode === "add" || mode === "copy") resolve(detialsChange);
      // modify
      if (detialsChange.bnk_dtl_list.length > 0) {
        // make the trick of update
        const addPage = detialsChange.bnk_dtl_list[0]; // action update
        addPage.action = "add";
        // make a request to get the the dtl record to be deleted
        return axios
          .get(`/banks/${fields.bank_no.value}`)
          .then((res) => {
            const fetchedPage = res.data.bnk_dtl_list[0];
            const deletePage = {};
            Object.keys(addPage).forEach((key) => {
              deletePage[key] = fetchedPage[key];
            });
            deletePage.action = "delete";
            resolve({bnk_dtl_list: [addPage, deletePage]});
          })
          .catch((err) => {
            console.log(err);
          });
      }
      resolve({bnk_dtl_list: []})
    });
  }
}

export async function handleBanksSaveModel() {
  const { details } = this.state;
  const [valid, fieldsUpdate] = checkValidity(this);
  if (details) {
    const [detailsValid, record] = checkDetailsValidity.call(this);
    if (!valid || !detailsValid)
      return this.setState({ fields: fieldsUpdate, record });
  }
  if (!valid) return this.setState({ fields: fieldsUpdate });

  this.setState({ loading: true });
  try {
    const res = await this.banksSaver.handleBanksSave();
    console.log(res);
    const { message, fieldsUpdate, record } = res;
    const updateRecord = record ? record : this.state.record;
    const { tools } = updateMode("d_record", this.state, this.props);
    this.setState({
      mode: "d_record",
      loading: false,
      message,
      recordIndex: null,
      fields: fieldsUpdate,
      record: updateRecord,
      tools,
    });
    timer().then((res) => this.setState({ message: false }));
  } catch (err) {
    console.log(err);
    const { message, fieldsUpdate } = err;
    this.setState({
      loading: false,
      message: message,
      recordIndex: null,
      fields: fieldsUpdate,
    });
    timer().then((res) => this.setState({ message: false }));
  }
}

// set listener to acc_cur to trigger the custom list
export function setAccCurListener() {
  // set listeners to the account currency
  // set timeout function make sure to run the code after set the state
  setTimeout(() => {
    const presentAccCurrFiels = document.querySelectorAll("#acc_curr");
    presentAccCurrFiels.forEach((element) => {
      if (element.dataset.hasListener === "true") return;
      element.addEventListener("keydown", (event) => {
        event.preventDefault();
        if (event.key === "F4") {
          let currentElement = event.target;
          while (currentElement.tagName !== "TR") {
            currentElement = currentElement.parentElement;
          }
          const rowIndex = currentElement.dataset.rowindex;
          const { custimizedList } = this.state;
          this.setState({ loading: true });
          prepareData(this, rowIndex)
            .then((currList) => {
              custimizedList.open = true;
              custimizedList.render = renderCustomBanksDtlAccCurrList(
                currList,
                accCurRecordClick.bind(this, rowIndex)
              );
              this.setState({ custimizedList, loading: false });
              timer().then((res) => this.setState({ message: false }));
            })
            .catch((errMess) => {
              const message = {
                content: selectMessage(errMess),
                type: "error",
              };
              this.setState({ message, loading: false });
              timer().then((res) => this.setState({ message: false }));
            });
        }
      });
      element.dataset.hasListener = true;
    });
  });
}

function renderCustomBanksDtlAccCurrList(data, accCurRecordClick) {
  if (typeof data === "string") return <h1>{data}</h1>;
  return (
    <Page
      page={data}
      recordClick={accCurRecordClick}
      fields={[{ propName: "cur_code", label: "acc_curr" }]}
    />
  );
}

function accCurRecordClick(rowIndex, event, recordIndex, choosedRecord) {
  const {
    state: {
      details,
      details: { current_tab },
      record: stateRecord,
      mode,
    },
  } = this;

  const stateRecordClone = _.cloneDeep(stateRecord);
  const recDtlPropName = details.tabs[current_tab].recordDetailPropName;
  stateRecordClone[recDtlPropName][rowIndex].acc_curr = choosedRecord.cur_code;
  stateRecordClone[recDtlPropName][rowIndex].action =
    mode === "add" ? "add" : "update";
  this.setState({
    custimizedList: { open: false, render: null },
    record: stateRecordClone,
  });
}

function prepareData(screen, rowIndex) {
  return new Promise((resolve, reject) => {
    const {
      state: {
        record,
        details,
        details: { current_tab },
      },
    } = screen;

    // get the associated acc_no
    const accountNum =
      record[details.tabs[current_tab].recordDetailPropName][rowIndex].acc_no;
    const errMess = {
      ar: "يجب ادخال رقم الحساب",
      en: "You must enter account number",
    };
    if (!accountNum) reject(errMess);
    // get the currencies associated to this acc_no from the server
    axios({
      method: "get",
      url: `chartofaccounts/${accountNum}`,
    })
      .then((res) => {
        resolve(res.data.account_currency_list);
      })
      .catch((err) => {
        reject(err.response.data.message);
      });
  });
}

export function disableDtlRecords(value) {
  const {
    state: {
      details,
      details: { current_tab },
    },
  } = this;

  const detailsUpdate = _.cloneDeep(details);
  Object.values(detailsUpdate.tabs[current_tab].headers).forEach((header) => {
    header.disabled = value;
  });
  this.setState({ details: detailsUpdate });
}
