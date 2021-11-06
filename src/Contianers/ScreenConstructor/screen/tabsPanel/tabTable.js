import { CircularProgress, createTheme } from "@material-ui/core";

import { faPlusCircle, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./style.module.scss";
import { detialFieldValidity } from "../validation";
import { addHandler, inputChangeHandler, removeHandler } from "./handlers";
import { formatDate } from "../../../../utilities/date";
import { decideName, t } from "../../../../utilities/lang";
import { selectField } from "./detailFields";

export function tabTable() {
  const {
    state: {
      details: { tabs, current_tab, loading },
      mode,
      record,
    },
    props: { lanState, lanTable },
  } = this;
  const tab = tabs[current_tab];
  const { headers, viewOnly } = tab;

  const theme = createTheme({
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

  let output = null;

  output = loading ? (
    <div className={style.loaderContainer}>
      <CircularProgress />
    </div>
  ) : null;

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
        <button
          className={style.addIcon}
          onClick={(e) => addHandler.call(this, e)}
        >
          <FontAwesomeIcon icon={faPlusCircle} />
        </button>
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
          <button
            className={style.removeIcon}
            onClick={(e) => removeHandler.call(this, index, e)}
          >
            <FontAwesomeIcon icon={faTrashAlt} />
          </button>
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
    props: { lanState },
  } = this;
  let pages = [];
  if (record) {
    if (record[recordDetailPropName]) {
      pages = record[recordDetailPropName];
    }
  }

  let hashIndex = 1;
  return (
    <tbody>
      {pages.map((page, index) => {
        if (page.action === "delete") {
          return null;
        } else {
          const returnedValue = (
            <tr key={index}>
              <th scope="row" style={{ verticalAlign: "middle" }}>
                {hashIndex}
              </th>
              {headers.map((i, ix) => {
                let {
                  propName,
                  disabled,
                  type,
                  validationRules,
                  changeOnLang,
                } = i;

                const Field = selectField(type);
                const [valid, message] = detialFieldValidity(page, propName);
                if (page.action === "add") {
                  disabled = false;
                }
                if (changeOnLang) {
                  propName = decideName(propName, lanState);
                }
                let value = page[propName] === null ? "-" : page[propName];
                if (type === "date") {
                  value = formatDate(value, 12);
                }
                let output = <td key={ix}>{value}</td>;
                if (["modify", "add"].includes(mode) && !viewOnly) {
                  output = (
                    <td key={ix}>
                      <Field
                        error={!valid}
                        helperText={message}
                        type={type}
                        autoComplete="off"
                        disabled={disabled}
                        id={propName}
                        value={value}
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
                    </td>
                  );
                }
                return output;
              })}
              {removeIcon.call(this, viewOnly, mode, index)}
            </tr>
          );
          hashIndex++;
          return returnedValue;
        }
      })}
    </tbody>
  );
}
