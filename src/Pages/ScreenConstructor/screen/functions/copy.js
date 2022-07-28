import { handleFields } from "../fields";
import axois from "../../../../axios";
import { FuncConstructor } from "./funcConstructor";
import { updateMode } from "../mode";

// copy handle ******************************

export class Copyer extends FuncConstructor {

  localHandle() {
    const { fields } = this.screen.state;
    return handleFields(fields, "open", false);
  }

  asyncHandle(fieldsUpdate) {
    const { preAdd, pks } = this.screen.state;
    return new Promise((resolve, reject) => {
      const pkPropName = pks[0];
      if (fieldsUpdate[pkPropName].autoIncrement) {
        // apply auto increment primary key
        this.autoIncrementHandle(fieldsUpdate, pks)
          .then((fieldsUpdate) => resolve({ preData: null, fieldsUpdate }))
          .catch((err) => console.log(err));
      } else if (preAdd) {
        this.preHanler("Add", fieldsUpdate)
          .then(({ data, fieldsUpdate }) =>
            resolve({ preData: data, fieldsUpdate })
          )
          .catch((err) => console.log(err));
      }
    });
  }

  autoIncrementHandle(fieldsUpdate, pks) {
    return new Promise((resolve, reject) => {
      const pkPropName = pks[0];
      const autoIncrementValue = fieldsUpdate[pkPropName].autoIncrementValue
        ? fieldsUpdate[pkPropName].autoIncrementValue
        : "";
      axois
        .get(`${fieldsUpdate[pkPropName].autoIncrement + autoIncrementValue}`)
        .then((res) => {
          fieldsUpdate[pkPropName].value = res.data.next_PK
            ? res.data.next_PK
            : "";
          resolve(fieldsUpdate);
        })
        .catch((err) => console.log(err));
    });
  }
}


export async function handleCopyModel() {
  const fieldsUpdate = this.copyHandler.localHandle();
  const {tools} = updateMode("copy", this.state, this.props)
  this.setState({ mode: "copy", fields: fieldsUpdate, tools });
  const { preData, fieldsUpdate: changedFields } =
    await this.copyHandler.asyncHandle(fieldsUpdate);
  this.setState((state) => {
    const preAdd = state.preAdd;
    if (!preAdd) return { mode: "copy", fields: changedFields, tools };
    preAdd.content = preData;
    return { mode: "copy", fields: changedFields, preAdd, tools };
  });
}
