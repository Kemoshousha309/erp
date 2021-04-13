import React from "react"
import { connect } from "react-redux"
import { t } from "../../../utilities/lang"
import style from "./SelectField.module.scss"
import { Component } from "react";
import {isValid, langNameChangeHandler } from "../../../utilities/processes";
import Aux from "../../../hoc/Aux";



class SelectField extends Component {
    state = {
        value: "", 
        touched: false,
        valid: false,
        invalidFeedBack: null,
        lastPropValue: null,
        lastouterTouch: null
    }
    changeHandler = (e) => {
        const validationRules = this.props.field.validation
        const stateClone = {...this.state}
        const [valid, message] = isValid(e.target.value, validationRules)
        if(!this.state.touched){
            stateClone.touched = true
        }
        stateClone.valid = valid
        stateClone.invalidFeedBack = message
        stateClone.value = e.target.value
        this.setState(stateClone)
    } 
    static getDerivedStateFromProps(props, state){
        const updatedState = {...state}
        if(state.lastPropValue !== props.field.value){
            updatedState.value = props.field.value
            updatedState.lastPropValue = props.field.value
        }
        // if(state.lastouterTouch !== props.field.touched){
        //     updatedState.touched = props.field.touched
        //     updatedState.lastouterTouch = props.field.touched
        // }
        if(!props.field.readOnly){  
            if(!state.touched && props.field.validity.touched){
                updatedState.touched = props.field.validity.touched
                updatedState.invalidFeedBack = props.field.validity.message
            }
        }
        if(!props.field.readOnly){  
            if(state.touched && !props.field.validity.touched){
                updatedState.touched = props.field.validity.touched
                updatedState.invalidFeedBack = props.field.validity.message
            }
        }
        return updatedState
    }
    componentDidUpdate () {
        langNameChangeHandler(this)
    }
  render() {
        console.log(`[selectField] render`, this.state)
        const field = this.props.field
        const placeholder = t(this.props.field.label, this.props.lanTable, this.props.lanState)
        let [invalidMessage, invalidInputStyle] = checkValiditiy(this)
        let options = null
        if(field.options) {
           options = field.options.map(op => {
                return <option key={op} value={op}>{op}</option>
            })
        }
        return (
            <div class={["form-group" ,style.inputField].join(' ')}>
                <label for={field.id} class="col-sm-4 col-form-label">{label(this)}</label>
                <div class="col-sm-8">
                <select 
                    onChange = {this.changeHandler}
                    value={this.state.value}
                    autoComplete="off"
                    id={field.id} 
                    disabled={field.writability}
                    onBlur ={(e) => this.props.changeHandler(this.state, field.id)} 
                    class={["form-control", invalidInputStyle].join(" ")}>
                        <option hidden selected  > {placeholder} </option>
                         {/* <option style={{display:"none"}}></option> */}
                        {options}
                </select>
                    {invalidMessage}
                </div>
            </div>
        )
    }
}

const label = (thisK) => {
    const label = t(thisK.props.field.label, thisK.props.lanTable, thisK.props.lanState)
    if(thisK.props.field.validation.requiered){
        return <Aux>{label}<span style={{color: "red", fontSize: "2rem"}} > *</span></Aux>
    }else{
        return label
    }
}


const checkValiditiy = (thisK) => {
    const valid = !thisK.props.field.readOnly ? !thisK.props.field.validity.valid : false
    let invalidMessage = null
    let invalidInputStyle = null
    if(thisK.state.touched && !thisK.state.valid) {
        invalidMessage = (
            <div class={style.invalidMessage}>
                {thisK.state.invalidFeedBack}
            </div>
        )
        invalidInputStyle = style.invalidInput
    }
    return [invalidMessage, invalidInputStyle]
}




const mapStateToProps = state => {
    return {
        lanState: state.lang.lan,
        lanTable: state.lang.langTables,
        languages: state.lang.langInfo
    }
}


export default connect(mapStateToProps, null)(SelectField);
