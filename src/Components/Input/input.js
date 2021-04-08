import InputTextField from "./TextField/InputTextField"
import React from "react";
import { connect } from "react-redux";
import { Component } from "react";
import InputSelectField from "./SelectField/InputSelectField";



class Input extends Component {
    selectInputHandler = () => {
        const field = this.props.field
        switch (field.inputType) {
            case "text":
                return <InputTextField 
                changeHandler={this.props.changeHandler}
                field={field}/>
            case "text&select":
                return <InputSelectField  
                changeHandler={this.props.changeHandler}
                field={field}/>
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