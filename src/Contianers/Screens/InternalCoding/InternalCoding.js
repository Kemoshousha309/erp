import React, { Component } from "react";
import SelectDrop from "../../../Components/UI/SelectDrop/SelectDrop";
import MenuItem from '@material-ui/core/MenuItem';
import {t} from "../../../utilities/lang"
import { connect } from "react-redux";
import asyncComponent from "../../../utilities/asyncComponent";

const AsyncLanguage = asyncComponent(() => import("./Taps/Language"))
const AsyncMassage = asyncComponent(() => import("./Taps/Massage"))
const AsyncModule = asyncComponent(() => import("./Taps/Module"))
const AsyncForms = asyncComponent(() => import("./Taps/Forms"))
const AsyncFlags = asyncComponent(() => import("./Taps/Flags"))
const AsyncLabel = asyncComponent(() => import("./Taps/label"))



class InternalCoding extends Component {
    state={
        tapOptions: ["label", "language", "message", "form", "module", "flag"], // these options is static just for now
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
            case  "language": return <AsyncLanguage dropDown={dropDown} />
            case  "label": return <AsyncLabel dropDown={dropDown} />
            case  "message": return <AsyncMassage dropDown={dropDown} />
            case  "form": return <AsyncForms dropDown={dropDown} />
            case  "module": return <AsyncModule dropDown={dropDown} />
            case  "flag": return <AsyncFlags dropDown={dropDown} />
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

