import { handleMode } from "./mode"
import { fields, fillRecord } from "./fields"
import { getParam } from "../utilities"
import { toolsPriv } from "./utilities"
import axois from "../../axios"

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
export const handleRecordClick = (thisK, record, i, func) => {
    if(func){
        func.call(thisK, record, i)
    }
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
                    if(record[propertyName] === null){
                        fieldsClone[fkField.readOnlyField].value = ""
                    }else{
                        fieldsClone[fkField.readOnlyField].value = record[propertyName]
                    }
                    
                }
            }
        });
    }
    return fieldsClone
}

export const extractName = (propName) => {
    // get the property name after remove d_name or f_name
    let newName = propName.replace("_d_name", "")
    newName = newName.replace("_f_name", "")
    return newName
}


// FK RECORD CLICK HANDLER *********************
export const fkRecordClickHandler = (thisK, record) => {
    const {
        state:{
            fields,
            fkListShow
        },
    } = thisK
    const fillFields = thisK.state.fields[fkListShow].fillFields

    document.getElementById(fkListShow).focus()
    if(fillFields){
        fillFields.forEach(i => {
            if(fields[i.stateName]){
                fields[i.stateName].value = record[i.recordName] 
                fields[i.stateName].autoFilledSuccess = true
                if(fields[i.stateName].validity){
                    fields[i.stateName].validity.valid = true
                    fields[i.stateName].validity.message = null
                }
            }
        })
    }
    thisK.setState({fkListShow: null, fields: fields, fkRecord: record})
}


// add handle ******************************
export const handleAdd = (thisK) => {
    fields(thisK.state.fields, "open")
    if(thisK.state.specialFields){
        thisK.state.specialFields.forEach(f => {
            if(f.add){
                const specific = [f.key]
                fields(thisK.state.fields, f.add, true, specific)
            }
        })
    }
    // apply auto increment primary key 
    const pkPropName = thisK.state.pks[0];
    let fieldsClone = {...thisK.state.fields}
    if(thisK.state.fields[pkPropName].autoIncrement){
        axois.get(`${thisK.state.fields[pkPropName].autoIncrement}`)
        .then(res => {
            fieldsClone[pkPropName].value = res.data.next_PK
            thisK.setState({fields: fieldsClone})
        })
        .catch(err => console.log(err))
    }
    thisK.setState({mode: "add", fields: fieldsClone, record: null})
}
 
// copy handle ******************************
export const handleCopy = (thisK) => {
    fields(thisK.state.fields, "open", false)
    thisK.setState({mode: "copy"})

     // apply auto increment primary key 
     const pkPropName = thisK.state.pks[0];
     let fieldsClone = {...thisK.state.fields}
     if(thisK.state.fields[pkPropName].autoIncrement){
         axois.get(`${thisK.state.fields[pkPropName].autoIncrement}`)
         .then(res => {
             fieldsClone[pkPropName].value = res.data.next_PK
             thisK.setState({fields: fieldsClone})
         })
         .catch(err => console.log(err))
     }
     thisK.setState({mode: "add", fields: fieldsClone})
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
    let tools = handleMode(state.mode, props.lanState, props.languages, state.tapTools, props.changeLangSelectAcivity)
    const formPrivs = props.forms_privs_hash[getParam(props.location.search, "no")];
    tools = toolsPriv(formPrivs, tools)
    
    return { tools: tools }
}