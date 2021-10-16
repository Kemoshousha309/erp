import React, { Component } from "react";
import SelectDrop from "../../../Components/UI/SelectDrop/SelectDrop";
import MenuItem from "@material-ui/core/MenuItem";
import { t } from "../../../utilities/lang";
import { connect } from "react-redux";
import asyncComponent from "../../../utilities/asyncComponent";
import { withRouter } from "react-router";

const AsyncAccountsGroup = asyncComponent(() => import("./Taps/AccountsGroup"));
const AsyncCostCenterGroup = asyncComponent(() => import("./Taps/CostCenterGroup"));


class InternalCoding extends Component {
  state = {
    currentTap: "accounts_group",
    dropDownChange: false,
  };

  onChangeHandler = (event) => {
    this.setState({ currentTap: event.target.value, dropDownChange: true });
  };

  render() {
      const {
        props: {flag_details, lanState, lanTable},
        state: {currentTap}
      } = this
    const flags = flag_details.filter(
      (i) => i.flag_code === "financial_coding"
    );
    const flagLabels = flags.map((i) => i.label_code);

    const dropDown = (
      <SelectDrop
        current={currentTap}
        changed={this.onChangeHandler}
      >
        {flagLabels.map((ele) => {
          return (
            <MenuItem key={ele} value={ele}>
              {t(ele, lanTable, lanState).toUpperCase()}
            </MenuItem>
          );
        })}
      </SelectDrop>
    );
    switch (currentTap) {
      case "accounts_group":
        return <AsyncAccountsGroup {...this.props} dropDown={dropDown} />;  
      case "cost_center_group":
        return <AsyncCostCenterGroup {...this.props} dropDown={dropDown} />;  
      default:
        return <h1>Not Exist</h1>;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    lanState: state.lang.lan,
    lanTable: state.lang.langTables,
    token: state.auth.authData.token,
    languages: state.lang.langInfo,
    flag_details: state.auth.authData.flag_detail_main_tree,
  };
};

export default connect(mapStateToProps, null)(withRouter(InternalCoding));
