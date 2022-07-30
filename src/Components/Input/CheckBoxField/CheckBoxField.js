import React, { PureComponent } from "react"
import style from "./CheckBoxField.module.scss"
import {  label, reflectOuterState } from "../../../Helpers/inputs"
import { Checkbox } from "@mui/material";
import { t } from "../../../Languages/languages";



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
                title={t(this.props.field.label)} 
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


export default CheckBoxField;