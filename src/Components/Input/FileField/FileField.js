import React from "react"
import { connect } from "react-redux"
import { t } from "../../../utilities/lang"
import style from "./FileField.module.scss"
import { Component } from "react";
import { changeHandler, label, checkInputValiditiy, reflectOuterState } from "../../../utilities/inputs"



class FileField extends Component {
    state = {
        value: "", 
        valid: true,
        invalidFeedBack: null,
        lastPropValue: null,
        lastPropValid: null,
        passIconOpen: true,
        displayValue: ""
    }
    inputChange = (e) => changeHandler(e, this, this.props.field.changeHandler, this.props.field.changeHandler2) 
    static getDerivedStateFromProps(props, state){
        return reflectOuterState(props, state)
    }
    onBlurHandler = () => {
        const field = this.props.field
            this.props.changeHandler(this.state, field.id)
    }   
    
    render() {
        // console.log(`[InputSelectField] render`, this.state)
        const field = this.props.field
        const placeholder = t(this.props.field.label, this.props.lanTable, this.props.lanState)
        let [invalidMessage, invalidInputStyle] = checkInputValiditiy(this, style)

        // style 
        const classes = [style.fileinput, invalidInputStyle];
        if(!field.writability) {
            classes.push(style.disabled)
        }else{
            classes.push(style.active)
        }

        return (
            <div className={["form-group" ,style.FileField].join(' ')}>
                <label 
                title={t(this.props.field.label, this.props.lanTable, this.props.lanState)} 
                className="col-sm-4 col-form-label">{label(this)}</label>
                <div className="col-sm-8">
                   <div className="position-relative">
                        {
                            this.state.value ? <img src={this.state.value} alt={this.state.value}></img> : null
                        }
                       <label  title={t(this.props.field.label, this.props.lanTable, this.props.lanState)} 
                            htmlFor={field.id} 
                            className={classes.join(" ")}> 
                            select file
                            <input 
                                onChange = {this.inputChange}   
                                onBlur ={this.onBlurHandler} 
                                autoComplete="off"
                                disabled={!field.writability}
                                type="file" 
                                id={field.id} 
                                placeholder={placeholder} />
                        </label>
                   </div>
                    {invalidMessage}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        lanState: state.lang.lan,
        lanTable: state.lang.langTables,
        languages: state.lang.langInfo
    }
}


export default connect(mapStateToProps, null)(FileField);
