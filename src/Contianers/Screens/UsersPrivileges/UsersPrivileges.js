import React, { Component } from "react";
import Boilerplate from "../../../Components/Boilerplate/Boilerplate";
import Users from "./Taps/Users";
import UsersGroups from "./Taps/UsersGroups";

class UsersPrivileges extends Component {
    state={
        tapOptions: ["Users Groups", "Users", "Screen Privilege's"],
        currentTap: "Users"
    }
    onChangeHandler = (event) => {
        this.setState({currentTap: event.target.value})
    }

    render(){
        let currentTap = null;
        switch(this.state.currentTap){
            case "Users Groups":
                currentTap = <UsersGroups />
                break
            case "Users": 
                currentTap = <Users />
                break
            default:
                currentTap = <Users />
        }
        return(
            <Boilerplate 
            change={this.onChangeHandler}
            currentTap={this.state.currentTap}
            tapOptions={this.state.tapOptions} >
                {currentTap}
            </Boilerplate>
        )
    }
} 

export default UsersPrivileges;