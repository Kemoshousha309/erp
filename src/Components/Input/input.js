import React from "react";
import { connect } from "react-redux";
import { Component } from "react";
import InputField  from "./InputField/InputField";
import SelectField from "./SelectField**/SelectField";




class Input extends Component {
    selectInputHandler = () => {
        const field = this.props.field
        switch (field.fieldType) {
            case "input":
                return <InputField field={this.props.field} changeHandler={this.props.changeHandler}/>
            case "select":
                return <SelectField field={this.props.field} changeHandler={this.props.changeHandler} />
            default:
                break;  
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