import {
  createMuiTheme,
  Input,
  TextField,
  ThemeProvider,
} from "@material-ui/core";
import { t } from "../../lang";
import { faPlusCircle, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./style.module.scss";
import { Pagination } from "@material-ui/lab";
import axios from "../../../axios";
import { detialFieldValidity, isValid } from "../validation";

export function tabTable() {
  const {
    state: {
      details: { tabs, current_tab },
      mode,
      record,
    },
    props: { lanState, lanTable },
  } = this;
  const tab = tabs[current_tab];
  const { headers, viewOnly } = tab;

  const theme = createMuiTheme({
    direction: parseInt(lanState) === 1 ? "rtl" : "ltr",
    typography: {
      fontSize: 20,
    },
  });

  const properties = Object.keys(tabs).map(
    (key) => tabs[key].recordDetailPropName
  );
  let details_exist = false;
  if (record) {
    details_exist = properties.reduce(
      (accum, cur) => record[cur] && accum,
      true
    );
  }

  let output = null; // handle later on ....

  if (details_exist || mode === "add") {
    output = (
      <div className={style.container}>
        <div className={style.header}>
          {addIcon.call(this, viewOnly, mode)}
          {/* {paginator.call(this, theme)} */}
        </div>
        <div id="tableContainer" className={style.tableContainer}>
          <table className="table">
            {tableHead(headers, lanTable, lanState)}
            {tableBody.call(this, tab, theme)}
          </table>
        </div>
      </div>
    );
  }
  return output;
}

// UTILITIES =>
function addIcon(viewOnly, mode) {
  if (!viewOnly) {
    if (["add", "modify"].includes(mode)) {
      return (
        <div
          className={style.addIcon}
          onClick={(e) => addHandler.call(this, e)}
        >
          <FontAwesomeIcon icon={faPlusCircle} />
        </div>
      );
    } else {
      return <div></div>;
    }
  } else {
    return <div></div>;
  }
}

function removeIcon(viewOnly, mode, index) {
  if (!viewOnly) {
    if (["add", "modify"].includes(mode)) {
      return (
        <td>
          <div
            className={style.removeIcon}
            onClick={() => removeHandler.call(this, index)}
          >
            <FontAwesomeIcon icon={faTrashAlt} />
          </div>
        </td>
      );
    } else {
      return null;
    }
  } else {
    return null;
  }
}

const tableHead = (headers, lanTable, lanState) => {
  return (
    <thead>
      <tr>
        <th scope="col">#</th>
        {headers.map((i, index) => {
          const { label } = i;
          return (
            <th key={index} scope="col">
              {t(label, lanTable, lanState)}
            </th>
          );
        })}
        <th scope="col"></th>
      </tr>
    </thead>
  );
};

function tableBody(tab, theme) {
  const { current_tab, tabs } = this.state.details;
  const { headers, viewOnly, recordDetailPropName } = tabs[current_tab];
  const {
    state: { mode, record },
  } = this;
  let pages = [];
  if (record) {
    if (record[recordDetailPropName]) {
      pages = record[recordDetailPropName].pages
        ? record[recordDetailPropName].pages
        : [];
    }
  }

  return (
    <tbody>
      {pages.map((page, index) => {
        if (page.action === "delete") {
          return null;
        }
        return (
          <tr key={index}>
            <th scope="row" style={{ verticalAlign: "middle" }}>
              {index + 1}
            </th>
            {headers.map((i, ix) => {
              let { propName, disabled, type, validationRules } = i;
              const [valid, message] = detialFieldValidity(page, propName);
              if (page.action === "add") {
                disabled = false;
              }
              let output = (
                <td key={ix}>
                  {page[propName] === null ? "-" : page[propName]}
                </td>
              );
              if (["modify", "add"].includes(mode) && !viewOnly) {
                output = (
                  <td key={ix}>
                    <ThemeProvider theme={theme}>
                      <TextField
                        error={!valid}
                        helperText={message}
                        type={type}
                        autoComplete="off"
                        disabled={disabled}
                        id={propName}
                        value={page[propName] === null ? "-" : page[propName]}
                        onChange={(event) =>
                          inputChangeHandler.call(
                            this,
                            event,
                            index,
                            page[propName],
                            validationRules
                          )
                        }
                      />
                    </ThemeProvider>
                  </td>
                );
              }
              return output;
            })}
            {removeIcon.call(this, viewOnly, mode, index)}
          </tr>
        );
      })}
    </tbody>
  );
}

// HANDLERS
function inputChangeHandler(event, index, serverValue, validationRules) {
  const {
    target: { value, id },
  } = event;
  const {
    details: { tabs, current_tab },
    record,
    mode,
  } = this.state;

  const row = record[tabs[current_tab].recordDetailPropName].pages[index];
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

function pagHandler(event, value, tabId, master) {
  const { details, record } = this.state;
  const {
    recordDetailPropName,
    pageURL: { temp },
  } = details.tabs[tabId];
  const url = `${temp}/${master}/${value}`;
  this.setState({ loading: true });
  axios
    .get(url)
    .then((res) => {
      record[recordDetailPropName] = res.data;
      this.setState({ details: details, loading: false, record: record });
    })
    .catch((err) => console.log(err));
}

function paginator(theme) {
  const { record, mode, fields } = this.state;
  if (["d_record", "modify"].includes(mode)) {
    const { current_tab, tabs } = this.state.details;
    const { pageURL, recordDetailPropName } = tabs[current_tab];
    const recordDetail = record[recordDetailPropName];
    const master = fields[pageURL.master].value;
    let page_no = 1;
    let pages_count = 1;
    if (recordDetail.pages) {
      page_no = recordDetail.page_no;
      pages_count = recordDetail.pages_count;
    }
    return (
      <div className={style.pagContainer}>
        <ThemeProvider theme={theme}>
          <Pagination
            onChange={(e, v) =>
              pagHandler.call(this, e, v, current_tab, master)
            }
            count={pages_count}
            page={page_no}
            color="primary"
          />
        </ThemeProvider>
      </div>
    );
  }
}

function addHandler() {
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
    record[tabs[current_tab].recordDetailPropName] = {};
    record[tabs[current_tab].recordDetailPropName].pages = [row];
  } else if (!record[tabs[current_tab].recordDetailPropName].pages) {
    record[tabs[current_tab].recordDetailPropName].pages = [row];
  } else {
    record[tabs[current_tab].recordDetailPropName].pages.unshift(row);
  }
  document.getElementById("tableContainer").scrollTo({
    top: 0,
    behavior: "smooth",
  });
  this.setState({ record: record });
}

function removeHandler(index) {
  const {
    record,
    details: { current_tab, tabs },
  } = this.state;
  const row = record[tabs[current_tab].recordDetailPropName].pages[index];
  if (row.action) {
    row.prevAction = row.action;
  }
  row.action = "delete";
  // record[tabs[current_tab].recordDetailPropName].pages.splice(index, 1);
  this.setState({ record: record });
}
