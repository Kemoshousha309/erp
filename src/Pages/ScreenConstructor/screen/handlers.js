import { timer, toolsPriv } from './utilities';
import { handleMode } from './mode';
import { t } from '../../../Helpers/lang';
import { getParam } from '../../../Helpers/utilities';

// input change handler ******************************
export const handleInputChange = (thisK, state, identifier) => {
  const fields = { ...thisK.state.fields };
  if (!fields[identifier].readOnly) {
    fields[identifier].value = state.value;
  }
  if (fields[identifier].validity) {
    fields[identifier].validity.valid = state.valid;
    fields[identifier].validity.message = state.invalidFeedBack;
  }
  thisK.setState({ fields });
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
  fields[id].value.splice(index, 1);
  if (fields[id].value.length === 0 && fields[id].validation.requiered) {
    fields[id].validity.valid = false;
    fields[id].validity.message = t('required_field', lanTable, lanState);
  }
  this.setState({ fields });
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
