import { getDetails } from "../Details/requestDetails";
import { fillRecord, handleFields } from "../fields";
import { updateMode } from "../mode";
import { FuncConstructor } from "./funcConstructor";

export class List extends FuncConstructor {
  open() {
    const currentMode = this.screen.state.mode;
    const listShow = true;
    const mode = "list";
    return { currentMode, listShow, mode };
  }

  close() {
    const listShow = !this.screen.state.listShow;
    /**get the prev mode to update the current mode */
    const prevMode = this.screen.state.prevMode;
    return { listShow, prevMode };
  }

  recordClick(record) {
    const { fields } = this.screen.state;
    let fieldsUpdate = fillRecord(fields, record);
    fieldsUpdate = handleFields(fieldsUpdate, "close", false);
    this.#checkNullName(record, fieldsUpdate);
    return fieldsUpdate;
  }

  #checkNullName(record, fieldsUpdate) {
    const { fks } = this.screen.state;
    if (fks) {
      fks.forEach((fk) => {
        const fkField = fieldsUpdate[fk];
        if (fkField.readOnlyField) {
          if (!record[fkField.readOnlyField]) {
            const propertyName = `${extractName(fkField.readOnlyField)}_d_name`;
            if (record[propertyName] === null) {
              fieldsUpdate[fkField.readOnlyField].value = "";
            } else {
              fieldsUpdate[fkField.readOnlyField].value = record[propertyName];
            }
          }
        }
      });
    }
    return fieldsUpdate;
  }
}

export const extractName = (propName) => {
  // get the property name after remove d_name or f_name
  let newName = propName.replace("_d_name", "");
  newName = newName.replace("_f_name", "");
  return newName;
};

export async function handleRecordClickModel(record, i) {
  const fields = this.listHandler.recordClick(record);
  const { tools } = updateMode("d_record", this.state, this.props);
  const {details} = this.state;
  if(details) {
    this.setState({
      listShow: false,
      mode: "d_record",
      recordIndex: i,
      record,
      fields,
      tools,
      details: { ...this.state.details, loading: true },
    });
    const recordWithDtl = await getDetails(record, this);
    return this.setState({
      record: recordWithDtl,
      details: { ...this.state.details, loading: false },
    });
  }
  this.setState({
    listShow: false,
    mode: "d_record",
    recordIndex: i,
    record,
    fields,
    tools,
  });
}
