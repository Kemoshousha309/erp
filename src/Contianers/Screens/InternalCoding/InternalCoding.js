import React, { Component } from "react";
import Aux from "../../../hoc/Aux";
import { getParam } from "../../../utilities/utilities";
import Label from "./Taps/label";
import SelectDrop from "../../../Components/UI/SelectDrop/SelectDrop";
import MenuItem from '@material-ui/core/MenuItem';
import {t} from "../../../utilities/lang"
import { connect } from "react-redux";



class InternalCoding extends Component {
    state={
        tapOptions: ["label", "language", "message", "form", "module"],
        currentTap: null,
        dropDownChange: false,
    }

    onChangeHandler = (event) => {
        this.setState({currentTap: event.target.value, dropDownChange: true})
    }

    static getDerivedStateFromProps(props, state){
        if(state.dropDownChange){
            return {
                dropDownChange: false
            }
        }else{
            return {
                currentTap: getParam(props.history.location.search),
                dropDownChange: false
            }
        }
    }
    componentDidUpdate(){
        // console.log("InternalCoding Updated")
    }
    render(){
        const dropDown = (
            <SelectDrop current={this.state.currentTap} changed={this.onChangeHandler}>
                {this.state.tapOptions.map(ele => {
                    return <MenuItem key={ele} value={ele} >{t(ele, this.props.lanTable, this.props.lanState).toUpperCase()}</MenuItem>
                })}
            </SelectDrop>
        )
        let currentTap = null;
        switch(this.state.currentTap){
            case  "language":
                currentTap = <h1>language</h1>
                break
            case  "label":
                currentTap = <Label dropDown={dropDown} />
                break
            case  "message":
                currentTap = <h1>Messages</h1>
                break
            case  "forms":
                currentTap = <h1>Forms</h1>
                break
            default:
                currentTap = null
        }
        return(
            <Aux>
                {currentTap}
           </Aux>
        )
    }
} 

const mapStateToProps = state => {
    return {
        lanState: state.lang.lan,
        lanTable: state.lang.langTables,
        token: state.auth.authData.token,
        languages: state.lang.langInfo
    }
}


export default connect(mapStateToProps, null)(InternalCoding);

