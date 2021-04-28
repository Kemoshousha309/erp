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
            if(record[i] === null){
                console.log(record[i])
                fields[i].value =  "holl" 
            }else{
                fields[i].value = record[i] 
            }
        }else if (record[i] === false){
            fields[i].value =  false
        }
    }
    return fields;
}


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