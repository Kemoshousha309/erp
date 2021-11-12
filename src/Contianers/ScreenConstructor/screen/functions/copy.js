import { fields } from "../fields";
import axois from "../../../../axios";
import { preHanler } from "../functions/add";

// copy handle ******************************
export function handleCopy() {
  const { fields: fieldsClone, preAdd, pks } = this.state;
  fields(this.state.fields, "open", false);
  this.setState({ mode: "copy" });

  // apply auto increment primary key
  const pkPropName = pks[0];
  if (fieldsClone[pkPropName].autoIncrement) {
    const autoIncrementValue = fieldsClone[pkPropName].autoIncrementValue
      ? fieldsClone[pkPropName].autoIncrementValue
      : "";
    axois
      .get(`${fieldsClone[pkPropName].autoIncrement+fieldsClone[autoIncrementValue].value}`)
      .then((res) => {
        fieldsClone[pkPropName].value = res.data.next_PK ? res.data.next_PK : '';
        this.setState({ fields: fieldsClone });
      })
      .catch((err) => console.log(err));
  }
  if (preAdd) {
    preHanler.call(this, "Add");
  }
}
