import React from "react";
import { t } from "../../../../../utilities/lang";

const InputPrivsTable = (thisK, content, inputsControl) => {
  const {
    state: { input_privs, mode },
    props: { lanState, lanTable },
    privChangeHandler
  } = thisK;
  const { header, propsName } = content;
  let table = t("no_match", lanTable, lanState);
  if (input_privs.length > 0) {
    table = (
      <div className="table-responsive">
        <table className="table table-bordered table-dark text-center">
          <thead>
            <tr>
              <th scope="col">#</th>
              {header.map((i) => (
                <th scope="col">{t(i, lanTable, lanState)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {input_privs.map((i, index) => {
              return (
                <tr>
                  <th scope="row">{index + 1}</th>
                  {propsName.map((propName) => {
                    if (typeof propName === "object") {
                      if (parseInt(lanState) === 1) {
                        return <td>{i[propName.d]}</td>;
                      } else {
                        return <td>{i[propName.f]}</td>;
                      }
                    } else {
                      if (typeof i[propName] === "boolean") {
                        let disabled = false
                        let cursor = "pointer"
                        const [control, mess, newCursor] = inputsControl(disabled, i, propName, cursor, lanState, lanTable)
                        disabled = control
                        cursor = newCursor
                        if(mode !== "modify"){
                          disabled = true
                          cursor = null
                        }
                        return (
                          <td>
                            <input
                              title={mess}
                              style={{cursor: cursor}}
                              disabled={disabled}
                              type="checkbox"
                              onChange={(e) => privChangeHandler(e, i)}
                              checked={i[propName]}
                              id={propName}
                            ></input>
                          </td>
                        );
                      } else {
                        return <td>{i[propName]}</td>;
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
  return (
    <div className={["text-center"].join(" ")}>{table}</div>
  );
};

export default InputPrivsTable;
