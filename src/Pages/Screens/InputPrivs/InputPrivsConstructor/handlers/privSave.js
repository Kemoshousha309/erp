/**
 * @module PrivSave
 */

import { FuncConstructor } from "../../../../ScreenConstructor/screen/functions/funcConstructor";
import axios from "../../../../../axios";
import { timer } from "../../../../ScreenConstructor/screen/utilities";
import { selectMessage } from "../../../../../Languages/languages";
import { updateMode } from "../../../../ScreenConstructor/screen/mode";
import { logout } from "../../../../../Context";
import { store } from "../../../../..";

/**
 * PrivSaver responsible for managing the save process in priv screen
 */
export class PrivSaver extends FuncConstructor {
  /**
   * send a save request
   * @returns {Promise} this promise resolve {message, tools update}
   */
  handleSave() {
    const { url } = this.screen.state;
    const body = this.prepareBody();
    return new Promise((resolve, reject) => {
      axios({
        method: "put",
        url: `masterdataprivileges/${url}`,
        data: body,
      })
        .then((res) => {
          console.log(res);
          const message = {
            content: selectMessage(res.data.message),
            type: "success",
          };
          const { tools } = updateMode("d_record", this.screen.state, this.screen.props);
          resolve({ message, tools });
        })
        .catch((err) => {
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
          console.log(err);
          reject({ message });
        });
    });
  }

  /**
   * - go through the input_privs
   * - if item edited add it to the body with only required props
   * @returns {Object} body of the save request
   */
  prepareBody() {
    const { input_privs, propsNames } = this.screen.state;
    const body = [];
    Object.keys(input_privs).forEach((key) => {
      const item = input_privs[key];
      if (item.edited) {
        body.push(this.pickProps(propsNames, item));
      }
    });
    return body;
  }

  pickProps(propsList, obj) {
    const newObj = {};
    propsList.forEach((prop) => {
      newObj[prop] = obj[prop];
    });
    return newObj;
  }
}

export async function handlePrivSaveModel() {
  console.log(this)
  this.setState({ loading: true });
  try {
    const res = await this.privSaver.handleSave();
    const { message, tools } = res;
    this.setState({
      mode: "d_record",
      loading: false,
      message: message,
      recordIndex: null,
      tools,
    });
    timer().then((res) => this.setState({ message: false }));
  } catch (error) {
    const { message } = error;
    this.setState({
      loading: false,
      message: message,
      recordIndex: null,
    });
    timer().then((res) => this.setState({ message: false }));
  }
}
