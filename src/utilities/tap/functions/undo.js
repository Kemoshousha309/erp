import { fields } from "../fields";
import { getDtailsPropnams } from "../utilities";

// undo handle ******************************
export const handleUndo = (thisK) => {
  const { fields: fieldsClone, mode, preModify, preAdd } = thisK.state;
  switch (mode) {
    case "modify":
      fields(fieldsClone, "close", false);
      if (preModify || preAdd) {
        thisK.setState({
          mode: "d_record",
          preModify: { ...preModify, content: null },
          preAdd: { ...preAdd, content: null },
        });
      } else {
        thisK.setState({ mode: "d_record" });
      }
      break;
    case "copy":
      fields(fieldsClone, "close", false);
      if (preModify || preAdd) {
        thisK.setState({
          mode: "d_record",
          preModify: { ...preModify, content: null },
          preAdd: { ...preAdd, content: null },
        });
      } else {
        thisK.setState({ mode: "d_record" });
      }
      break;
    default:
      // undo to start mode
      fields(fieldsClone, "close");
      if (preModify || preAdd) {
        thisK.setState({
          mode: "start",
          record: null,
          preModify: { ...preModify, content: null },
          preAdd: { ...preAdd, content: null },
        });
      } else {
        thisK.setState({ mode: "start", record: null });
      }
      break;
  }
};

export function handleDetailsScreensUndo() {
  const {
    record,
    details: { tabs },
  } = this.state;
  const properties = getDtailsPropnams(tabs);
  properties.forEach((prop) => {
    if (prop && record) {
      const pages = record[prop];
      let index = 0;
      if (pages) {
        while (index < pages.length) {
          const row = pages[index];
          if (row.frontRow) {
            pages.splice(index, 1);
          } else {
            if (row.serverValue) {
              row.value = row.serverValue;
            }
            delete row.action;
            delete row.serverValue;
            index++;
          }
        }
      }
    }
  });
  handleUndo(this);
}
