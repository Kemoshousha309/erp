import React, { Component } from "react";
import SelectDrop from "../../../Components/UI/SelectDrop/SelectDrop";
import MenuItem from '@material-ui/core/MenuItem';
import {t} from "../../../utilities/lang"
import { connect } from "react-redux";
import asyncComponent from "../../../utilities/asyncComponent";
import { withRouter } from "react-router";

const AsyncCompaniesGroups = asyncComponent(() => import("./Taps/CompaniesGroups"))
const AsyncComapnies = asyncComponent(() => import("./Taps/Comapnies"))
const AsyncBranches = asyncComponent(() => import("./Taps/Branches"))



class Companies_Branches extends Component {
    state={
        currentTap: "company_groups",
        dropDownChange: false,
    }

    onChangeHandler = (event) => {
        this.setState({currentTap: event.target.value, dropDownChange: true})
    }

    render(){
        const flags = this.props.flag_details.filter(i => i.flag_code === "companies_and_branches");
        const flagLabels = flags.map(i => i.label_code);
        
        const dropDown = (
            <SelectDrop current={this.state.currentTap} changed={this.onChangeHandler}>
                {flagLabels.map(ele => {
                    return <MenuItem key={ele} value={ele} >{t(ele, this.props.lanTable, this.props.lanState).toUpperCase()}</MenuItem>
                })}
            </SelectDrop>
        )
        switch(this.state.currentTap){
            case  "company_groups": return <AsyncCompaniesGroups {...this.props} dropDown={dropDown} />
            case  "companys": return <AsyncComapnies {...this.props} dropDown={dropDown} />
            case  "branches": return <AsyncBranches {...this.props} dropDown={dropDown} />
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


export default connect(mapStateToProps, null)(withRouter(Companies_Branches));

