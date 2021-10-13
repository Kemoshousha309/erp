import { fields } from "../fields";
import { preHanler } from "./add";


// modify hanle *******************************
export const handleModify = (thisK, updateState) => {
  const {
    fields: fieldsClone,
    preModify,
    pks,
  } = thisK.state;
  // handle modify fields
  fields(fieldsClone, "open", false);
  fields(fieldsClone, "close", false, pks);
  thisK.setState({ mode: "modify", ...updateState });

  // handle preAdd
  if (preModify) {
    preHanler.call(thisK, "Modify");
  }
};
