export const t = (label_code, langTables, lang_no, placeholder) => {
    let description = null
    let holder = null
    langTables.forEach(element => {
        if(element.label_code  === label_code  && parseInt(element.lang_no)  === parseInt(lang_no)){
            description = element.label_desc
        }
        if(placeholder){
            if(element.message_code  === label_code  && parseInt(element.lang_no)  === parseInt(lang_no)){
                description = element.message_desc
            }
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
    if(parseInt(lang_no) === 1){
        return messages.ar
    }else{
        return messages.en
    }
}