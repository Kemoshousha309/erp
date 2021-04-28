import React, { Component } from "react";
import { connect } from "react-redux";
import style from "./MainScreen.module.scss";
import { Route, Switch } from "react-router";
import Aux from "../../hoc/Aux";
import InternalCoding from "../Screens/InternalCoding/InternalCoding";
import Users from "../Screens/Users/Users";


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
                        {/* <Route path={rootPath +"/users-privileges"} exact component={UsersPrivileges} /> */}
                        <Route path={rootPath +"/internal-coding"} exact component={InternalCoding} />
                        {/* <Route path={rootPath +"/users-groups"} exact component={UsersGroups} /> */}
                        <Route path={rootPath +"/users-data"} exact component={Users} />
                        <Route path={rootPath +"/screen-previlleges"} exact component={InternalCoding} />
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