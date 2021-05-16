import { decideName } from "../lang"
import axios from "../../axios"
import {t} from "../../utilities/lang"
import { isValid } from "./validation"


// Handle Auto name display fields ************************
export const autoNameDisplay = (thisK, listenField, fkUrl, AFD_N=null) => {
    // / is the prop name of some property in its own table
    thisK.state.fields[listenField].changeHandler = (event, field) => {
        const fieldsClone = {...thisK.state.fields}
        // auto field display name is the field that should be changed its key depend on the language to fit the record props
        let AFD_name = decideName(listenField , thisK.props.lanState);
        if(AFD_N){
            AFD_name = AFD_N
        }
        fieldsClone[AFD_name].value = t("loading", thisK.props.lanTable, thisK.props.lanState)
        thisK.setState({fields: fieldsClone})
        axios.get(`${fkUrl}/${event.target.value}`)
        .then(res=> {
            // propert. name. in. original. table. => SPN => start property name in the fk tabel
            const PNIOT = thisK.state.fields[listenField].fKTable.SPN
            // record property name is the prop name in the record wich i use to access the value form record, depend on SPN
            const RP_name = decideName(PNIOT, thisK.props.lanState)
            const RP_d_name = decideName(PNIOT, 1)
            if(event.target.value !== ""){
                if(res.data[RP_name]){
                    fieldsClone[AFD_name].value = res.data[RP_name]
                    fieldsClone[AFD_name].autoFilledSuccess = true
                    thisK.setState({fields: fieldsClone})
                }else if(res.data[RP_d_name]){
                    fieldsClone[AFD_name].value = res.data[RP_d_name]
                    fieldsClone[AFD_name].autoFilledSuccess = true
                    thisK.setState({fields: fieldsClone})
                }else if(res.data[PNIOT]){
                    fieldsClone[AFD_name].value = res.data[PNIOT]
                    fieldsClone[AFD_name].autoFilledSuccess = true
                    thisK.setState({fields: fieldsClone})
                }
                else{
                    fieldsClone[AFD_name].value = ""
                    fieldsClone[AFD_name].autoFilledSuccess = false
                    thisK.setState({fields: fieldsClone})
                }   
            }else{
                fieldsClone[AFD_name].value = ""
                fieldsClone[AFD_name].autoFilledSuccess = false
                thisK.setState({fields: fieldsClone})
            }

        })
        .catch(err => {
            console.log(err)
            let errorMess = err.response.data.message.ar
            if(parseInt(thisK.props.lanState) === 2) {
                errorMess = err.response.data.message.en
            }
            fieldsClone[AFD_name].value = errorMess
            fieldsClone[AFD_name].autoFilledSuccess = false
            // fieldsClone[AFD_name].value = t("not_exist", thisK.props.lanTable, thisK.props.lanState)

            thisK.setState({fields: fieldsClone})
        })
    }
}


// password confirmation 
export const checkPassConfirm = (thisK) => {
    thisK.state.fields.confirm_password.changeHandler = (event, field) => {
        const passValue = thisK.state.fields.password.value
        const confimValue = event.target.value
        const fieldClone = {...field}
        if(confimValue.length >= passValue.length && passValue !== confimValue){
            fieldClone.valid = false
            fieldClone.invalidFeedBack = t("pass_not_identical", thisK.props.lanTable, thisK.props.lanState)
        }else{
            const [valid, message] = isValid(event.target.value, field.props.field.validation, thisK)
            fieldClone.valid = valid
            fieldClone.invalidFeedBack = message
        }
        field.setState(fieldClone)
        return 'pass_confirm'
    }
} 



// handle change field name to fit the record prop name
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

// only on field should be active 
export const onlyActiveField = (fields, firstField, secondField, mode) => {
    const fieldOne = fields[firstField]
    const fieldTwo = fields[secondField]
    if(mode === "modify"){
        if(fieldOne.value.toString().length >=1){
            fields[secondField].writability = false
            fields[secondField].value = ""
        }else{
            fields[secondField].writability = true
        }
        if(fieldTwo.value.toString().length >= 1){
            fields[firstField].writability = false
            fields[firstField].value = ""
        }else{
            fields[firstField].writability = true
        }
    }
    return fields
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
    if(gatherdFieldName){
        fields[gatherdFieldName].readOnlyField = newKey
    }
    const fieldsUpdate = renameObjKey(fields, currentKey, newKey)
    return fieldsUpdate
}