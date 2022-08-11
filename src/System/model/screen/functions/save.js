/**
 * @module save
 */

import {
  checkDetailsValidity,
  checkValidity,
} from "../../../../Validation/validation";
import axios from "../../../../axios";
import { logout } from "../../../../Context";
import { store } from "../../../../index";
import { getDetails } from "../Details/requestDetails";
import { FuncConstructor } from "./funcConstructor";
import { selectMessage } from "../../../../Languages/languages";
import { getHeaders, getValues, handleFields } from "../handlers/fields";
import { getDetailsPropanes, timer } from "../handlers/utilities";
import { updateMode } from "../handlers/mode";

// save processes ***************************************************

/**
 * Responsible for save behavior of the screen
 */

export class Saver extends FuncConstructor {
  /**
   * decide which save process to be token
   */
  save() {
    const { details } = this.screen.state;
    if (!details) return this.handleSaveRequest();
    return this.handleDtlSaveRequest();
  }

  /**
   * manages the normal save request
   * @returns {Promise} a promise that resolves the message and the fieldsUpdate
   */
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

   /**
   * manages the normal save request
   * @returns {Promise} resolves either handleDtlResponse or handleCatch
   */
  handleDtlSaveRequest() {
    const { fields: masterFields } = this.screen.state;
    const { url, method } = this.getRequestInfo();

    // prepare the body
    const detailsValues = trackDetailsChange(this.screen);
    console.log({ detailsValues });
    const fieldsValues = getValues(masterFields);
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

  /**
   * handle some data to send the request
   * @returns the url and the method which are used in the save request
   */
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

  /**
   * handle the response of the details request
   * @param {Object} res the response fetched form details save request
   * @param {Function} resolve used to resolve (fieldsUpdate, message, record) 
   */
  handleDtlResponse(res, resolve) {
    const {
      mode,
      fields: masterFields,
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
        preparedRecord[master] = masterFields[master].value;
      });
      record = getDetails(preparedRecord, this.screen);
    } else {
      record = getDetails(stateRecord, this.screen);
    }
    const fieldsUpdate = handleFields(masterFields, "close", false);
    record
    .then((rec) => resolve({ fieldsUpdate, message, rec }))
    .catch(rec => {
      resolve({fieldsUpdate, message: null, rec})
    })
  }

  /**
   * handle the response of the details request
   * @param {Object} err the error fetched form save request
   * @param {Function} reject used to reject the promise with (fieldsUpdate, message) 
   */
  handleCatch(err, reject) {
    const {
      state: { fields },
    } = this.screen;
    console.log(err);
    const fieldsUpdate = handleFields(fields, "open", false);
    let message = null;
    if (err.response) {
      // update the previlleges
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
/**
 * track all changes in the details so we can use them in save process
 * @param {Object} screen the current screen
 * @returns an object contain the dtl records that changed (have action property)
 */
export function trackDetailsChange(screen) {
  const {
    record,
    details: { tabs },
    mode,
  } = screen.state;
  const properties = getDetailsPropanes(tabs, true);
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
/**
 * The model that manages the behavior of the save process and update the state based on that 
 * @returns undefined 
 */
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
