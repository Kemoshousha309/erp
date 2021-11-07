import { decideName, t } from "../../../../utilities/lang";
import { selectField } from "./detailFields";
import { detialFieldValidity } from "../validation";
import { formatDate } from "../../../../utilities/date";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import style from "./style.module.scss";
import axios from "../../../../axios";

// UTILITIES =>
export function addIcon(viewOnly, mode, addHandler) {
  if (!viewOnly) {
    if (["add", "modify"].includes(mode)) {
      return (
        <button className={style.addIcon} onClick={(e) => addHandler(e)}>
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

function removeIcon(viewOnly, mode, index, removeHandler) {
  if (!viewOnly) {
    if (["add", "modify"].includes(mode)) {
      return (
        <td>
          <button
            className={style.removeIcon}
            onClick={(e) => removeHandler(index, e)}
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

export const tableHead = (headers, lanTable, lanState) => {
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

export function tableBody(
  tab,
  theme,
  tabs,
  current_tab,
  record,
  lanState,
  mode,
  removeHandler,
  inputChangeHandler
) {
  const { headers, viewOnly, recordDetailPropName } = tabs[current_tab];
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
                          inputChangeHandler(
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
              {removeIcon(viewOnly, mode, index, removeHandler)}
            </tr>
          );
          hashIndex++;
          return returnedValue;
        }
      })}
    </tbody>
  );
}

export function getDetails(record, i) {
  const {
    details: { tabs },
    details,
  } = this.state;
  const detailsPagesURLs = Object.keys(tabs).map((key) => {
    tabs[key].pageURL.id = key;
    return tabs[key].pageURL;
  });
  detailsPagesURLs.forEach((pageURL) => {
    const { master, temp, id } = pageURL;
    const url = `${temp}/${record[master]}`;
    console.log(url);
    this.setState({ details: { ...details, loading: true } });
    axios
      .get(url)
      .then((res) => {
        record[tabs[id].recordDetailPropName] =
          res.data[tabs[id].recordDetailPropName];
        this.setState({
          record: record,
          details: { ...details, loading: false },
        });
      })
      .catch((err) => console.log(err));
  });
}