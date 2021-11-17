import React, { Component } from "react";
import SelectDrop from "../../../Components/UI/SelectDrop/SelectDrop";
import MenuItem from '@material-ui/core/MenuItem';
import {t} from "../../../utilities/lang"
import { connect } from "react-redux";
import asyncComponent from "../../../utilities/asyncComponent";
import { withRouter } from "react-router";
import Boilerplate from "../../../Components/Boilerplate/Boilerplate";


const AsyncBranches = asyncComponent(() => import("./Taps/Branches"))
const AsyncAccountsChart = asyncComponent(() => import("./Taps/AccountsChart"))
const AsyncCostCenter = asyncComponent(() => import("./Taps/CostCenter"))



class InputPrivs extends Component {
    state={
        tapOptions: ["select_screen",  "branches", "acc_chart", "cost_center"], // these options is static just for now
        currentTap: "select_screen",
        dropDownChange: false,
    }

    onChangeHandler = (event) => {
        this.setState({currentTap: event.target.value, dropDownChange: true})
    }

    render(){        
        // here we render static options
        const dropDown = (
            <SelectDrop current={this.state.currentTap} changed={this.onChangeHandler}>
                {this.state.tapOptions.map(ele => {
                    return <MenuItem key={ele} value={ele} >{t(ele, this.props.lanTable, this.props.lanState).toUpperCase()}</MenuItem>
                })}
            </SelectDrop>
        )
        
        switch(this.state.currentTap){
            case  "branches": return <AsyncBranches {...this.props} dropDown={dropDown} />
            case  "acc_chart": return <AsyncAccountsChart {...this.props} dropDown={dropDown} />
            case  "cost_center": return <AsyncCostCenter {...this.props} dropDown={dropDown} />
            case  "select_screen": return <Boilerplate dropDown={dropDown} />
            default: return <h1>Not Exist</h1>
        }
          
    }
} 



const mapStateToProps = state => {
    return {
        lanState: state.lang.lan,
        lanTable: state.lang.langTables,
        token: state.auth.authData.token,
        languages: state.lang.langInfo,
        flag_details: state.auth.authData.flag_detail_main_tree
    }
}


export default connect(mapStateToProps, null)(withRouter(InputPrivs));

