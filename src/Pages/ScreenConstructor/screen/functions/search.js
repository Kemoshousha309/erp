import { getValues, getPkUrl, fillRecord, handleFields } from "../fields";
import axios from "../../../../axios";
import { logout } from "../../../../Context";
import { store } from "../../../../index";
import { FuncConstructor } from "./funcConstructor";
import { checkValidity } from "../../../../Validation/validation";
import { timer } from "../utilities";
import { updateMode } from "../mode";
import { selectMessage } from "../../../../Languages/languages";

// Handle search ******************************************************
export class Searcher extends FuncConstructor {
  prepare() {
    const {
      state: { fields, searchFields },
    } = this.screen;
    return handleFields(fields, "open", true, searchFields);
  }
  searchRequest() {
    const {
      state: { fields, pks, urls, searchFields },
    } = this.screen;
    const values = getValues(fields);
    const pkUrl = getPkUrl(pks, values);
    const url = `${urls.search}${pkUrl}`;
    return new Promise((resolve, reject) => {
      axios
        .get(url)
        .then((res) => {
          let fieldsUpdate = fillRecord(fields, res.data);
          fieldsUpdate = handleFields(fieldsUpdate, "close", false);
          resolve({ fieldsUpdate, fetchedRecord: res.data });
        })
        .catch((err) => {
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
          }
          const fieldsUpdate = handleFields(
            fields,
            "open",
            false,
            searchFields
          );
          reject({ fieldsUpdate, message });
        });
    });
  }
}

export async function handleSearchModel() {
  const {
    state: { mode },
  } = this;
  if (mode === "search") {
    const [valid, fieldsUpdate] = checkValidity(this);
    if (!valid) return this.setState({ fields: fieldsUpdate });
    this.setState({ loading: true });
    const { tools } = updateMode("d_record", this.state, this.props);
    try {
      const { fieldsUpdate, fetchedRecord } =
        await this.searchHandler.searchRequest();
      this.setState({
        mode: "d_record",
        loading: false,
        recordIndex: null,
        record: fetchedRecord,
        fields: fieldsUpdate,
        tools,
      });
      timer().then((res) => this.setState({ message: false }));
    } catch ({ fieldsUpdate, message }) {
      this.setState({
        loading: false,
        message,
        recordIndex: null,
        fields: fieldsUpdate,
      });
      timer().then((res) => this.setState({ message: false }));
    }
  } else {
    const fieldsUpdate = this.searchHandler.prepare();
    const { tools } = updateMode("search", this.state, this.props);
    this.setState({ fields: fieldsUpdate, mode: "search", tools });
  }
}
