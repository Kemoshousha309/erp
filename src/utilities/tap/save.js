import { getDtailsPropnams, timer } from "./utilities";
import { getValues, fields, getHeaders } from "./fields";
import { checkDetailsValidity, checkValidity } from "./validation";
import { selectMessage } from "../lang";
import axios from "../../axios";
import { logout } from "../../store";
import { store } from "../../index";
import { getDetails } from "./tabsPanel/tabsPanel";

// save processes ***************************************************
export const handleSave = (thisK, func) => {
  const [valid, fieldsUpdate] = checkValidity(thisK);
  if (valid) {
    handleSaveRequest(thisK, func);
  } else {
    thisK.setState({ fields: fieldsUpdate });
  }
};

const handleSaveRequest = (thisK, func) => {
  let method = null;
  let url = null;
  if (thisK.state.mode === "modify") {
    method = "put";
    url = thisK.state.urls.modify;
  } else {
    method = "post";
    url = thisK.state.urls.add;
  }
  thisK.setState({ loading: true });
  axios({
    method: method,
    url: url,
    data: getValues(thisK.state.fields),
    headers: getHeaders(thisK),
  })
    .then((res) => {
      fields(thisK.state.fields, "close", false);
      if (func) {
        func(thisK);
      }
      const message = {
        content: selectMessage(res.data.message, thisK.props.lanState),
        type: "success",
      };
      thisK.setState({
        mode: "d_record",
        loading: false,
        message: message,
        recordIndex: null,
      });
      timer(thisK);
    })
    .catch((err) => {
      fields(thisK.state.fields, "open", false);
      if (func) {
        func(thisK);
      }
      let message = null;
      if (err.response) {
        // update the previlliges
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
        if (err.response.data.error) {
          message.content = err.response.data.error;
        }
      }
      thisK.setState({
        loading: false,
        message: message,
        recordIndex: null,
      });
      timer(thisK);
    });
};


export function handleDetailsScreensSave() {
  const [valid, fieldsUpdate] = checkValidity(this);
  const detailsValid = checkDetailsValidity.call(this)
  if (valid && detailsValid) {
    handleDetailsScreensSaveRequest.call(this)
  } else {
    this.setState({ fields: fieldsUpdate });
  }
}

function handleDetailsScreensSaveRequest() {
  const { mode, urls, fields: masterfields, record } = this.state
  let method = null;
  let url = null;
  if (mode === "modify") {
    method = "put";
    url = urls.modify;
  } else {
    method = "post";
    url = urls.add;
  }
  // prepare the body
  let detailsValues = trackDetailsChange.call(this)
  if(mode === "add" && record){ // copy mode..
    // copy all records ...
    console.log("copy mode")
  }
  const fieldsValues = getValues(masterfields)
  const body = {
    ...detailsValues,
    ...fieldsValues
  }
  console.log(body)
  this.setState({ loading: true });
  axios({
    method: method,
    url: url,
    data: body
  })
    .then((res) => {
      fields(masterfields, "close", false);
      const message = {
        content: selectMessage(res.data.message, this.props.lanState),
        type: "success",
      };
      getDetails.call(this, record)
      this.setState({
        mode: "d_record",
        loading: false,
        message: message,
        recordIndex: null,
      });
      timer(this);
    })
    .catch((err) => {
      fields(masterfields, "open", false);
      let message = null;
      if (err.response) {
        // update the previlliges
        if (err.response.status === 401) {
          store.dispatch(logout());
        }
        message = {
          content: selectMessage(
            err.response.data.message,
            this.props.lanState
          ),
          type: "error",
        };
        if (err.response.data.error) {
          message.content = err.response.data.error;
        }
      }
      this.setState({
        loading: false,
        message: message,
        recordIndex: null,
      });
      timer(this);
    });
}


function trackDetailsChange() {
  const { record, details:{tabs} } = this.state;
  const properties = getDtailsPropnams(tabs, true);
  const detailsToSave = {}
  properties.forEach(prop => {
    if(prop){
      const {recordDetailPropName, headers} = prop
      detailsToSave[recordDetailPropName] = {};
      detailsToSave[recordDetailPropName].pages = []
      if(record){
        const pages = record[recordDetailPropName].pages;
        if(pages){
          pages.forEach(page => {
            if(page.action){
              const updatedPage = {}
              headers.forEach(header => {
                updatedPage[header.propName] = page[header.propName]
              })
              updatedPage.action = page.action
              if(page.action !== "delete"){
                detailsToSave[recordDetailPropName].pages.push(updatedPage)
              }else if(page.action === "delete" && !page.frontRow){
                detailsToSave[recordDetailPropName].pages.push(updatedPage)
              }
            }
          })
        }
      }
    }
  })
  return detailsToSave;
}