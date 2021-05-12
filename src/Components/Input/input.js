import React from "react";
import { connect } from "react-redux";
import { Component } from "react";
import InputField  from "./InputField/InputField";
import SelectField from "./SelectField/SelectField";
import CheckBoxField from "./CheckBoxField/CheckBoxField";
import AsyncSelectField from "./AsyncSelectField/AsyncSelectField"
import TextArea from "./TextArea/TextArea"


class Input extends Component {
    selectInputHandler = () => {
        const field = this.props.field
        switch (field.fieldType) {
            case "input":
                return <InputField field={this.props.field} changeHandler={this.props.changeHandler} thisK={this.props.thisK}/>
            case "select":
                return <SelectField field={this.props.field} changeHandler={this.props.changeHandler} thisK={this.props.thisK} />
            case "checkbox":
                return <CheckBoxField field={this.props.field} changeHandler={this.props.changeHandler}  thisK={this.props.thisK}/>
            case "asyncSelect":
                return <AsyncSelectField field={this.props.field} changeHandler={this.props.changeHandler} thisK={this.props.thisK} />
            case "textarea":
                return <TextArea field={this.props.field} changeHandler={this.props.changeHandler} thisK={this.props.thisK}/>
            default:
                return <div></div>  
        }
    }
    render (){
        // console.log("[Input] render")
        return this.selectInputHandler()
    }
} 

const mapStateToProps = state => {
    return {
        lanState: state.lang.lan,
        lanTable: state.lang.langTables
    }
}

export default connect(mapStateToProps, null)(Input);