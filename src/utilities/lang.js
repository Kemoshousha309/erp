export const t = (code, langTables, lang_no, placeholder) => {
    let description = null
    let holder = null
    langTables.forEach(element => {
        if(element.label_code  === code  && parseInt(element.lang_no)  === parseInt(lang_no)){
            description = element.label_desc
        }
        if(element.message_code  === code  && parseInt(element.lang_no)  === parseInt(lang_no) && !description){
            description = element.message_desc
        }
        if(placeholder){
            if(element.label_code  === placeholder  && parseInt(element.lang_no)  === parseInt(lang_no)){
                holder = element.label_desc
            }
        }
    });
    if(holder){
        description = description.replace(/#[1-9]/g, holder)
    }else if(placeholder){
        description = description.replace(/#[1-9]/g, placeholder)
    }
    return description; 
}

export const selectMessage = (messages, lang_no) => {
    if(messages){
        if(parseInt(lang_no) === 1){
            return messages.ar
        }else{
            return messages.en
        }
    }else {
        return "";
    }
}   
export const decideLanguageName = (languages, input, langTables, lang_no)=> {
    let name = ""
    languages.forEach(lan => {
        if(parseInt(input) === parseInt(lan.lang_no)){
            name = lan.lang_name
        }else if(input === ""){
            name = ""
        }
    })
    return name
}

export const getSelectLangDir = (langs, lang_no) => {
    let lanDirection = null
    langs.forEach(lang => {
        if(parseInt(lang.lang_no) === parseInt(lang_no)){
            lanDirection = lang.lang_dir
        }   
    })
    return lanDirection
}

export const decideName = (fieldName ,lang_no) => {
    let retrunName = `${fieldName}_f_name`
    if(parseInt(lang_no) === 1){
        retrunName = `${fieldName}_d_name`
    }
    return retrunName
}


export const getAvialableValue = (d_value, f_value, lan_no) => {
    let currentValue = d_value;
    let otherValue = f_value;
    if(parseInt(lan_no) === 2){
        currentValue = f_value;
        otherValue = d_value;
    }
    return currentValue ? currentValue : otherValue;
}