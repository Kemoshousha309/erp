import React from "react"
import { connect } from "react-redux"
import { t } from "../../../utilities/lang"
import style from "./InputField.module.scss"
import { TextField } from "@material-ui/core";
import { Component } from "react";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Spinner from "../../UI/Spinner/Spinner";
import {isValid, langNameChangeHandler } from "../../../utilities/processes";
import Aux from "../../../hoc/Aux";



class InputField extends Component {
    state = {
        value: "", 
        touched: false,
        valid: false,
        invalidFeedBack: null,
        lastPropValue: null
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
        console.log(props)
        if(state.lastPropValue !== props.field.value || state.touched !== props.field.validity.touched){
            return{
                value: props.field.value,
                lastPropValue: props.field.value,
                touched: props.field.validity.touched,
                invalidFeedBack: props.field.validity.message
            }
        }
        return null
    }
    componentDidUpdate () {
        // langNameChangeHandler(this)
    }
  render() {
        // console.log(`[InputSelectField] render`, this.state)
        const field = this.props.field
        const placeholder = t(this.props.field.label, this.props.lanTable, this.props.lanState)
        let [invalidMessage, invalidInputStyle] = checkValiditiy(this)
        return (
            <div class={["form-group" ,style.inputField].join(' ')}>
                <label for={field.id} class="col-sm-4 col-form-label">{label(this)}</label>
                <div class="col-sm-8">
                    <input 
                    value={this.state.value}
                    onChange = {this.changeHandler}
                    onBlur ={(e) => this.props.changeHandler(this.state, field.id)} 
                    autoComplete="off"
                    // disabled={field.writability}
                    type={field.type} 
                    class={["form-control", invalidInputStyle].join(" ")}
                    id={field.id} 
                    placeholder={placeholder} />
                    {invalidMessage}
                </div>
            </div>
        )
    }
}

const label = (thisK) => {
    const label = t(thisK.props.field.label, thisK.props.lanTable, thisK.props.lanState)
    if(thisK.props.field.validation.requiered){
        return <Aux>{label}<span style={{color: "red", fontSize: "2rem*"}} > *</span></Aux>
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


export default connect(mapStateToProps, null)(InputField);

