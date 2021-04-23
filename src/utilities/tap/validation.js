
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
