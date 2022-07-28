import {
  handleFields,
} from "../fields";
import axios from "../../../../axios";
import { FuncConstructor } from "./funcConstructor";
import { updateMode } from "../mode";

// add handle ******************************

export class Adder extends FuncConstructor {

  localHandle() {
    const { fields, specialFields} = this.screen.state;
    let fieldsUpdate = handleFields(fields, "open");
    if (specialFields) {
      specialFields.forEach((f) => {
        if (f.add) {
          const specific = [f.key];
          fieldsUpdate = handleFields(fieldsUpdate, f.add, true, specific);
        }
      });
    }
    return fieldsUpdate;
  }

  asyncHandle(fieldsUpdate) {
    const { pks, preAdd } = this.screen.state;
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
      axios
        .get(`${fieldsUpdate[pkPropName].autoIncrement}`)
        .then((res) => {
          fieldsUpdate[pkPropName].value = res.data.next_PK;
          resolve(fieldsUpdate);
        })
        .catch((err) => {
          console.log(err.response);
        });
    });
  }
}


export async function handleAddModel() {
  const fieldsUpdate = this.addHandler.localHandle();
  const {tools} = updateMode("add", this.state, this.props)
    this.setState({ mode: "add", fields: fieldsUpdate, record: null, tools });
    const { preData, fieldsUpdate: changedFields } =
      await this.addHandler.asyncHandle(fieldsUpdate);
    this.setState((state) => {
      const preAdd = state.preAdd;
      if (!preAdd) return { mode: "add", fields: changedFields, record: null };
      preAdd.content = preData;
      return { mode: "add", fields: changedFields, record: null, preAdd, tools };
    });
}
