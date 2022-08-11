/**
 * @module viewPrivs
 */

import { store } from "../../../..";
import axios from "../../../../axios";
import { logout } from "../../../../Context";
import { selectMessage } from "../../../../Languages/languages";
import { FuncConstructor } from "../../screen/functions/funcConstructor";
import { updateMode } from "../../screen/handlers/mode";
import { timer } from "../../screen/handlers/utilities";

/**
 * PrivsViewer is responsible for get the privileges table from the server
 */
export class PrivsViewer extends FuncConstructor {
  /**
   * request the privs table from the server
   * @returns {Promise} a promise resolves the tools in success and err mess in failure
   */
  requestPrivs() {
    const { url } = this.screen.state;
    return new Promise((resolve, reject) => {
      axios({
        url: `masterdataprivileges/${url}`,
        method: "post",
        data: this.prepareBody(),
      })
        .then((res) => {
          const { tools } = updateMode(
            "d_record",
            this.screen.state,
            this.screen.props
          );
          resolve({ tools, input_privs: res.data });
        })
        .catch((err) => {
          let message = null;
          if (err.response) {
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
            reject({ message });
          }
        });
    });
  }

  /**
   * go through the fields and collect the values
   * @returns {Object} boy that contain the fields values
   */
  prepareBody() {
    const {
      state: { fields },
    } = this.screen;
    const body = {};
    Object.keys(fields).forEach((key) => {
      body[key] = fields[key].value;
    });
    return body;
  }
}

export async function handlePrivsViewModel() {
  this.setState({ loading: true });
  try {
    const res = await this.privViewHandler.requestPrivs();
    const { tools, input_privs } = res;
    this.setState({
      input_privs, 
      loading: false,
      mode: "d_record",
      tools,
    });
  } catch (error) {
    const { message } = error;
    this.setState({
      statusLoading: false,
      message: message,
      loading: false,
    });
    timer().then((res) => this.setState({ message: false }));
  }
}
