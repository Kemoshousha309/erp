import React from "react"
import { connect } from "react-redux"
import style from "./CheckBoxField.module.scss"
import { Component } from "react";
import {  label, reflectOuterState } from "../../../utilities/inputs"
import { t } from "../../../utilities/lang";



class CheckBoxField extends Component {
    state = {
        value: false, 
        valid: true,
        invalidFeedBack: null,
        lastPropValue: null,
        lastPropValid: null,
    }
    inputChange = (e) => {
        const currentValue = this.state.value
        this.setState({value: !currentValue})
    }
    static getDerivedStateFromProps(props, state){
        return reflectOuterState(props, state)
    }
    
    render() {
        // console.log(`[InputSelectField] render`, this.state)
        const field = this.props.field
        return (
            <div className={["form-group" ,style.checkboxField].join(' ')}>
                <label 
                title={t(this.props.field.label, this.props.lanTable, this.props.lanState)} 
                  htmlFor={field.id} 
                  className="col-sm-4 col-form-label">{label(this)}</label>
                <div className="col-sm-8">
                    <input 
                    checked={this.state.value}
                    onChange = {this.inputChange}
                    onBlur ={(e) => this.props.changeHandler(this.state, field.id)} 
                    disabled={!field.writability}
                    type={field.type} 
                    className={["form-control", style.checkboxInput].join(" ")}
                    id={field.id} />
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


export default connect(mapStateToProps, null)(CheckBoxField);