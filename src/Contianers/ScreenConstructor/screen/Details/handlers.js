import { isValid } from "../validation";

// HANDLERS
export function detailsInputChangeHandler(event, index, serverValue, validationRules) {
  let {
    target: { value, id, checked },
  } = event;
  if(event.target.hasOwnProperty("checked")){
    value = checked
  }
  const {
    details: { tabs, current_tab }, 
    record,
    mode,
  } = this.state;

  const row = record[tabs[current_tab].recordDetailPropName][index];
  const [valid, message] = isValid(value, validationRules, this);
  row[`${id}#validity`] = {
    valid: valid,
    message: message,
  };
  if (!row.serverValue && !row.frontRow) {
    row.serverValue = serverValue;
  }
  row[id] = value;
  if (mode === "modify" && !row.action) {
    row.action = "update";
  }
  this.setState({ record: record });
}

export function tabsChangeHandler(value) {
  const {
    state: { details },
  } = this;
  details.current_tab = value;
  this.setState({ details: details });
}




// ADD HANDLERS
export function addHandler(e) {
  switch (this.state.details.type) {
    case "PRIMARY":
      primaryAddHandler.call(this, e)
      break;
      case "FOREIGN":
        foreignAddHandler.call(this, e)
        break;
    default:
      break;
  }
}

function primaryAddHandler(e) {
  e.preventDefault();
  let {
    record,
    details: { current_tab, tabs },
  } = this.state;
  const row = {
    action: "add",
    frontRow: true,
  };
  tabs[current_tab].headers.forEach((i) => {
    let propName;
    typeof i === "object" ? (propName = i.propName) : (propName = i);
    row[propName] = "";
  });
  if (!record) {
    record = {};
    record[tabs[current_tab].recordDetailPropName] = [row];
  } else if (!record[tabs[current_tab].recordDetailPropName]) {
    record[tabs[current_tab].recordDetailPropName] = [row];
  } else {
    record[tabs[current_tab].recordDetailPropName].unshift(row);
  }
  document.getElementById("tableContainer").scrollTo({
    top: 0,
    behavior: "smooth",
  });
  this.setState({ record: record });
}


function foreignAddHandler(e) {
  const { details } = this.state
  this.setState({detailsForeignList: details.current_tab})
}


// REOMVE HANDLERS
export function removeHandler(index, e) {
  e.preventDefault();
  const {
    record,
    details: { current_tab, tabs },
  } = this.state;
  const row = record[tabs[current_tab].recordDetailPropName][index];
  if (row.action) {
    row.prevAction = row.action;
  }
  row.action = "delete";
  this.setState({ record: record });
}


