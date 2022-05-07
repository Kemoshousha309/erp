import React, { Component, Suspense } from "react";
import SelectDrop from "../../../Components/UI/SelectDrop/SelectDrop";
import {MenuItem} from '@mui/material';
import {t} from "../../../utilities/lang"
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Boilerplate from "../../../Components/Boilerplate/Boilerplate";
import SkeletonLoader from "../../../Components/UI/SkeletonLoader/SkeletonLoader";


const Branches = React.lazy(() => import("./Taps/Branches"))
const AccountsChart = React.lazy(() => import("./Taps/AccountsChart"))
const CostCenter = React.lazy(() => import("./Taps/CostCenter"))



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
        let content = null;
        switch(this.state.currentTap){
            case  "branches": content =  <Branches {...this.props} dropDown={dropDown} />; break;
            case  "acc_chart": content =  <AccountsChart {...this.props} dropDown={dropDown} />; break;
            case  "cost_center": content =  <CostCenter {...this.props} dropDown={dropDown} />; break;
            case  "select_screen": content =  <Boilerplate dropDown={dropDown} />; break;
            default: content =  <h1>Not Exist</h1>
        }
        return (
            <Suspense fallback={<SkeletonLoader type="Bp" />}>
              {content}
            </Suspense>
          ); 
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

