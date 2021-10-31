import { timer } from "../utilities";
import { getValues, fields, getPkUrl } from "../fields";
import axios from "../../../../axios"
import { logout } from "../../../../store";
import { store } from "../../../../index";
import { selectMessage } from "../../../../utilities/lang";

// delete ******************************************************
export const handleDelete = (thisK) => {
  thisK.setState({ deleteConfirm: true });
};

export const handleDeleteConfirmation = (thisK, res) => {
  if (res) {
    handleDeleteRequest(thisK);
  }
  const currentState = thisK.state.deleteConfirm;
  thisK.setState({ deleteConfirm: !currentState });
};

const handleDeleteRequest = (thisK) => {
  const record = getValues(thisK.state.fields);
  const pkUrl = getPkUrl(thisK.state.pks, record);
  const url = `${thisK.state.urls.delete}${pkUrl}`;
  thisK.setState({ loading: true });
  axios({
    method: "delete",
    url: url,
  })
    .then((res) => {
      fields(thisK.state.fields, "close", true);
      const message = {
        content: selectMessage(res.data.message, thisK.props.lanState),
        type: "success",
      };
      thisK.setState({
        mode: "start",
        loading: false,
        message: message,
        recordIndex: null,
        record: null,
      });
      timer(thisK);
    })
    .catch((err) => {
      // update the previlliges
      let message = null;
      if (err.response) {
        if (err.response.status === 401) {
          store.dispatch(logout());
        }
        message = {
          content: selectMessage(
            err.response.data.message,
            thisK.props.lanState
          ),
          type: "error",
        };
      }
      fields(thisK.state.fields, "close", true);
      thisK.setState({
        mode: "start",
        loading: false,
        message: message,
        recordIndex: null,
        record: null,
      });
      timer(thisK);
    });
};
