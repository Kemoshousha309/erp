export const getParam = (searchParam) => {
    const string = searchParam.replace("?key=", "");
    return string
}

export const fillRow = (fields, row) => { 
    for(let i in fields){
        if(row === ""){
            fields[i].value = ""
        }else{
            fields[i].value = row[i]
        }
    }
    return fields;
}

export const openFields = (fields, mode, except) =>{
    const fieldsClone = {...fields};
    if(mode){
        for(let i in fieldsClone){
            fieldsClone[i].readOnly = false
        }
        if(except){
                fieldsClone[except].readOnly = true
            } 
        }else{
            for(let i in fieldsClone){
                fieldsClone[i].readOnly = true
            }
    }   

    return fieldsClone;
}

export const closeRow = (fields) =>{
    const fieldsClone = {...fields};
    for(let i in fieldsClone){
        fieldsClone[i].value = ""
        fieldsClone[i].readOnly = true
    }
    return fieldsClone;
}



export const decideLanguageName = (languages, input)=> {
    let name = "" 
    languages.forEach(lan => {
        if(parseInt(input) === parseInt(lan.lang_no)){
            name = lan.lang_name
        }
    })
    return name
}

export const resetValidation = (fields) => {
    const fieldsClone = {...fields};
     for(let i in fieldsClone){
        fieldsClone[i].valid = false
        fieldsClone[i].touched = false
    }
    return fieldsClone
}