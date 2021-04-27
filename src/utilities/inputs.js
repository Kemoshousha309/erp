import Aux from "../hoc/Aux"
import { t } from "./lang"
import { isValid } from "./tap/validation"


export const changeHandler = (e, thisK, handler) => {
    if(handler){
        handler(e, thisK)
    }
    const validationRules = thisK.props.field.validation
    const stateClone = {...thisK.state}
    const [valid, message] = isValid(e.target.value, validationRules)
    stateClone.valid = valid
    stateClone.invalidFeedBack = message
    stateClone.value = e.target.value
    thisK.setState(stateClone)
} 


export const label = (thisK) => {
    const label = t(thisK.props.field.label, thisK.props.lanTable, thisK.props.lanState)
    if(thisK.props.field.validation){
        if(thisK.props.field.validation.requiered){
            return <Aux>{label}<span style={{color: "red", fontSize: "2rem"}} > *</span></Aux>
        }
    }else{
        return label
    }
}
export const checkInputValiditiy = (thisK, style) => {
    let invalidMessage = null
    let invalidInputStyle = null
    if(!thisK.state.valid) { 
        invalidMessage = (
            <div className={style.invalidMessage}>
                {thisK.state.invalidFeedBack}
            </div>
        )
        invalidInputStyle = style.invalidInput
    }
    return [invalidMessage, invalidInputStyle]
}

export const reflectOuterState = (props, state) => {
    const updatedState = {...state}
        if(state.lastPropValue !== props.field.value){
            updatedState.value = props.field.value
            updatedState.displayValue = props.field.value
            updatedState.lastPropValue = props.field.value
        }
        if(!props.field.readOnly && props.field.validity){  
            if(state.lastPropValid !== props.field.validity.valid){
            updatedState.valid = props.field.validity.valid
            updatedState.invalidFeedBack = props.field.validity.message
            updatedState.lastPropValid = props.field.validity.valid
        }
        }
    return updatedState
}