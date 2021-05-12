import { t } from "../lang"



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

export const isValid = (value, rule, thisK) => {
    let message = null
    let isValid = true
   if(rule){
    if(rule.requiered){
        isValid = (value.toString()).trim() !== "" && isValid; 
        if(!isValid && !message){
            message = t('required_field', thisK.props.lanTable, thisK.props.lanState)
        }
    }
    if(rule.size && value !== ""){
        isValid = parseInt(value) <= parseInt(rule.size) && isValid 
        if(!isValid && !message){
            message = t('max_size', thisK.props.lanTable, thisK.props.lanState)
        }
    }
    if(rule.length){
        isValid = parseInt(value.length) <=  parseInt(rule.length) && isValid;
        if(!isValid && !message){
            message = t('max_length', thisK.props.lanTable, thisK.props.lanState)
        }   
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
        if(!f.readOnly && f.writability && f.validity && f.validation){
            if(f.value === '' && f.validation.requiered){
                f.validity.valid = false
                f.validity.message = t('required_field', thisK.props.lanTable, thisK.props.lanState)
            }
            if(key === "confirm_password"){
                console.log(fieldsClone.password)
                const passValue = fieldsClone.password.value 
                const confimValue = fieldsClone.confirm_password.value 
                if(passValue !== confimValue){
                    f.validity.valid = false
                    f.validity.message = t("pass_not_identical", thisK.props.lanTable, thisK.props.lanState)
                }
            }
            isValid = f.validity.valid && isValid
        }
    }
    return [isValid, fieldsClone]
}


