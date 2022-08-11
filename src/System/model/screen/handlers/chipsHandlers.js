import _ from "lodash";
import { t } from "../../../../Languages/languages";
import { timer } from "./utilities";


// Chips handling ********************************************
export function handleChipsRemove(id, index) {
  const {
    state: { fields },
  } = this;
  const fieldsUpdate = _.cloneDeep(fields);
  fieldsUpdate[id].value.splice(index, 1);
  if (
    fieldsUpdate[id].value.length === 0 &&
    fieldsUpdate[id].validation.required
  ) {
    fieldsUpdate[id].validity.valid = false;
    fieldsUpdate[id].validity.message = t("required_field");
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
      content: t("item_exist"),
      type: "error",
    };
    this.setState({ chipsListShow: null, message });
    timer().then((res) => this.setState({ message: false }));
  }
}
