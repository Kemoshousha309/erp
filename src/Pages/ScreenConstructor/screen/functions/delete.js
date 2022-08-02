/**
 * @module delete 
 */

import { timer } from "../utilities";
import { getValues, getPkUrl, handleFields } from "../fields";
import axios from "../../../../axios";
import { logout } from "../../../../Context";
import { store } from "../../../../index";
import { FuncConstructor } from "./funcConstructor";
import { updateMode } from "../mode";
import { selectMessage } from "../../../../Languages/languages";

// delete ******************************************************
/**
 * Deleter manages the delete process in the screen
 */
export class Deleter extends FuncConstructor {
  /**
   * send a request to delete the record
   * @returns {Object} object - contains fields update and message to render
   */
  handleRequest() {
    const {
      state: { fields, pks, urls },
      props: { lanState },
    } = this.screen;
    const record = getValues(fields);
    const pkUrl = getPkUrl(pks, record);
    const url = `${urls.delete}${pkUrl}`;
    return new Promise((resolve, reject) => {
      axios({
        method: "delete",
        url,
      })
        .then((res) => {
          const fieldsUpdate = handleFields(fields, "close", true);
          const message = {
            content: selectMessage(res.data.message),
            type: "success",
          };
          resolve({ fieldsUpdate, message });
        })
        .catch((err) => {
          // update the previlleges
          let message = null;
          if (err.response) {
            if (err.response.status === 401) {
              store.dispatch(logout());
            }
            message = {
              content: selectMessage(err.response.data.message, lanState),
              type: "error",
            };
          }
          const fieldsUpdate = handleFields(fields, "close", true);
          resolve({ fieldsUpdate, message });
        });
    });
  }
}


/**
 *  manages the default behavior of the delete confirmations 
 * @param {boolean} res - the response of the user of delete dialog
 */

export async function handleDeleteConfirmModel(res) {
  if (!res) return this.setState({ deleteConfirm: false });
  const { tools } = updateMode("start", this.state, this.props);
  this.setState({loading: true, message: false})
  const { fieldsUpdate, message } = await this.deleteHandler.handleRequest();
  this.setState({
    mode: "start",
    loading: false,
    message,
    recordIndex: null,
    record: null,
    fields: fieldsUpdate,
    deleteConfirm: false,
    tools
  });
  timer().then((res) => this.setState({ message: false }));
}
