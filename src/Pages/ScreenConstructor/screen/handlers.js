import { timer, toolsPriv } from './utilities';
import { handleMode } from './mode';
import { t } from '../../../Helpers/lang';
import { getParam } from '../../../Helpers/utilities';
import _ from 'lodash';

// input change handler ******************************
export const handleInputChange = (thisK, state, identifier) => {
  const fieldsUpdate = _.cloneDeep(thisK.state.fields);
  if (!fieldsUpdate[identifier].readOnly) {
    fieldsUpdate[identifier].value = state.value;
  }
  if (fieldsUpdate[identifier].validity) {
    fieldsUpdate[identifier].validity.valid = state.valid;
    fieldsUpdate[identifier].validity.message = state.invalidFeedBack;
  }
  thisK.setState({ fields: fieldsUpdate });
};

// shortcuts list close Handler **************************
export const handleCloseShortCuts = (thisK) => {
  const currentState = thisK.state.ShortCutsList;
  thisK.setState({ ShortCutsList: !currentState });
};

// drived state Handler ***************************************
export const handleDrivedState = (props, state) => {
  let tools = handleMode(
    state.mode,
    props.lanState,
    props.languages,
    state.tapTools,
    props.changeLangSelectAcivity,
  );
  const formPrivs = props.forms_privs_hash[getParam(props.location.search, 'no')];
  tools = toolsPriv(formPrivs, tools);
  return { tools };
};

// Chips handling ********************************************
export function handleChipsRemove(id, index) {
  const {
    state: { fields },
    props: { lanTable, lanState },
  } = this;
  const fieldsUpdate = _.cloneDeep(fields)
  fieldsUpdate[id].value.splice(index, 1);
  if (fieldsUpdate[id].value.length === 0 && fieldsUpdate[id].validation.requiered) {
    fieldsUpdate[id].validity.valid = false;
    fieldsUpdate[id].validity.message = t('required_field', lanTable, lanState);
  }
  this.setState({ fields: fieldsUpdate });
}

export function handleChipsAdd(id) {
  const { fields } = this.state;
  if (fields[id].writability) {
    this.setState({ chipsListShow: id });
  }
}

export function handleChipsListClose() {
  this.setState({ chipsListShow: null });
}

export function handleChipsRecordClick(record) {
  const { chipsListShow, fields } = this.state;
  const handler = fields[chipsListShow].recordClickHandler;
  handler(record);
}

export function chipsRecordClickHandler(record, propName) {
  const {
    state: { fields, chipsListShow },
    props: { lanState, lanTable },
  } = this;
  const chipsField = fields[chipsListShow];
  let present = false;
  chipsField.value.forEach((i) => {
    if (i === record[propName]) {
      present = true;
    }
  });
  if (!present) {
    chipsField.value.push(record[propName]);
    chipsField.validity = { valid: true, touched: true, message: null };
    this.setState({ chipsListShow: null, fields });
  } else {
    const message = {
      content: t('item_exist', lanTable, lanState),
      type: 'error',
    };
    this.setState({ chipsListShow: null, message });
    timer(this);
  }
}