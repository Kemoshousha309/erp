import { fields } from "../fields";
import { getDtailsPropnams } from "../utilities";

// undo handle ******************************
export class UndoHandler {
  constructor(screen) {
    this.screen = screen;
  }

  handleUndo = () => {
    const { fields: fieldsClone, mode, preModify, preAdd } = this.screen.state;
    switch (mode) {
      case "modify":
        fields(fieldsClone, "close", false);
        if (preModify || preAdd) {
          this.screen.setState({
            mode: "d_record",
            preModify: { ...preModify, content: null },
            preAdd: { ...preAdd, content: null },
          });
        } else {
          this.screen.setState({ mode: "d_record" });
        }
        break;
      case "copy":
        fields(fieldsClone, "close", false);
        if (preModify || preAdd) {
          this.screen.setState({
            mode: "d_record",
            preModify: { ...preModify, content: null },
            preAdd: { ...preAdd, content: null },
          });
        } else {
          this.screen.setState({ mode: "d_record" });
        }
        break;
      default:
        // undo to start mode
        fields(fieldsClone, "close");
        if (preModify || preAdd) {
          this.screen.setState({
            mode: "start",
            record: null,
            preModify: { ...preModify, content: null },
            preAdd: { ...preAdd, content: null },
          });
        } else {
          this.screen.setState({ mode: "start", record: null });
        }
        break;
    }
  };

 

}


export class DetailsUndoHandler extends UndoHandler {

  handleDetailsScreensUndo() {
    const {
      record,
      details: { tabs },
    } = this.screen.state;
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
    this.handleUndo();
  }


  LimitRecordsUnodHandler() {
    let {
      details,
      details: { current_tab },
    } = this.screen.state;
    this.handleDetailsScreensUndo()
    details.tabs[current_tab].addState = true;
    this.screen.setState({details})
  }

}




