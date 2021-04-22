import { handleMode } from "./mode"
import { fields, fillRecord } from "./utilities"

// modify hanle *******************************
export const handleModify = (thisK) => {
    fields(thisK.state.fields, "open", false)
    thisK.setState({mode: "modify"})
}

// list handle ******************************
export const handleList = (thisK) => {
    const currentMode = thisK.state.mode
    thisK.setState({listShow: true, mode: "list", prevMode: currentMode})
}

// colse list Handler ************************
export const handleCloseList = (thisK) => {
    const currentState = thisK.state.listShow
    const previousMode = thisK.state.prevMode
    thisK.setState({listShow: !currentState, mode: previousMode})
}

// record click Handler ************************
export const handleRecordClick = (thisK, record, i) => {
    fillRecord(thisK.state.fields, record)
    thisK.setState({listShow: false, mode: "d_record", recordIndex: i})
}


// add handle ******************************
export const handleAdd = (thisK) => {
    fields(thisK.state.fields, "open")
    thisK.setState({mode: "add"})
}

// copy handle ******************************
export const handleCopy = (thisK) => {
    fields(thisK.state.fields, "open", false)
    thisK.setState({mode: "copy"})
}

// undo handle ******************************
export const handleUndo  = (thisK) => {
    switch (thisK.state.mode) {
        case "modify":
            fields(thisK.state.fields, "close", false)
            thisK.setState({mode: "d_record"})
            break;
        case "copy":
            fields(thisK.state.fields, "close", false)
            thisK.setState({mode: "d_record"})
            break;
        default:
             // undo to start mode
            fields(thisK.state.fields, "close")
            thisK.setState({mode: "start"})
            break;
    }
}


// input change handler ******************************
export const handleInputChange = (thisK, state, identifier) => {
    const fields = {...thisK.state.fields};
        if(!fields[identifier].readOnly ){
            fields[identifier].value = state.value;
        }
        if(fields[identifier].validity){
            fields[identifier].validity.valid = state.valid;
            fields[identifier].validity.message = state.invalidFeedBack;
        }
        thisK.setState({fields: fields})
}


// shortcuts list close Handler **************************
export const handleCloseShortCuts = (thisK) => {
    const currentState = thisK.state.ShortCutsList
    thisK.setState({ShortCutsList: !currentState})
}

// drived state Handler ***************************************
export const handleDrivedState = (props, state) => {
    return { tools: handleMode(state.mode, props.lanState, props.languages, state.tapTools) }
}