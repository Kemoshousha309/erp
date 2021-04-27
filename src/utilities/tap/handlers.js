import { handleMode } from "./mode"
import { fields, fillRecord } from "./fields"
import { decideName } from "../lang"

// modify hanle *******************************
export const handleModify = (thisK) => {
    fields(thisK.state.fields, "open", false)
    fields(thisK.state.fields, "close", false, thisK.state.pks)
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

// close list Handler *******************************
export const handleCloseFkList = (thisK) =>{
    thisK.setState({fkListShow: null})
}


// record click Handler ************************
export const handleRecordClick = (thisK, record, i) => {
    fillRecord(thisK.state.fields, record)
    fields(thisK.state.fields, "close", false)
    checkNullName(thisK, record)
    thisK.setState({listShow: false, mode: "d_record", recordIndex: i, record: record})
}

const checkNullName = (thisK, record) => {
    const fieldsClone = {...thisK.state.fields}
    if(thisK.state.fks){
        thisK.state.fks.forEach(fk => {
            const fkField = fieldsClone[fk]
            if(fkField.readOnlyField){
                if(!record[fkField.readOnlyField]){
                    const propertyName = `${extractName(fkField.readOnlyField)}_d_name`
                    fieldsClone[fkField.readOnlyField].value = record[propertyName]
                }
            }
        });
    }
    return fieldsClone
}

const extractName = (propName) => {
    // get the property name after remove d_name or f_name
    let newName = propName.replace("_d_name", "")
    newName = newName.replace("_f_name", "")
    return newName
}


// fk record click handler *********************
export const handleRecordFkClick  = (thisK, record, i) => {
    const fieldsClone = {...thisK.state.fields}
    const fk = thisK.state.fkListShow
    if(fieldsClone[fk].readOnlyField){
        const fieldName = decideName(fieldsClone[fk].fkName, thisK.props.lanState)
        if(record[fieldName]){
            fieldsClone[fieldsClone[fk].readOnlyField].value = record[fieldName]
        }else{
            console.log(record[`${fieldsClone[fk].fkName}_d_name`])
            fieldsClone[fieldsClone[fk].readOnlyField].value = record[`${fieldsClone[fk].fkName}_d_name`]
        }
    }
    fillRecord(thisK.state.fields, record)
    thisK.setState({fkListShow: null, fields: fieldsClone, fkRecord: record})
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
            if(!fields[identifier].readOnly){
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