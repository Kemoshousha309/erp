import React, { Component } from "react";
import { getParam } from "../../../utilities";
import Labels from "./Taps/label";
import SelectDrop from "../../../Components/UI/SelectDrop/SelectDrop";
import MenuItem from '@material-ui/core/MenuItem';

class InternalCoding extends Component {
    state={
        tapOptions: ["label", "language", "message", "forms", "modules"],
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
        console.log("InternalCoding Updated")
    }
    render(){
       
        let currentTap = null;
        switch(this.state.currentTap){
            case  "language":
                currentTap = <h1>language</h1>
                break
            case  "label":
                currentTap = <Labels dropDown={dropDown} />
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
        return currentTap
    }
} 

export default InternalCoding;