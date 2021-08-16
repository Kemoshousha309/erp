import React, { Component } from "react";
import SelectDrop from "../../../Components/UI/SelectDrop/SelectDrop";
import MenuItem from '@material-ui/core/MenuItem';
import {t} from "../../../utilities/lang"
import { connect } from "react-redux";
import asyncComponent from "../../../utilities/asyncComponent";
import { withRouter } from "react-router";

const Region = asyncComponent(() => import("./Taps/Region"))
const AsyncCountry = asyncComponent(() => import("./Taps/Country"))
const AsyncProvince = asyncComponent(() => import("./Taps/Province"))
const AsyncCity = asyncComponent(() => import("./Taps/City"))
const AsyncZone = asyncComponent(() => import("./Taps/Zone"))



class GeographicalData extends Component {
    state={
        currentTap: "region",
        dropDownChange: false,
    }

    onChangeHandler = (event) => {
        this.setState({currentTap: event.target.value, dropDownChange: true})
    }

    render(){
        const flags = this.props.flag_details.filter(i => i.flag_code === "geographical_coding");
        const flagLabels = flags.map(i => i.label_code);
        

        const dropDown = (
            <SelectDrop current={this.state.currentTap} changed={this.onChangeHandler}>
                {flagLabels.map(ele => {
                    return <MenuItem key={ele} value={ele} >{t(ele, this.props.lanTable, this.props.lanState).toUpperCase()}</MenuItem>
                })}
            </SelectDrop>
        )
        switch(this.state.currentTap){
            case  "region": return <Region {...this.props} dropDown={dropDown} />
            case  "country": return <AsyncCountry {...this.props} dropDown={dropDown} />
            case  "province": return <AsyncProvince {...this.props} dropDown={dropDown} />
            case  "city": return <AsyncCity {...this.props} dropDown={dropDown} />
            case  "zone": return <AsyncZone {...this.props} dropDown={dropDown} />
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


export default connect(mapStateToProps, null)(withRouter(GeographicalData));

