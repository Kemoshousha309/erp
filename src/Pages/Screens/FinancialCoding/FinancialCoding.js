import React, { Component, Suspense } from "react";
import SelectDrop from "../../../Components/UI/SelectDrop/SelectDrop";
import {MenuItem} from "@mui/material";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import SkeletonLoader from "../../../Components/UI/SkeletonLoader/SkeletonLoader";
import { t } from "../../../Helpers/lang";


const AccountsGroup = React.lazy(() => import("./Taps/AccountsGroup"));
const CostCenterGroup = React.lazy(() => import("./Taps/CostCenterGroup"));


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
    let content = null;
    switch (currentTap) {
      case "accounts_group":
        content = <AccountsGroup {...this.props} dropDown={dropDown} />;   break;
      case "cost_center_group":
        content = <CostCenterGroup {...this.props} dropDown={dropDown} />;   break;
      default:
        content = <h1>Not Exist</h1>; break;
    }
    return (
      <Suspense fallback={<SkeletonLoader type="Bp" />}>
        {content}
      </Suspense>
    );
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
