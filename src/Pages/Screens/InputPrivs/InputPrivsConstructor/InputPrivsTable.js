import React from 'react';
import { t } from '../../../../Languages/languages';
import style from './InputPrivs.module.scss';

function InputPrivsTable(
  content,
  inputsControl,
  lanTable,
  lanState,
  input_privs,
  mode,
  logged_user_id,
  privChangeHandler,
  privControlIpnputHandler,
) {
  const { header, propsName } = content;
  let table = t('no_match');
  const controlInputclasses = [style.privControlInput];
  if (mode !== 'modify') {
    controlInputclasses.push(style.hidden);
  }
  if (input_privs.length > 0) {
    table = (
      <div className="table-responsive">
        <table className="table table-bordered table-dark text-center">
          <thead>
            <tr>
              <th scope="col">
                <div className={style.privControlContainer}>
                  <span>#</span>
                  <input
                    className={controlInputclasses.join(' ')}
                    type="checkbox"
                    onChange={(e) => privControlIpnputHandler(e, 'ALL')}
                  />
                </div>
              </th>
              {header.map((i, index) => {
                let label = i;
                let control = null;
                if (typeof i === 'object') {
                  label = i.label;
                  control = i.control;
                }
                let controlInput = null;
                if (control) {
                  controlInput = (
                    <input
                      className={controlInputclasses.join(' ')}
                      type="checkbox"
                      onChange={(e) => privControlIpnputHandler(e, 'COLUMN', control)}
                    />
                  );
                }
                return (
                  <th key={index} scope="col">
                    <div className={style.privControlContainer}>
                      <span>{t(label)}</span>
                      {controlInput}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {input_privs.map((i, index) => (
              <tr key={index}>
                <th scope="row">
                  <div className={style.privControlContainer}>
                    <span>{index + 1}</span>
                    <input
                      className={controlInputclasses.join(' ')}
                      type="checkbox"
                      onChange={(e) => privControlIpnputHandler(e, 'ROW', index)}
                    />
                  </div>
                </th>
                {propsName.map((propName, indx) => {
                  if (typeof propName === 'object') {
                    if (parseInt(lanState) === 1) {
                      return <td key={indx}>{i[propName.d]}</td>;
                    }
                    return <td key={indx}>{i[propName.f]}</td>;
                  }
                  if (typeof i[propName] === 'boolean') {
                    let disabled = false;
                    let cursor = 'pointer';
                    let [control, mess, newCursor] = inputsControl(
                      disabled,
                      i,
                      propName,
                      cursor,
                      lanState,
                      lanTable,
                      logged_user_id,
                    );
                    disabled = control;
                    cursor = newCursor;
                    if (mode !== 'modify') {
                      disabled = true;
                      cursor = null;
                      mess = null;
                    }
                    return (
                      <td key={indx}>
                        <input
                          title={mess}
                          style={{ cursor }}
                          disabled={disabled}
                          type="checkbox"
                          onChange={(e) => privChangeHandler(e, i)}
                          checked={i[propName]}
                          id={propName}
                        />
                      </td>
                    );
                  }
                  return <td key={indx}>{i[propName]}</td>;
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  return <div className={['text-center'].join(' ')}>{table}</div>;
}

export default InputPrivsTable;
