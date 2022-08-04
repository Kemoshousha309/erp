import { Saver, trackDetailsChange } from "../../ScreenConstructor/screen/functions/save";
import axios from "../../../axios";
import { getValues } from "../../ScreenConstructor/screen/fields";
import { updateMode } from "../../ScreenConstructor/screen/mode";
import { timer } from "../../ScreenConstructor/screen/utilities";
import { checkDetailsValidity, checkValidity } from "../../../Validation/validation";

export class CashSaver extends Saver {
  async handleCashSave() {
    const { fields: masterFields } = this.screen.state;
    const { url, method } = this.getRequestInfo();

    // prepare the body
    const detailsValues = await this.prepareDtlValues();
    const fieldsValues = getValues(masterFields);
    // add the account number of details to the master

    const { record } = this.screen.state;
    if (record) {
      fieldsValues.acc_no = record.cash_dtl_list[0].acc_no;
    }

    const body = {
      ...detailsValues,
      ...fieldsValues,
    };
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
    const detailsChange = trackDetailsChange(this.screen);
    return new Promise((resolve, reject) => {
      if (mode === "add" || mode === "copy") return resolve(detailsChange);
      // modify
      if (detailsChange.cash_dtl_list.length > 0) {
        // make the trick of update
        const addPage = detailsChange.cash_dtl_list[0]; // action update
        addPage.action = "add";
        // make a request to get the the dtl record to be deleted
        return axios
          .get(`/cash/${fields.cash_no.value}`)
          .then((res) => {
            const fetchedPage = res.data.cash_dtl_list[0];
            const deletePage = {};
            Object.keys(addPage).forEach((key) => {
              deletePage[key] = fetchedPage[key];
            });
            deletePage.action = "delete";
            resolve({ cash_dtl_list: [addPage, deletePage] });
          })
          .catch((err) => {
            console.log(err);
          });
      }
      resolve({ cash_dtl_list: [] });
    });
  }
}


export async function handleCashSaveModel() {
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
    const res = await this.cashSaver.handleCashSave();
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