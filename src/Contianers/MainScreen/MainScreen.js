import React, { Component } from "react";
import { connect } from "react-redux";
import style from "./MainScreen.module.scss";
import { Route, Switch } from "react-router";
import Aux from "../../hoc/Aux";
import InternalCoding from "../Screens/InternalCoding*/InternalCoding";


class MainScreen extends Component  {
    componentDidUpdate(){
        // console.log("MainScreen render")
    }
    render(){
          // this is the container of the screens
        // here we will manage the router pages here 
        // identication the language state
        let lanState;
        if(parseInt(this.props.lanState) === 2){
            lanState = style.arState;
        } else if(parseInt(this.props.lanState) === 1) {
            lanState = style.enState;
        }
        const classes = [style.MainScreen,
            // props.sideNavActivity ? style.active : style.inactive,
            lanState
        ].join(" ");

        const rootPath = this.props.match.path;
        
        return(
            <Aux>
                <div className={classes} >
                    <Switch>
                        {/* <Route path={rootPath +"/users-privileges"} exact component={UsersPrivileges} /> */}
                        <Route path={rootPath +"/internal-coding"} exact component={InternalCoding} />
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