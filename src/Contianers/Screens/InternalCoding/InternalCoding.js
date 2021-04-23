import React, { Component } from "react";
import Label from "./Taps/label";
import SelectDrop from "../../../Components/UI/SelectDrop/SelectDrop";
import MenuItem from '@material-ui/core/MenuItem';
import {t} from "../../../utilities/lang"
import { connect } from "react-redux";
import Language from "./Taps/Language";
import Massage from "./Taps/Massage";
import Module from "./Taps/Module";
import Forms from "./Taps/Forms";



class InternalCoding extends Component {
    state={
        tapOptions: ["label", "language", "message", "form", "module"],
        currentTap: "label",
        dropDownChange: false,
    }

    onChangeHandler = (event) => {
        this.setState({currentTap: event.target.value, dropDownChange: true})
    }

    // static getDerivedStateFromProps(props, state){
    //     if(state.dropDownChange){
    //         return {
    //             dropDownChange: false
    //         }
    //     }else{
    //         return {
    //             currentTap: getParam(props.history.location.search),
    //             dropDownChange: false
    //         }
    //     }
    // }
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
        switch(this.state.currentTap){
            case  "language": return <Language dropDown={dropDown} />
            case  "label": return <Label dropDown={dropDown} />
            case  "message": return <Massage dropDown={dropDown} />
            case  "form": return <Forms dropDown={dropDown} />
            case  "module": return <Module dropDown={dropDown} />
            default: return null
        }
          
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

