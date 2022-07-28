import _ from "lodash";
import { handleFields } from "../fields";
import { updateMode } from "../mode";
import { getDtailsPropnams } from "../utilities";
import { FuncConstructor } from "./funcConstructor";

// undo handle ******************************
export class UndoHandler extends FuncConstructor {

  handleUndo = () => {
    const { fields, mode, record } = this.screen.state;
    let fieldsUpdate = null;
    switch (mode) {
      case "modify":
        fieldsUpdate = handleFields(fields, "close", false);
        return {fieldsUpdate, mode: "d_record", record}
      case "copy":
        fieldsUpdate = handleFields(fields, "close", false);
        return {fieldsUpdate, mode: "d_record", record};
      default:
        // undo to start mode
        fieldsUpdate = handleFields(fields, "close");
        return {fieldsUpdate, mode: "start", record: null};
    }
  };
}


export class DetailsUndoHandler extends UndoHandler {

  handleDtlRecordUndo() {
    const {
      record,
      details: { tabs },
    } = this.screen.state;
    const recordClone = _.cloneDeep(record);
    const properties = getDtailsPropnams(tabs);
    properties.forEach((prop) => {
      if (prop && recordClone) {
        const pages = recordClone[prop];
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
    return recordClone;
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



export async function handleUndoModel() {
  const { detials } = this.state;
  if (!detials) return handleNormalUndoModel.call(this);
  handleDtlUndoModel.call(this);
}

export async function handleNormalUndoModel() {
  const {
    state: { preAdd, preModify },
  } = this;
  const { fieldsUpdate, mode, record } = this.undoHandler.handleUndo();
  const {tools} = updateMode(mode, this.state, this.props)
  if (!preAdd || !preModify)
    return this.setState({ fields: fieldsUpdate, mode, record, tools });
  this.setState({
    fields: fieldsUpdate,
    mode,
    record,
    preAdd: { ...preAdd, content: null },
    preModify: { ...preModify, content: null },
    tools
  });
}

export async function handleDtlUndoModel() {
  const {recordUpdate} = this.dtlUndoHandler.handleDtlRecordUndo();
    this.normalUndo();
    this.setState({record: recordUpdate})
}


