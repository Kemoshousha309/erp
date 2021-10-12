import { handleMode } from "./mode"
import { getParam } from "../utilities"
import { toolsPriv } from "./utilities"


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