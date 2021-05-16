import React, { Component } from "react";
import { connect } from "react-redux";
import style from "./MainScreen.module.scss";
import { Route, Switch } from "react-router";
import Aux from "../../hoc/wrap";
import asyncComponent from "../../utilities/asyncComponent";

const AsyncUsers = asyncComponent(() => import("../Screens/Users/Users"))
const AsyncUsersGroups = asyncComponent(() => import("../Screens/UsersGroups/UsersGroups"))
const AsyncInternalCoding = asyncComponent(() => import( "../Screens/InternalCoding/InternalCoding"))


class MainScreen extends Component  {
    componentDidUpdate(){
        // console.log("MainScreen render")
    }
    render(){

        let lanState;
        if(parseInt(this.props.lanState) === 2){
            lanState = style.arState;
        } else if(parseInt(this.props.lanState) === 1) {
            lanState = style.enState;
        }
        const classes = [style.MainScreen,
            lanState
        ].join(" ");

        const rootPath = this.props.match.path;
        
        return(
            <Aux>
                <div className={classes} >
                    <Switch>
                        <Route path={rootPath +"/internal-coding"} exact component={AsyncInternalCoding} />
                        <Route path={rootPath +"/users-groups"} exact component={AsyncUsersGroups} />
                        <Route path={rootPath +"/users-data"} exact component={AsyncUsers} />
                    </Switch>
                </div>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        lanState: state.lang.lan,
        lanTable: state.lang.langTables
    }
}



export default connect(mapStateToProps, null)(MainScreen);