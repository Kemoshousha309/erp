import React from "react";
import { t } from "../../../../utilities/lang";

const InputPrivsTable = (
  content,
  inputsControl,
  lanTable,
  lanState,
  input_privs,
  mode,
  logged_user_id,
  privChangeHandler
) => {
  const { header, propsName } = content;
  let table = t("no_match", lanTable, lanState);
  if (input_privs.length > 0) {
    table = (
      <div className="table-responsive">
        <table className="table table-bordered table-dark text-center">
          <thead>
            <tr>
              <th scope="col">#</th>
              {header.map((i, index) => (
                <th key={index} scope="col">{t(i, lanTable, lanState)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {input_privs.map((i, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  {propsName.map((propName, indx) => {
                    if (typeof propName === "object") {
                      if (parseInt(lanState) === 1) {
                        return <td key={indx}>{i[propName.d]}</td>;
                      } else {
                        return <td key={indx}>{i[propName.f]}</td>;
                      }
                    } else {
                      if (typeof i[propName] === "boolean") {
                        let disabled = false;
                        let cursor = "pointer";
                        let [control, mess, newCursor] = inputsControl(
                          disabled,
                          i,
                          propName,
                          cursor,
                          lanState,
                          lanTable,
                          logged_user_id
                        );
                        disabled = control;
                        cursor = newCursor;
                        if (mode !== "modify") {
                          disabled = true;
                          cursor = null;
                          mess = null;
                        }
                        return (
                          <td key={indx} >
                            <input
                              title={mess}
                              style={{ cursor: cursor }}
                              disabled={disabled}
                              type="checkbox"
                              onChange={(e) => privChangeHandler(e, i)}
                              checked={i[propName]}
                              id={propName}
                            ></input>
                          </td>
                        );
                      } else {
                        return <td key={indx} >{i[propName]}</td>;
                      }
                    }
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
  return <div className={["text-center"].join(" ")}>{table}</div>;
};

export default InputPrivsTable;
