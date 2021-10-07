import { fields } from "./fields";
import { getDtailsPropnams } from "./utilities";

// undo handle ******************************
export const handleUndo = (thisK) => {
  switch (thisK.state.mode) {
    case "modify":
      fields(thisK.state.fields, "close", false);
      thisK.setState({ mode: "d_record" });
      break;
    case "copy":
      fields(thisK.state.fields, "close", false);
      thisK.setState({ mode: "d_record" });
      break;
    default:
      // undo to start mode
      fields(thisK.state.fields, "close");
      thisK.setState({ mode: "start", record: null });
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
      const pages = record[prop].pages;
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
