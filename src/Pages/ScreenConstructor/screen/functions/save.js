import { getDtailsPropnams, timer } from "../utilities";
import { getValues, getHeaders, handleFields } from "../fields";
import {
  checkDetailsValidity,
  checkValidity,
} from "../../../../Validation/validation";
import axios from "../../../../axios";
import { logout } from "../../../../Context";
import { store } from "../../../../index";
import { getDetails } from "../Details/requestDetails";
import { FuncConstructor } from "./funcConstructor";
import { updateMode } from "../mode";
import { selectMessage } from "../../../../Languages/languages";

// save processes ***************************************************

/**
 * Responsilable for save funcion of the screen
 */

export class Saver extends FuncConstructor {
  save() {
    const { details } = this.screen.state;
    if (!details) return this.handleSaveRequest();
    return this.handleDtlSaveRequest();
  }

  handleSaveRequest() {
    const {
      state: { fields },
    } = this.screen;
    const { url, method } = this.getRequestInfo();
    return new Promise((resolve, reject) => {
      axios({
        method,
        url,
        data: getValues(fields),
        headers: getHeaders(this.screen),
      })
        .then((res) => {
          const fieldsUpdate = handleFields(fields, "close", false);
          const message = {
            content: selectMessage(res.data.message),
            type: "success",
          };
          resolve({ message, fieldsUpdate });
        })
        .catch((err) => this.handleCatch(err, resolve));
    });
  }

  handleDtlSaveRequest() {
    const { fields: masterfields } = this.screen.state;
    const { url, method } = this.getRequestInfo();

    // prepare the body
    const detailsValues = trackDetailsChange(this.screen);
    console.log({ detailsValues });
    const fieldsValues = getValues(masterfields);
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

  // utilities
  getRequestInfo() {
    const {
      state: { mode, urls },
    } = this.screen;
    let method = null;
    let url = null;
    if (mode === "modify") {
      method = "put";
      url = urls.modify;
    } else {
      method = "post";
      url = urls.add;
    }
    return { url, method };
  }

  handleDtlResponse(res, resolve) {
    const {
      mode,
      fields: masterfields,
      record: stateRecord,
      details: { tabs },
    } = this.screen.state;
    const message = {
      content: selectMessage(res.data.message),
      type: "success",
    };
    let record = null;
    if (mode === "add") {
      // prepare a record for getDetails function as in add mode the record is null
      const detailsPagesURLs = Object.keys(tabs).map((key) => {
        tabs[key].pageURL.id = key;
        return tabs[key].pageURL;
      });
      const preparedRecord = {};
      detailsPagesURLs.forEach((pageURL) => {
        const { master } = pageURL;
        preparedRecord[master] = masterfields[master].value;
      });
      record = getDetails(preparedRecord, this.screen);
    } else {
      record = getDetails(stateRecord, this.screen);
    }
    const fieldsUpdate = handleFields(masterfields, "close", false);
    record.then((rec) => resolve({ fieldsUpdate, message, rec }));
  }

  handleCatch(err, reject) {
    const {
      state: { fields },
    } = this.screen;
    console.log(err);
    const fieldsUpdate = handleFields(fields, "open", false);
    let message = null;
    if (err.response) {
      // update the previlliges
      if (err.response.status === 401) {
        store.dispatch(logout());
      }
      message = {
        content: selectMessage(err.response.data.message),
        type: "error",
      };
      if (err.response.data.error) {
        message.content = err.response.data.error;
      }
    }
    reject({ fieldsUpdate, message });
  }
}

export function trackDetailsChange(screen) {
  const {
    record,
    details: { tabs },
    mode,
  } = screen.state;
  const properties = getDtailsPropnams(tabs, true);
  const detailsToSave = {};
  properties.forEach((prop) => {
    if (prop) {
      const { recordDetailPropName, headers } = prop;
      detailsToSave[recordDetailPropName] = [];
      if (record) {
        const pages = record[recordDetailPropName];
        if (pages) {
          if (mode === "copy") {
            pages.forEach((page) => {
              const updatedPage = {};
              Object.values(headers).forEach((header) => {
                updatedPage[header.propName] = page[header.propName];
              });
              updatedPage.action = "add";
              detailsToSave[recordDetailPropName].push(updatedPage);
            });
          } else {
            pages.forEach((page) => {
              if (page.action) {
                const updatedPage = {};
                Object.values(headers).forEach((header) => {
                  updatedPage[header.propName] = page[header.propName];
                });
                updatedPage.action = page.action;
                if (page.action !== "delete") {
                  detailsToSave[recordDetailPropName].push(updatedPage);
                } else if (page.action === "delete" && !page.frontRow) {
                  detailsToSave[recordDetailPropName].push(updatedPage);
                }
              }
            });
          }
        }
      }
    }
  });
  return detailsToSave;
}

export async function handleSaveModel() {
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
    const res = await this.saveHandler.save();
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
