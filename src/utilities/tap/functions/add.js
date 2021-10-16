import { fields, setDefaultValues, setReadOnlyFields } from "../fields";
import axios from "../../../axios";

// add handle ******************************
export const handleAdd = (thisK) => {
  const { fields: fieldsClone, specialFields, pks, preAdd } = thisK.state;
  fields(fieldsClone, "open");
  if (specialFields) {
    specialFields.forEach((f) => {
      if (f.add) {
        const specific = [f.key];
        fields(fieldsClone, f.add, true, specific);
      }
    });
  }
  // apply auto increment primary key
  const pkPropName = pks[0];
  if (fieldsClone[pkPropName].autoIncrement) {
    axios
      .get(`${fieldsClone[pkPropName].autoIncrement}`)
      .then((res) => {
        fieldsClone[pkPropName].value = res.data.next_PK;
        thisK.setState({ fields: fieldsClone });
      })
      .catch((err) => console.log(err));
  }

  // preAdd handle
  if (preAdd) {
    preHanler.call(thisK, "Add");
  }

  thisK.setState({ mode: "add", fields: fieldsClone, record: null });
};

export function preHanler(type) {
  // type => Modify | Add
  const pre = `pre${type}`;
  let {
    urls: { [pre]: preUrl },
    [pre]: preAction,
    fields,
  } = this.state;

  axios
    .get(preUrl)
    .then((res) => {
      preAction.content = res.data;
      // set default values ... (would be added later)
      fields = setDefaultValues(fields, preAction.content.default_values);

      // set readOnly fields
      if (preAction.content.read_only.length > 0) {
        fields = setReadOnlyFields(preAction.content.read_only, fields);
      }
      this.setState({ [pre]: preAction, fields: fields });
    })
    .catch((err) => console.log(err));
}
