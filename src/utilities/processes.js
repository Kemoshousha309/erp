import { decideLanguageName, getSelectLangDir, selectMessage } from "./lang"
import { startMode, toolsNameMap } from "./tools"
import axios  from "../axios"



/// fields proscess *****************************************
// =>>

export const fields = (fields, mode, empty=true, specific) => {
    if(specific){
        for(const field in fields){
            if(empty) {
                fields[field].value = ""
            }
        }
        specific.forEach(fName => {
            if(mode === "open"){
                fields[fName].writability = true
            }else{
                fields[fName].writability = false
            }
        })
    }else{
        for(const field in fields){
            if(!fields[field].readOnly){
                fields[field].validity.valid = true
                fields[field].validity.message = null
            }
            if(empty){
                fields[field].value = ""
            }
            if(mode === "open"){
                if(fields[field].readOnly){
                    fields[field].writability = false
                }else{
                    fields[field].writability = true
                }
            }else if(mode === "close"){
                fields[field].writability = false
            }
        }
    }
    return fields
}

export const fillRecord = (fields, record) => { 
    for(let i in fields){
        fields[i].valid = true
        fields[i].value = record[i] ? record[i] : ""
    }
    return fields;
}


// mode processes *******************************************************
export const handleMode = (mode, lang_no, langs) => {
    let activeList = null
    const lang_dir = getSelectLangDir(langs, lang_no)
    const toolsName = toolsNameMap(lang_dir)
    switch (mode) {
        case "start":
            return startMode(lang_dir)
        case "add":
            return activate([toolsName.undo.name, toolsName.save.name], null, lang_dir)
        case "copy":
            return activate([toolsName.undo.name, toolsName.save.name], null, lang_dir)
        case "d_record":
            activeList = [
                toolsName.add.name, toolsName.list.name, 
                toolsName.modify.name, toolsName.first.name, toolsName.last.name,
                toolsName.next.name, toolsName.previous.name, toolsName.first.name,
                toolsName.search.name, toolsName.delete.name, toolsName.copy.name,
                toolsName.undo.name
            ]
            return activate(activeList, null, lang_dir)
        case "modify":
            activeList = [toolsName.save.name, toolsName.undo.name]
            return activate(activeList, null, lang_dir)
        case "search":
            activeList = [toolsName.search.name, toolsName.undo.name]
            return activate(activeList, "search", lang_dir)
        default: 
            break;
    }
}

const activate = (activeList, mode=null, lang_dir) => {
    const modeClone = deepClone(startMode(lang_dir))
    modeClone.forEach(tool => tool.state = false)
    activeList.forEach(toolName => {
        modeClone.forEach(tool =>{
            if(toolName === tool.name){
                tool.state = true
            }
        })
    })
    if(mode){
        modeClone.forEach(tool => {
            if(tool.name === mode){
                tool.onMode = true
            }
        })
    }
    return modeClone
}



// save processes ***************************************************
export const handleSaveRequest = (thisK) => {
    let method = null
    thisK.state.mode === "modify" ? method = "put" : method = "post"
    thisK.setState({loading: true})
    axios({
        method: method,
        url: `/public/${thisK.state.tapName}`,
        headers:{Authorization: `Bearer ${thisK.props.token}`}, 
        data: getValues(thisK.state.fields)
        })
        .then(res => {
            fields(thisK.state.fields, 'close', false)
            const message = {
                content: selectMessage(res.data.message, thisK.props.lanState),
                type: "success"
            }
            thisK.setState({
                mode: "d_record",
                loading: false, 
                message: message,
                recordIndex: null,
            })
            timer(thisK)
        })
        .catch(err => {
            fields(thisK.state.fields, 'close', true)
            const message = {
                content: selectMessage(err.response.data.message, thisK.props.lanState),
                type: "error"
            }
            thisK.setState({
                mode: "start",
                loading: false, 
                message: message,
                recordIndex: null,
                
            })
            timer(thisK)
        }) 
}



// delete ******************************************************

export const handleDelete = (thisK) => {
    const record = getValues(thisK.state.fields)
    const pk = getPk(thisK.state.fields)
    const url = `/public/${thisK.state.tapName}/${record[pk]}/${record.lang_no}`
    thisK.setState({loading: true})
    axios({
            method: 'delete',
            url: url,
            headers:{Authorization: `Bearer ${thisK.props.token}`}, 
        })
    .then(res => {
        fields(thisK.state.fields, 'close', true)
        const message = {
                content: selectMessage(res.data.message, thisK.props.lanState),
                type: "success"
            }
        thisK.setState({
            mode: "start",
            loading: false, 
            message: message,
            recordIndex: null,
            
        })
        timer(thisK)
    })
    .catch(err => {
        fields(thisK.state.fields, 'close', true)
         const message = {
                content: selectMessage(err.response.data.message, thisK.props.lanState),
                type: "error"
            }
            thisK.setState({
                mode: "start",
                loading: false, 
                message: message,
                recordIndex: null,
                
            })
            timer(thisK)
    })
}


// Handle search ******************************************************
export const  handleSearch = (thisK) => {
    if(thisK.state.mode === "search"){
        const values = getValues(thisK.state.fields)
        const pk = getPk(thisK.state.fields)
        // if(values[pk] === "" ){
        //     const message = {
        //         content: t("you_must_enter", thisK.props.lanTable, thisK.props.lanState, pk),
        //         type: "warning"
        //     }
        //     thisK.setState({message: message})
        //     timer(thisK)
        // }else if(values.lang_no === ""){
        //     const message = {
        //         content: t("you_must_enter", thisK.props.lanTable, thisK.props.lanState, "lang_no"),
        //         type: "warning"
        //     }
        //     thisK.setState({message: message})
        //     timer(thisK)
        // }
        const[valid, fieldsUpdate] = checkValidity(thisK) 
        if(valid){
            searchRequest(thisK, pk, values)           
        }else{
            thisK.setState({fields: fieldsUpdate})
        }
    }else{
        fields(thisK.state.fields, "open", true, thisK.state.searchFields)
        thisK.setState({mode: "search"})
    }
} 

const searchRequest = (thisK, pk, values) => {
    thisK.setState({loading: true})
    axios.get(`/public/${thisK.state.tapName}/${values[pk]}/${values.lang_no}`)
    .then(res => {
        const record = extractRcordData(thisK.state.mainFields, res.data)
        fillRecord(thisK.state.fields, record)
        fields(thisK.state.fields, 'close', false)
        thisK.setState({
            mode: "d_record",
            loading: false, 
            recordIndex: null
        })
        timer(thisK)
    })
    .catch(err => {
        fields(thisK.state.fields, 'open', false, thisK.state.searchFields)
        const message = {
            content: selectMessage(err.response.data.message, thisK.props.lanState),
            type: "error"
        }
        thisK.setState({
            loading: false, 
            message: message,
            recordIndex: null
        })
        timer(thisK)
    })
}

// function listners *******************************************
const getToolState = (tools, name) => {
    let state = null
    tools.forEach(t => {
        if(t.name === name){
            state = t.state
        }
    })
    return state
}

const handleListenrClick = (event, tools, name, func) => {
    const state = getToolState(tools, name)
    if(state){
        event.preventDefault()
        func()
    }
}


export const addFunctionsListenrs = (thisK) => {
    document.addEventListener("keydown", (event) => {
        const dir = getSelectLangDir(thisK.props.languages, thisK.props.lanState)
        const tools = thisK.state.tools
        switch (event.key) {
            case "Delete": handleListenrClick(event, tools, "delete", thisK.delete); break;
            case "F12": handleListenrClick(event, tools, "delete", thisK.delete); break;
            case "F2": handleListenrClick(event, tools, "add", thisK.add); break;
            case "Insert": handleListenrClick(event, tools, "add", thisK.add); break;
            case "F3": handleListenrClick(event, tools, "copy", thisK.copy); break;
            case "F5": handleListenrClick(event, tools, "search", thisK.search); break;
            case "F4": handleListenrClick(event, tools, "list", thisK.list); break;
            case "F7": handleListenrClick(event, tools, "modify", thisK.modify); break;
            case "Home": handleListenrClick(event, tools, "first", thisK.first); break;
            case "End": handleListenrClick(event, tools, "last", thisK.last); break;
            case "Escape": handleListenrClick(event, tools, "undo", thisK.undo); break;
            case "F10": handleListenrClick(event, tools, "save", thisK.save); break;
            case "ArrowRight": 
                if(parseInt(dir) === 2){
                    handleListenrClick(event, tools, "next", thisK.next);
                }else{
                    handleListenrClick(event, tools, "previous", thisK.previous);
                }
                break;
            case "ArrowLeft": 
                if(parseInt(dir) === 2){
                    handleListenrClick(event, tools, "previous", thisK.previous);
                }else{
                    handleListenrClick(event, tools, "next", thisK.next);
                }
                break;
            default: break;
        }
      });
} 




// proesses utilities ******************************************

export const extractRcordData = (fields, targetRecord) => {
    const recordData = {}
        fields.forEach(f => {
            recordData[f] = targetRecord[f]
        })
    return recordData
}

export const getValues = (fields) => {
    const values = {}
    for(const key in fields){
        values[key] = fields[key].value
    }
    return values
}

export const getPk = (fields) => {
    for(const key in  fields){
        if(fields[key].pk){
            return key
        }
    }
}
export const setValidity = (fields) => {
    const fieldsClone = {...fields}
    let validState = true
    for(const key in fieldsClone){
        if(!fieldsClone[key].readOnly){
            let [valid, message] = isValid(fieldsClone[key].value, fieldsClone[key].validation)
            fieldsClone[key].validity.valid = valid
            if(message === "max_length") {
                fieldsClone[key].value = ""
            }
            fieldsClone[key].validity.message = message
            validState = fieldsClone[key].validity.valid && validState
        }
    }
    return [fieldsClone, validState]
}

export const isValid = (value, rule) => {
    let message = null
    let isValid = true
    if(rule.requiered){
        isValid = (value.toString()).trim() !== "" && isValid; 
        if((value.toString()).trim() === ""){
            message = "This field is required"
        }
    }
    if(rule.length){
        isValid = parseInt( value.length) <=  parseInt(rule.length) && isValid;
        if(parseInt(value.length) >  parseInt(rule.length) && !message){
            message = "max_length"
        }
    }
    return [isValid, message]
}

const deepClone = (l) => {
    const list = []
    l.forEach(i => {
        list.push({...i})
    })
    return list
}

let lastTimer = null
export const timer = (thisK) => {
    var timerId = setTimeout(() => {
        thisK.setState({message: false})
    }, 2000);

    if(!(lastTimer === timerId)){
        if(lastTimer){
            clearTimeout(lastTimer)
        }   
    }
    lastTimer = timerId
}

export  const trigerEnterButton = (id, func) => {
    const input = document.getElementById(id);
    input.addEventListener("keyup", event => {
        if (event.keyCode === 13) {
            event.preventDefault();
            input.blur()
            func()
        }
    });
}

export  const langNameChangeHandler = (thisK) => {
    if(thisK.props.field.id === "lang_no"){
        const langNameInput = document.getElementById("lang_no_name")
        langNameInput.value = 
        decideLanguageName(thisK.props.languages, thisK.state.value, thisK.props.lanTable, thisK.props.lanState);
    }
}

export const checkValidity = (thisK) => {
    const fieldsClone = {...thisK.state.fields}
    let isValid = true
    for(const key in fieldsClone){
        const f = fieldsClone[key]
        if(!f.readOnly && f.writability){
            if(f.value === ''){
                f.validity.valid = false
                f.validity.message = "This field is requierd"
            }
            isValid = f.validity.valid && isValid
        }
    }
    return [isValid, fieldsClone]
}