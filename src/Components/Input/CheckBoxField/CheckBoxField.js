import React, { PureComponent } from "react"
import { connect } from "react-redux"
import style from "./CheckBoxField.module.scss"
import {  label, reflectOuterState } from "../../../Helpers/inputs"
import { t } from "../../../Helpers/lang";
import { Checkbox } from "@mui/material";



class CheckBoxField extends PureComponent {
    state = {
        value: false, 
        valid: true,
        invalidFeedBack: null,
        lastPropValue: null,
        lastPropValid: null,
    }

    inputChange = (e, handler) => {
        const currentValue = this.state.value
        this.setState({value: !currentValue})
        if(handler) {
            handler(!currentValue, this)
        }
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
                    <Checkbox 
                    color="primary"
                    checked={Boolean(this.state.value)}
                    onChange = {(e) => this.inputChange(e, field.changeHandler)}
                    onBlur ={(e) => this.props.changeHandler(this.state, field.id)} 
                    disabled={!field.writability}
                    className={[style.checkboxInput].join(" ")}
                    id={field.id}
                    />
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