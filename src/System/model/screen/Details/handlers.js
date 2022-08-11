import _ from 'lodash';
import { isValid } from '../../../../Validation/validation';

// HANDLERS
export function detailsInputChangeHandler(event, index, serverValue, validationRules) {
  let {
    target: { value, id, checked },
  } = event;
  if (event.target.hasOwnProperty('checked')) {
    value = checked;
  }
  const {
    details: { tabs, current_tab },
    record,
    mode,
  } = this.state;

  const recordClone = _.cloneDeep(record);

  const row = recordClone[tabs[current_tab].recordDetailPropName][index];
  const [valid, message] = isValid(value, validationRules, this);
  row[`${id}#validity`] = {
    valid,
    message,
  };
  if (!row.serverValue && !row.frontRow) {
    row.serverValue = serverValue;
  }
  row[id] = value;
  if (mode === 'modify' && !row.action) {
    row.action = 'update';
  }
  return recordClone;
}


