import React, { PureComponent } from "react"
import { connect } from "react-redux"
import style from "./AsyncSelectField.module.scss"
import { label, checkInputValiditiy, reflectOuterState } from "../../../Helpers/inputs"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faAngleDown} from "@fortawesome/free-solid-svg-icons";
import Backdrop from "../../UI/Backdrop/Backdrop";
import { CircularProgress } from "@mui/material";
import { isValid } from "../../../Validation/validation";
import { t } from "../../../Languages/languages";


class AsyncSelectField extends PureComponent {
    state = {
        value: "", 
        displayValue:"",
        valid: true,
        invalidFeedBack: null,
        lastPropValue: null,
        lastPropValid: null,
        dropList: false
    }
    static getDerivedStateFromProps(props, state){
        return reflectOuterState(props, state)
    }
    handleBlur = (e) => {
        this.props.changeHandler(this.state, this.props.field.id)
    }

    handleSelect = (event) => {
        const input = document.getElementById(this.props.field.id)
        input.focus() // to fire blur after update the state
        const validationRules = this.props.field.validation
        const stateClone = {...this.state}
        const [valid, message] = isValid(event.target.value, validationRules, this)
        stateClone.valid = valid
        stateClone.invalidFeedBack = message
        stateClone.value = event.target.value
        stateClone.dropList = false
        stateClone.displayValue = event.target.innerText
        this.setState(stateClone)
        // this.setState({dropList: false, value: event.target.value, displayValue: event.target.innerText})
    }
    handleClose = (event) => {
        this.props.thisK.async_lang_no_options(this.state.dropList)
        this.setState({dropList: false})
    }
    handleFocus = () => {
        this.props.thisK.async_lang_no_options(this.state.dropList)
        this.setState({dropList: true})
    }
    render() {
        // console.log(`[InputSelectField] render`, this.state)
        const field = this.props.field
        const placeholder = t(this.props.field.label)
        let [invalidMessage, invalidInputStyle] = checkInputValiditiy(this, style)
        let options = <div className="text-center"> <CircularProgress className="m-5" /></div>
        if(field.options){
            options = field.options.map(op => {
                return <li onClick={this.handleSelect} key={op.value} value={op.value}>{op.template}</li>
            })
        }
        const dropList = (
            <>
                <div  className={dropListClasses(this)} >
                    <ul>
                        {options}
                    </ul>
                </div>
                <Backdrop show opacity={0} click={this.handleClose} />
            </>
        )
        // style 
        const classes = ["form-control", invalidInputStyle];
        if(!field.writability) {
            classes.push(style.disabled)
        }
        return (
            <div className={["form-group" ,style.inputField].join(' ')}>
                <label title={t(this.props.field.label)} 
                  htmlFor={field.id} 
                  className="col-sm-4 col-form-label">{label(this)}</label>
                <div className="col-sm-8">
                    <input 
                    value={this.state.displayValue}
                    onBlur ={this.handleBlur} 
                    autoComplete="off"
                    disabled={!field.writability}
                    className={classes.join(" ")}
                    id={field.id} 
                    onFocus={this.handleFocus}
                    onClick={this.handleFocus}
                    placeholder={placeholder} />
                    <span  className={downAngleClasses(this)}>
                        <FontAwesomeIcon icon={faAngleDown} />
                    </span>
                    {invalidMessage}
                    {this.state.dropList ? dropList : null}
                </div>
            </div>
        )
    }
}

const dropListClasses = (thisK) => {
    let classes = [style.droplist]
    if(parseInt(thisK.props.lanState) === 1){
        classes.push(style.arTrans)
    }else{
        classes.push(style.enTrans)
    }
    return classes.join(" ")
}
const downAngleClasses = (thisK) => {
    let classes = [style.downAngle]
    if(thisK.state.dropList){
        classes.push(style.angleUp)
    }
    return classes.join(" ")
}

const mapStateToProps = state => {
    return {
        lanState: state.lang.lan,
        lanTable: state.lang.langTables,
        languages: state.lang.langInfo
    }
}


export default connect(mapStateToProps, null)(AsyncSelectField);
