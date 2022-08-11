/**
 * @module moves
 */

import axios from "../../../../axios";
import { logout } from "../../../../Context";
import { store } from "../../../../index";
import { FuncConstructor } from "./funcConstructor";
import { t } from "../../../../Languages/languages";
import { fillRecord, getPkUrl, getValues } from "../handlers/fields";
import { updateMode } from "../handlers/mode";
import { timer } from "../handlers/utilities";

// moves processes ***********************************************

/**
 * Mover is responsible for handling moving between records
 */
export class Mover extends FuncConstructor {
  /**
   * handle the move click
   * @param {string} type indicate the type of move (next|last|previous, first)
   * @returns { Object } object contains: fieldsUpdate, record, message, indexUpdate
   */
  handleMove(type) {
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
            // update the privileges
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

  /**
   * used in case of lack of index
   * @param {string} moveType 
   * @returns the same as handleMove 
   */
  handleIndex(moveType)  {
    const { fields, pks, urls } = this.screen.state;
    let index = null;
    const recordData = getValues(fields);
    const pkUrl = getPkUrl(pks, recordData);
    const url = `${urls.pageNo}${pkUrl}`;
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
              // update the privileges
              if (err.response.status === 401) {
                store.dispatch(logout());
              }
            });
        })
        .catch((err) => {
          // update the privileges
          if (err.response.status === 401) {
            store.dispatch(logout());
          }
        });
    });
  };

  /**
   * handle the response of the request
   * @param {object} res the response from request
   * @param {number} newIndex the fetched index to be set in the state
   * @returns { Object } object contains: fieldsUpdate, record, message, indexUpdate
   */
  handleRes(res, newIndex) {
    let {
      state: { fields: fieldsUpdate, lastIndex, recordIndex },
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
      content: t("record_no", index),
      type: "info",
    };
    return { fieldsUpdate, record, message, indexUpdate };
  };

  /**
   * get the url and index
   * @param {string} moveType 
   * @returns {Array} array contains index and the url
   */
  handleUrlMove(moveType) {
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

   /**
   * get the url and index but used in handleIndex function
   * @param {string} moveType 
   * @returns {Array} array contains index and the url
   * @function
   */
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
/**
 * manages the behavior of the move process
 * @param {string} type 
 */
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

/**
 * update the state with the last index
 * @param {Object} thisK the current screen
 */
export function setLastIndex(thisK) {
  axios
    .get(thisK.state.urls.lastPage)
    .then((res) => {
      if (thisK.mounted) {
        thisK.setState({ lastIndex: res.data.pages_count });
      }
    })
    .catch((err) => {});
};
