import { fields } from "../fields";
import { preHanler } from "./add";


// modify hanle *******************************
export const handleModify = (thisK, updateState) => {
  const {
    fields: fieldsClone,
    preModify,
    pks,
    specialFields
  } = thisK.state;
  // handle modify fields
  fields(fieldsClone, "open", false);
  fields(fieldsClone, "close", false, pks);
  if (specialFields) {
    specialFields.forEach((f) => {
      if (f.modify) {
        const specific = [f.key];
        fields(fieldsClone, f.modify, false, specific);
      }
    });
  }
  thisK.setState({ mode: "modify", ...updateState });

  // handle preAdd
  if (preModify) {
    preHanler.call(thisK, "Modify");
  }
};
