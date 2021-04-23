import React from "react"
import { connect } from "react-redux"
import { t } from "../../../utilities/lang"
import style from "./AsyncSelectField.module.scss"
import { Component } from "react";
import { label, checkInputValiditiy, reflectOuterState } from "../../../utilities/inputs"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faAngleDown} from "@fortawesome/free-solid-svg-icons";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../hoc/Aux";
import { CircularProgress } from "@material-ui/core";


class AsyncSelectField extends Component {
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
        console.log("slect")
        const input = document.getElementById(this.props.field.id)
        input.focus() // to fire blur after update the state
        this.setState({dropList: false, value: event.target.value, displayValue: event.target.innerText})
    }
    handleClose = (event) => {console.log("close")
        this.props.thisK.async_lang_no_options(this.state.dropList)
        this.setState({dropList: false})
    }
    handleFocus = () => {console.log("focus")
        this.props.thisK.async_lang_no_options(this.state.dropList)
        this.setState({dropList: true})
    }
    render() {
        // console.log(`[InputSelectField] render`, this.state)
        const field = this.props.field
        const placeholder = t(this.props.field.label, this.props.lanTable, this.props.lanState)
        let [invalidMessage, invalidInputStyle] = checkInputValiditiy(this, style)
        let options = <div className="text-center"> <CircularProgress className="m-5" /></div>
        if(field.options){
            options = field.options.map(op => {
                return <li onClick={this.handleSelect} key={op.value} value={op.value}>{op.template}</li>
            })
        }
        const dropList = (
            <Aux>
                <div  className={dropListClasses(this)} >
                    <ul>
                        {options}
                    </ul>
                </div>
                <Backdrop show opacity={0} click={this.handleClose} />
            </Aux>
        )
        return (
            <div className={["form-group" ,style.inputField].join(' ')}>
                <label htmlFor={field.id} className="col-sm-4 col-form-label">{label(this)}</label>
                <div className="col-sm-8">
                    <input 
                    value={this.state.displayValue}
                    onBlur ={this.handleBlur} 
                    autoComplete="off"
                    disabled={!field.writability}
                    className={["form-control", invalidInputStyle].join(" ")}
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
    if(parseInt(thisK.props.lanState) === 1){
        classes.push(style.arAngle)
    }else{
        classes.push(style.enAngle)
    }
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
