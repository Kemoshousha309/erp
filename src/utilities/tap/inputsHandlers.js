import { decideName } from "../lang"
import axios from "../../axios"
import {t} from "../../utilities/lang"
import { fields } from "./fields"
// Handle Name fields ************************


// module name
export const handleModuleNoName = (thisK) => {
    thisK.state.fields.module_no.changeHandler = (event, field) => {
        const fieldsClone = {...thisK.state.fields}
        const moduleNoName =  decideName("module_no", thisK.props.lanState);
        fieldsClone[moduleNoName].value = t("loading", thisK.props.lanTable, thisK.props.lanState)
        thisK.setState({fields: fieldsClone})
            axios.get(`modules/page/${event.target.value}`)
            .then(res =>  {
                const moduleName =  decideName("module", thisK.props.lanState);
                if(res.data.page[moduleName]){
                    fieldsClone[moduleNoName].value = res.data.page[moduleName]
                    thisK.setState({fields: fieldsClone})
                }else{
                    fieldsClone[moduleNoName].value = res.data.page.module_d_name
                    thisK.setState({fields: fieldsClone})
                }
            })
            .catch(err => {
                fieldsClone[moduleNoName].value = t("not_exist", thisK.props.lanTable, thisK.props.lanState)
                thisK.setState({fields: fieldsClone})
            })
        }
}

// parent name
export const handleParentNoName = (thisK) => {
    thisK.state.fields.parent_form.changeHandler = (event, field) => {
        const fieldsClone = {...thisK.state.fields}
        const parentFormName =  decideName("parent_form", thisK.props.lanState);
        fieldsClone[parentFormName].value = t("loading", thisK.props.lanTable, thisK.props.lanState)
        thisK.setState({fields: fieldsClone})
            axios.get(`forms/page/${event.target.value}`)
            .then(res =>  {
                const parentName =  decideName("form", thisK.props.lanState);
                console.log(res.data.page)
                if(res.data.page[parentName]){
                    fieldsClone[parentFormName].value = res.data.page[parentName]
                    thisK.setState({fields: fieldsClone})
                }else{
                    fieldsClone[parentFormName].value = res.data.page.parent_form_d_name
                    thisK.setState({fields: fieldsClone})
                }
            })
            .catch(err => {
                fieldsClone[parentFormName].value = t("not_exist", thisK.props.lanTable, thisK.props.lanState)
                thisK.setState({fields: fieldsClone})
            })
        }
}




const renameObjKey = (obj, oldKey, newKey) => {
    const objArr = [];
    for(let key in obj){
        const elementobj = {
            key: key,
            ...obj[key]
        }
        objArr.push(elementobj);
    }
    objArr.forEach((ele, i) => {
        if(ele.key  === oldKey){
            ele.key = newKey
        }   
    })
    const newObj = {}
    objArr.forEach(ele => {
        newObj[ele.key] = {
            ...ele
        }
        delete newObj[ele.key].key
    })
    return newObj
}


export const changePropName  = (props, fields, startPropName, propFieldName, gatherdFieldName) =>  {
    let currentKey = null
    const d_name = `${propFieldName}_d_name`
    const f_name = `${propFieldName}_f_name`
    if(fields[startPropName]){
        currentKey = startPropName
    }else if(fields[d_name]){
        currentKey = d_name
    }else if(fields[f_name]){
        currentKey = f_name
    }
    let newKey = f_name
    if(parseInt(props.lanState) === 1){
        newKey = d_name
    }
    const fieldsClone = {...fields}
    fieldsClone[gatherdFieldName].readOnlyField = newKey
    const fieldsUpdate = renameObjKey(fieldsClone, currentKey, newKey)
    return fieldsUpdate
}