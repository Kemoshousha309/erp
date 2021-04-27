import React from "react"
import { connect } from "react-redux"
import { t } from "../../../utilities/lang"
import style from "./InputField.module.scss"
import { Component } from "react";
import { changeHandler, label, checkInputValiditiy, reflectOuterState } from "../../../utilities/inputs"



class InputField extends Component {
    state = {
        value: "", 
        valid: true,
        invalidFeedBack: null,
        lastPropValue: null,
        lastPropValid: null,
    }
    inputChange = (e) => changeHandler(e, this, this.props.field.changeHandler) 
    static getDerivedStateFromProps(props, state){
        return reflectOuterState(props, state)
    }
    
    render() {
        // console.log(`[InputSelectField] render`, this.state)
        const field = this.props.field
        // console.log(field)
        const placeholder = t(this.props.field.label, this.props.lanTable, this.props.lanState)
        let [invalidMessage, invalidInputStyle] = checkInputValiditiy(this, style)
        return (
            <div className={["form-group" ,style.inputField].join(' ')}>
                <label htmlFor={field.id} className="col-sm-4 col-form-label">{label(this)}</label>
                <div className="col-sm-8">
                    <input 
                    value={this.state.value}
                    onChange = {this.inputChange}
                    onBlur ={(e) => this.props.changeHandler(this.state, field.id)} 
                    autoComplete="off"
                    disabled={!field.writability}
                    type={field.type} 
                    className={["form-control", invalidInputStyle].join(" ")}
                    id={field.id} 
                    placeholder={placeholder} />
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


export default connect(mapStateToProps, null)(InputField);
