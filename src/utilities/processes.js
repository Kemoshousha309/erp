import { selectMessage, t } from "./lang"
import { startMode, toolsName } from "./tools"
import axios  from "../axios"



/// fields proscess *****************************************
// =>>

export const fields = (fields, mode, empty=true) => {
    for(const field in fields){
        fields[field].valid = true
        if(empty){
            fields[field].value = ""
        }
        if(mode === "open"){
            if(fields[field].readOnly){
                fields[field].writability = true
            }else{
                fields[field].writability = false
            }
        }else if(mode === "close"){
            fields[field].writability = true
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
export const handleMode = (mode) => {
    let activeList = null
    switch (mode) {
        case "start":
            return startMode
        case "add":
            return activate([toolsName.undo.name, toolsName.save.name])
        case "copy":
            return activate([toolsName.undo.name, toolsName.save.name])
        case "d_record":
            activeList = [
                toolsName.add.name, toolsName.list.name, 
                toolsName.modify.name, toolsName.first.name, toolsName.last.name,
                toolsName.next.name, toolsName.previous.name, toolsName.first.name,
                toolsName.search.name, toolsName.delete.name, toolsName.copy.name,
                toolsName.undo.name
            ]
            return activate(activeList)
        case "modify":
            activeList = [toolsName.save.name, toolsName.undo.name]
            return activate(activeList)
        case "search":
            activeList = [toolsName.search.name, toolsName.undo.name]
            return activate(activeList)
        default: 
            break;
    }
}

const activate = (activeList) => {
    const modeClone = deepClone(startMode)
    modeClone.forEach(tool => tool.state = false)
    activeList.forEach(toolName => {
        modeClone.forEach(tool =>{
            if(toolName === tool.name){
                tool.state = true
            }
        })
    })
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
            thisK.setState({
                mode: "d_record",
                loading: false, 
                message: selectMessage(res.data.message, thisK.props.lanState),
                recordIndex: null
            })
            timer(thisK)
        })
        .catch(err => {
            fields(thisK.state.fields, 'close', true)
            thisK.setState({
                mode: "start",
                loading: false, 
                message: selectMessage(err.response.data.message, thisK.props.lanState),
                recordIndex: null
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
        thisK.setState({
            mode: "start",
            loading: false, 
            message: selectMessage(res.data.message, thisK.props.lanState),
            recordIndex: null
        })
        timer(thisK)
    })
    .catch(err => {
        fields(thisK.state.fields, 'close', true)
            thisK.setState({
                mode: "start",
                loading: false, 
                message: selectMessage(err.response.data.message, thisK.props.lanState),
                recordIndex: null
            })
            timer(thisK)
    })
}
export const  deleteConfirmaton = () => {
    
}

// Handle search ******************************************************
export const  handleSearch = (thisK) => {
    if(thisK.state.mode === "search"){
        const values = getValues(thisK.state.fields)
        const pk = getPk(thisK.state.fields)
        if(values[pk] === "" ){
            thisK.setState({message: t("you_must_enter", thisK.props.lanTable, thisK.props.lanState, pk)})
            timer(thisK)
        }else if(values.lang_no === ""){
            thisK.setState({message: t("you_must_enter", thisK.props.lanTable, thisK.props.lanState, "lang_no")})
            timer(thisK)
        }
        else{
            searchRequest(thisK, pk, values)
        }
    }else{
        fields(thisK.state.fields, "open", true)
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
            fields(thisK.state.fields, 'open', true)
            thisK.setState({
                loading: false, 
                message: selectMessage(err.response.data.message, thisK.props.lanState),
                recordIndex: null
            })
            timer(thisK)
        })
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
    let valid = true
    for(const key in fieldsClone){
        fieldsClone[key].valid = isValid(fieldsClone[key].value, fieldsClone[key].validation)
        if(!fieldsClone[key].readOnly){
            valid = fieldsClone[key].valid && valid
        }
    }
    return [fieldsClone, valid]
}

const isValid = (value, rule) => {
    let isValid = true
    if(rule.requiered){
        isValid = (value.toString()).trim() !== "" && isValid; 
    }
    if(rule.length){
        isValid = parseInt( value.length) <=  parseInt(rule.length) && isValid;
    }
    return isValid
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
