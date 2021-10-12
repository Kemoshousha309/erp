import { fields } from "../fields";
import { preHanler } from "./add";


// modify hanle *******************************
export const handleModify = (thisK) => {
  const {
    fields: fieldsClone,
    preModify,
    pks,
  } = thisK.state;
  // handle modify fields
  fields(fieldsClone, "open", false);
  fields(fieldsClone, "close", false, pks);
  thisK.setState({ mode: "modify" });

  // handle preAdd
  if (preModify) {
    preHanler.call(thisK, "Modify");
  }
};
