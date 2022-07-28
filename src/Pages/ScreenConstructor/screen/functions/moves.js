import { getValues, fillRecord, getPkUrl } from "../fields";
import axios from "../../../../axios";
import { logout } from "../../../../store";
import { store } from "../../../../index";
import { timer } from "../utilities";
import { t } from "../../../../Helpers/lang";
import { FuncConstructor } from "./funcConstructor";
import { updateMode } from "../mode";

// moves processes ***********************************************

export class Mover extends FuncConstructor {
  handleMove = (type) => {
    const [url, newIndex] = this.handleUrlMove(type);
    if (newIndex)
      return new Promise((resolve, reject) => {
        axios
          .get(url)
          .then((res) => {
            if (newIndex === "lastIndex") {
              resolve(this.handleRes(res, res.data.pages_count));
            } else {
              resolve(this.handleRes(res, newIndex));
            }
          })
          .catch((err) => {
            // update the previlliges
            if (err.response) {
              if (err.response.status === 401) {
                store.dispatch(logout());
              }
            } else {
            }
          });
      });

    return this.handleIndex(type);
  };

  handleIndex = (moveType) => {
    const { fields, pks, urls } = this.screen.state;
    let index = null;
    const recordData = getValues(fields);
    const pkurl = getPkUrl(pks, recordData);
    const url = `${urls.pageNo}${pkurl}`;
    return new Promise((resolve, reject) => {
      axios
        .get(url)
        .then((res) => {
          index = res.data.page_no;
          const [url, newIndex] = this.handleUrlMove_(moveType, index);
          axios
            .get(url)
            .then((res) => resolve(this.handleRes(res, newIndex)))
            .catch((err) => {
              console.log(err);
              // update the previlliges
              if (err.response.status === 401) {
                store.dispatch(logout());
              }
            });
        })
        .catch((err) => {
          // update the previlliges
          if (err.response.status === 401) {
            store.dispatch(logout());
          }
        });
    });
  };

  handleRes = (res, newIndex) => {
    let {
      state: { fields: fieldsUpdate, lastIndex, recordIndex },
      props: { lanTable, lanState },
    } = this.screen;
    let record;
    let indexUpdate = recordIndex;
    if (res.data.page) {
      record = res.data.page;
      fieldsUpdate = fillRecord(fieldsUpdate, record);
      indexUpdate = newIndex;
    }
    let index = !newIndex ? 1 : newIndex;
    if (newIndex >= lastIndex) {
      index = "last index";
    }
    const message = {
      content: t("record_no", lanTable, lanState, index),
      type: "info",
    };
    return { fieldsUpdate, record, message, indexUpdate };
  };

  // urls handlers
  handleUrlMove = (moveType) => {
    const { recordIndex, urls } = this.screen.state;
    let url = null;
    let newIndex = null;
    switch (moveType) {
      case "next":
        newIndex = recordIndex + 1;
        url = `${urls.page}/${newIndex}`;
        break;
      case "previous":
        newIndex = recordIndex - 1;
        url = `${urls.page}/${newIndex}`;
        break;
      case "first":
        newIndex = 1;
        url = `${urls.page}/${newIndex}`;
        return [url, newIndex];
      case "last":
        newIndex = "lastIndex";
        url = urls.lastPage;
        return [url, newIndex];
      default:
        break;
    }
    if (!recordIndex) {
      newIndex = null;
      url = null;
    }
    return [url, newIndex];
  };

  handleUrlMove_ = (moveType, index) => {
    const { urls } = this.screen.state;
    let url = null;
    let newIndex = null;
    switch (moveType) {
      case "next":
        newIndex = index + 1;
        url = `${urls.page}/${newIndex}`;
        break;
      case "previous":
        newIndex = index - 1;
        url = `${urls.page}/${newIndex}`;
        break;
      case "first":
        newIndex = 1;
        url = `${urls.page}/${newIndex}`;
        break;
      case "last":
        newIndex = "lastIndex";
        url = urls.lastPage;
        break;
      default:
        break;
    }
    return [url, newIndex];
  };
}

export async function handleMoveModel(type) {
  this.setState({ message: false, loading: true });
  const res = await this.moveHandler.handleMove(type);
  const {tools} = updateMode("d_record", this.state, this.props)
  const { fieldsUpdate, record, message, indexUpdate } = res;
  this.setState({
    recordIndex: indexUpdate,
    record: record,
    fields: fieldsUpdate,
    mode: "d_record",
    message,
    loading: false,
    tools
  });
  timer().then((res) => this.setState({ message: false }));
}

export const setlastIndex = (thisK) => {
  axios
    .get(thisK.state.urls.lastPage)
    .then((res) => {
      if (thisK.mounted) {
        thisK.setState({ lastIndex: res.data.pages_count });
      }
    })
    .catch((err) => {});
};
