import { TextField } from "@material-ui/core";
import { CheckBox } from "@material-ui/icons";

export const selectField = (type) => {
  switch (type) {
    case "text":
      return TextField;
    case "checkbox":
      return CheckBox;
    default:
        return TextField;
  }
};
