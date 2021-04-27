import { decideName } from "../lang"
import axios from "../../axios"
import {t} from "../../utilities/lang"
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

export const changeModuleNoNameprop = (props, state) => {
    let currentKey = null
    if(state.fields.module_no_name){
        currentKey = "module_no_name"
    }else if(state.fields.module_no_d_name){
        currentKey = "module_no_d_name"
    }else if(state.fields.module_no_f_name){
        currentKey = "module_no_f_name"
    }
    let newKey = "module_no_f_name"
    if(parseInt(props.lanState) === 1){
        newKey = "module_no_d_name"
    }
    const fieldsClone = {...state.fields}
    fieldsClone.module_no.readOnlyField = newKey
    console.log(state.record)
    const fieldsUpdate = renameObjKey(fieldsClone, currentKey, newKey)
    return fieldsUpdate
}