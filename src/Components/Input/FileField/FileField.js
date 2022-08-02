import React, { PureComponent } from "react"
import style from "./FileField.module.scss"
import { changeHandler, label, checkInputValidity, reflectOuterState } from "../../../Helpers/inputs"
import { t } from "../../../Languages/languages"



class FileField extends PureComponent {
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
        const placeholder = t(this.props.field.label)
        let [invalidMessage, invalidInputStyle] = checkInputValidity(this, style)

        // style 
        const classes = [style.fileInput, invalidInputStyle, style.innerLabel];
        if(!field.writability) {
            classes.push(style.disabled)
        }else{
            classes.push(style.active)
        }

        return (
            <div className={["form-group" ,style.FileField].join(' ')}>
                <label 
                
                title={t(this.props.field.label)} 
                className={["col-sm-4 col-form-label", style.outerLabel]}>{label(this)}</label>
                <div className="col-sm-8">
                   <div className="position-relative">
                        {
                            this.state.value ? <img src={this.state.value} alt={this.state.value}></img> : null
                        }
                       <label  title={t(this.props.field.label)} 
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


export default FileField;
