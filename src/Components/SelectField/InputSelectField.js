import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { t } from '../../../utilities/lang'
import style from "./InputSelectField.module.scss"


class InputSelectField extends Component {
    state = {
        value: "", 
        lastPropValue: null,
    }
    static getDerivedStateFromProps(props, state){
        if(state.lastPropValue !== props.field.value){
            return{
                value: props.field.value,
                lastPropValue: props.field.value
            }
        }
    }
    
    render () {
        // console.log("[SelectField] render")
        const field = this.props.field

        if(this.state.lastPropValue){checkfocus(field.id ,field.value)}      

        let labelDisable = null
        let inputDisable = null
        if(field.writability){
            labelDisable = style.disabledLabel
            inputDisable = style.disabledInput
        }
        
        let dir = style.ltr
        if(parseInt(this.props.lanState) === 1){dir = style.rtl}
        let labelClasses = [style.label, style.inactive, labelDisable, dir].join(" ")

        let labelContent = t(field.label, this.props.lanTable, this.props.lanState)
        if(field.validation.requiered){labelContent += " *"}

        return(
            <div className={style.container}>
                {field.validation.requiered ? <div className={style.required}></div> : null}
                <div className={style.select}>
                    <label htmlFor={field.id} id={`${field.id}_L`} className={labelClasses} > 
                {parseInt(this.props.lanState) === 2 ? <span id={`${field.id}_LAss`}></span> : null}
                    {labelContent}
                    </label>
                    <input 
                    autoComplete="off"
                    className={inputDisable}
                    disabled={field.writability}
                    type="text"  
                    id={field.id} 
                    value={this.state.value}
                    onChange = {(e) => this.setState({value: e.target.value})}
                    onFocus={() => handleLable(field.id, "f", style)}
                    onBlur={(e)=> handleLable(field.id, "b", style, e, this.props.changeHandler, this.state.value)}
                    list={`${field.id}_list`}/>
                    <datalist id={`${field.id}_list`}>
                        <option value="1"></option>
                        <option value="2"></option>
                    </datalist>
                </div>
        </div>
        )
    }
}

const checkfocus = (field_id ,newValue) => {
    // console.log(field_id)
    const label_id = `${field_id}_L`
    const label = document.getElementById(label_id)
    const input = document.getElementById(field_id)
    if(newValue === ""){
        labelDown(label)
        toggleClass(input, style.unFocus, style.focus)
    }
}

const handleLable = (field_id, mode, style, e, changeHandler) => {
    // console.log(field_id)
    const label_id = `${field_id}_L`
    const label = document.getElementById(label_id)
    const input = document.getElementById(field_id)
    const spanAss = document.getElementById(`${label_id}Ass`)
    if(mode === "f"){
        labelUp(label, spanAss)
        input.classList.add(style.focus)
    }else{
        // on blur handler
        changeHandler(e, field_id)
        if(input.value === ""){
            labelDown(label, spanAss)
            toggleClass(input, style.unFocus, style.focus)
        }
    }
}



const labelDown = (ele,span) => {
    const styleObj = {
        top: "3.20rem",
        left: "2rem",
        fontSize: "2rem",
        color:"rgba(0, 0, 0, 0.54)"
    }
    if(span){span.style.display = "none"}
    applyStyle(ele, styleObj)
    toggleClass(ele, style.inactive, style.active)
}
const labelUp = (ele, span) => {
    const styleObj = {
        top: 0,
        left: "2rem",
        fontSize: '1.5rem',
        color:"#3F51B5"
    }
    if(span){span.style.display = "inline-block"}
    applyStyle(ele, styleObj)
    toggleClass(ele, style.active, style.inactive)
}

const toggleClass = (ele, addClass, removeClass) => {
    ele.classList.add(addClass)
    ele.classList.remove(removeClass)
}

const applyStyle = (ele, styleObj) => {
    for(const prop in styleObj){
        ele.style[prop] = styleObj[prop]
    }
}

const mapStateToProps = state => {
    return {
        lanState: state.lang.lan,
        lanTable: state.lang.langTables
    }
}


export default connect(mapStateToProps, null)(InputSelectField);