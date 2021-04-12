import React from "react"
import { connect } from "react-redux"
import { t } from "../../../utilities/lang"
import style from "./InputTextField.module.scss"
import { TextField } from "@material-ui/core";
import { Component } from "react";


class InputTextField extends Component {
    state = {
        value: "", 
        lastPropValue: null
    }
    changeHandler = (e) => {
        if(this.props.field.id === "lang_no"){
            const langNameInput = document.getElementById("lang_no_name")
        langNameInput.value = e.target.value
        }
        this.setState({value: e.target.value})
    } 
    static getDerivedStateFromProps(props, state){
        if(state.lastPropValue !== props.field.value){
            return{
                value: props.field.value,
                lastPropValue: props.field.value
            }
        }
        return null
    }
  render() {
    const field = this.props.field
    // console.log(`[TextField] render`, this.state)
    return (
        <div className={style.container}>
            {field.validation.requiered ? <div className={style.required}></div> : null}
            <TextField 
            type={field.type ? field.type : "text"}
            error={!field.readOnly ? !field.valid : false}
            autoComplete="off"
            required={field.validation.requiered ? true : false}
            disabled={field.writability}
            value={this.state.value}
            variant="outlined" fullWidth 
            onChange = {(this.changeHandler)}
            onBlur ={(e) => this.props.changeHandler(this.state.value, field.id)} 
            id={field.id}  
            className={style.input}
            label={t(field.label, this.props.lanTable, this.props.lanState)} />
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


export default connect(mapStateToProps, null)(InputTextField);

