import { decideLanguageName } from "../lang"

export const fields = (fields, mode, empty=true, specific) => {
    if(specific){
        for(const field in fields){
            if(empty) {
                if(fields[field].type === "checkbox"){
                    fields[field].value = false
                }else{
                    fields[field].value = ""
                }
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
            if(!fields[field].readOnly && fields[field].validity){
                fields[field].validity.valid = true
                fields[field].validity.message = null
            }
            if(empty){
                if(fields[field].type === "checkbox"){
                    fields[field].value = false
                }else{
                    fields[field].value = ""
                }
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
        if(record[i] !== undefined){
            fields[i].value = record[i]
        }else if (record[i] === false){
            fields[i].value =  false
        }
    }
    return fields;
}

export const add_lan_no_options = (thisk) =>{
    const options = []
    thisk.props.languages.forEach(i => {
        const itemTemp = `${i.lang_no} (${i.lang_name})`
        options.push({value: i.lang_no, template: itemTemp})
    })
    const fieldsClone = {...thisk.state.fields}
    fieldsClone.lang_no.options = options
    thisk.setState({fields: fieldsClone})
}
export const add_lan_dir_options = (thisK) => {
    const options = []
    thisK.props.languages.forEach(i => {
        let isPresent = false
        options.forEach(ele => {
            if(ele.value === i.lang_dir){isPresent = true}
        })
        if(!isPresent){
            const itemTemp = `${i.lang_dir}`
            options.push({value: i.lang_dir, template: itemTemp})
        }
    })
    const fieldsClone = {...thisK.state.fields}
    const constoptions_noDub = [...new Set(options)]
    fieldsClone.lang_dir.options = constoptions_noDub
    thisK.setState({fields: fieldsClone})
    
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

export const getPkUrl = (pks, record) => {
    let pkUrl = ""
    pks.forEach(p =>  {
        pkUrl = pkUrl + `/${record[p]}`
    })
    return pkUrl
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

export  const deepClone = (l) => {
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

export  const langNameAutoView = (thisK) => {
    const langNoInput = document.getElementById("lang_no")
    langNoInput.addEventListener("change", (e) => {
        const langNameInput = document.getElementById("lang_no_name")
        langNameInput.value = 
        decideLanguageName(thisK.props.languages, e.target.value, thisK.props.lanTable, thisK.props.lanState);
    })
}

export const checkValidity = (thisK) => {
    const fieldsClone = {...thisK.state.fields}
    let isValid = true
    for(const key in fieldsClone){
        const f = fieldsClone[key]
        if(!f.readOnly && f.writability && f.validity){
            if(f.value === ''){
                f.validity.valid = false
                f.validity.message = "This field is requierd"
            }
            isValid = f.validity.valid && isValid
        }
    }
    return [isValid, fieldsClone]
}

