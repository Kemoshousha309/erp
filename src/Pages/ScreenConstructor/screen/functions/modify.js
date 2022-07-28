import { handleFields } from "../fields";
import { updateMode } from "../mode";
import { FuncConstructor } from "./funcConstructor";

// modify hanle *******************************

export class Modifier extends FuncConstructor {
  localHandle() {
    const { fields, pks, specialFields } = this.screen.state;
    // handle modify fields
    let fieldsUpdate = handleFields(fields, "open", false);
    fieldsUpdate = handleFields(fieldsUpdate, "close", false, pks);
    if (specialFields) {
      specialFields.forEach((f) => {
        if (f.modify) {
          const specific = [f.key];
          fieldsUpdate = handleFields(fieldsUpdate, f.modify, false, specific);
        }
      });
    }
    return fieldsUpdate;
  }

  asyncHandle(fieldsUpdate) {
    const { preModify } = this.screen.state;
    if (!preModify) return null;
    return new Promise((resolve, reject) => {
      this.preHanler("Modify", fieldsUpdate)
        .then(({ data, fieldsUpdate }) =>
          resolve({ preData: data, fieldsUpdate })
        )
        .catch((err) => console.log(err));
    });
  }
}

export async function handleModifyModel() {
  const fieldsUpdate = this.modifyHandler.localHandle();
  const {tools} = updateMode("modify", this.state, this.props)
  this.setState({ mode: "modify", fields: fieldsUpdate, tools });
  const res = await this.modifyHandler.asyncHandle(fieldsUpdate);
  if (!res) return;
  const { preData, fieldsUpdate: changedFields } = res;
  this.setState((state) => {
    const preModify = state.preModify;
    preModify.content = preData;
    return { mode: "modify", fields: changedFields, preModify, tools };
  });
}
