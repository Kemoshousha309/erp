import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Field } from './detailFields';
import { detailFieldValidity } from '../../../../Validation/validation';
import style from './style.module.scss';
import { formatDate } from '../../../../Helpers/date';
import { decideName, t } from '../../../../Languages/languages';

// UTILITIES =>
export function addIcon(viewOnly, mode, addHandler, state) {
  // this function render the add button and indicate its status based on the addState,
  // mode, and viewOnly properties from the screen state
  // NOTE => addState should be the only property to decide its state but this is a (design problem)

  if (typeof state === 'boolean' && !state) return <div />;
  // if true this means that state will control the render otherwise the rest of properties will

  if (!viewOnly) {
    if (['add', 'modify', 'copy'].includes(mode)) {
      return (
        <button className={style.addIcon} onClick={(e) => addHandler(e)}>
          <FontAwesomeIcon icon={faPlusCircle} />
        </button>
      );
    }
    return <div />;
  }
  return <div />;
}

export const tableHead = (headers) => {
  headers = Object.values(headers);
  return (
    <thead>
      <tr>
        <th scope="col">#</th>
        {headers.map((i, index) => {
          const { label } = i;
          return (
            <th key={index} scope="col">
              {t(label)}
            </th>
          );
        })}
        <th scope="col" />
      </tr>
    </thead>
  );
};

export function tableBody(
  detailsType,
  tabs,
  current_tab,
  record,
  lanState,
  mode,
  removeHandler,
  inputChangeHandler,
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
        if (page.action === 'delete') {
          return null;
        }
        const returnedValue = (
          <tr data-rowindex={index} key={index}>
            <th scope="row" style={{ verticalAlign: 'middle' }}>
              {hashIndex}
            </th>
            {Object.values(headers).map((i, ix) => {
              let {
                propName,
                disabled,
                type,
                validationRules,
                changeOnLang,
              } = i;

              const [valid, message] = detailFieldValidity(page, propName);
              if (page.action === 'add' && detailsType === 'PRIMARY') {
                disabled = false;
              }
              if (changeOnLang) {
                propName = decideName(propName);
              }
              let value = page[propName] === null || page[propName] === undefined ? '-' : page[propName];
              if (type === 'date') {
                value = formatDate(value, 12);
              }
              let output = <td key={ix}>{value.toString()}</td>;
              if (['modify', 'add', 'copy'].includes(mode) && !viewOnly) {
                output = (
                  <td key={ix}>
                    {Field(
                      valid,
                      message,
                      type,
                      disabled,
                      propName,
                      value,
                      inputChangeHandler,
                      index,
                      page,
                      validationRules,
                    )}
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
      })}
    </tbody>
  );
}

function removeIcon(viewOnly, mode, index, removeHandler) {
  if (!viewOnly) {
    if (['add', 'modify', 'copy'].includes(mode)) {
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
    }
    return null;
  }
  return null;
}
