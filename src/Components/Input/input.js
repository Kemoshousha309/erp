import InputTextField from "./TextField/InputTextField"
import React from "react";
import { connect } from "react-redux";
import { Component } from "react";
import InputSelectField from "./SelectField/InputSelectField";
import InputField  from "./InputField/InputField";




class Input extends Component {
    selectInputHandler = () => {
        const field = this.props.field
        switch (field.fieldType) {
            case "input":
                return <InputTextField 
                changeHandler={this.props.changeHandler}
                field={field}/>
            case "select":
                return <InputSelectField  
                changeHandler={this.props.changeHandler}
                field={field}/>
            default:
                break;  
        }
    }
    render (){
        // console.log("[Input] render")
        // return this.selectInputHandler()
        return <InputField field={this.props.field} changeHandler={this.props.changeHandler}/>
    }
} 

const mapStateToProps = state => {
    return {
        lanState: state.lang.lan,
        lanTable: state.lang.langTables
    }
}


export default connect(mapStateToProps, null)(Input);