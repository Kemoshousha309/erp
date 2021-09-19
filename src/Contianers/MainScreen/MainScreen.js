import React, { Component } from "react";
import { connect } from "react-redux";
import style from "./MainScreen.module.scss";
import { Route, Switch } from "react-router";
import Aux from "../../hoc/wrap";
import asyncComponent from "../../utilities/asyncComponent";

const AsyncUsers = asyncComponent(() => import("../Screens/Users/Users"))
const AsyncUsersGroups = asyncComponent(() => import("../Screens/UsersGroups/UsersGroups"))
const AsyncInternalCoding = asyncComponent(() => import( "../Screens/InternalCoding/InternalCoding"))
const AsyncGeographicalData = asyncComponent(() => import( "../Screens/GeographicalData/GeographicalData"))
const AsyncCompanies_Branches = asyncComponent(() => import( "../Screens/Companies_Branches/Companies_Branches"))
const AsyncScreenPrivs = asyncComponent(() => import( "../Screens/ScreenPrivs/ScreenPrivs"))
const AsyncInputPrivs = asyncComponent(() => import( "../Screens/InputPrivs/InputPrivs"))
const AsyncSystemCommands = asyncComponent(() => import( "../Screens/SystemCommands/SystemCommands.js"))


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
                        <Route path={rootPath +"/geographical-data"} exact component={AsyncGeographicalData} />
                        <Route path={rootPath +"/companies-barnches"} exact component={AsyncCompanies_Branches} />
                        <Route path={rootPath +"/users-groups"} exact component={AsyncUsersGroups} />
                        <Route path={rootPath +"/users-data"} exact component={AsyncUsers} />
                        <Route path={rootPath +"/screen-previlleges"} exact component={AsyncScreenPrivs} />
                        <Route path={rootPath +"/input-previlleges"} exact component={AsyncInputPrivs} />
                        <Route path={rootPath +"/system-commands"} exact component={AsyncSystemCommands} />
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