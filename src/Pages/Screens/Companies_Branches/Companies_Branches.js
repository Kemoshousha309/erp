import React, { Component, Suspense } from "react";
import SelectDrop from "../../../Components/UI/SelectDrop/SelectDrop";
import {MenuItem} from "@mui/material";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import SkeletonLoader from "../../../Components/UI/SkeletonLoader/SkeletonLoader";
import { t } from "../../../Helpers/lang";


const CompaniesGroups = React.lazy(() =>
  import("./Taps/CompaniesGroups")
);
const Comapnies = React.lazy(() => import("./Taps/Comapnies"));
const Branches = React.lazy(() => import("./Taps/Branches"));

class Companies_Branches extends Component {
  state = {
    currentTap: "company_groups",
    dropDownChange: false,
  };

  onChangeHandler = (event) => {
    this.setState({ currentTap: event.target.value, dropDownChange: true });
  };

  render() {
    const flags = this.props.flag_details.filter(
      (i) => i.flag_code === "companies_and_branches"
    );
    const flagLabels = flags.map((i) => i.label_code);

    const dropDown = (
      <SelectDrop
        current={this.state.currentTap}
        changed={this.onChangeHandler}
      >
        {flagLabels.map((ele) => {
          return (
            <MenuItem key={ele} value={ele}>
              {t(ele, this.props.lanTable, this.props.lanState).toUpperCase()}
            </MenuItem>
          );
        })}
      </SelectDrop>
    );
    let content = null;
    switch (this.state.currentTap) {
      case "company_groups":
        content = <CompaniesGroups {...this.props} dropDown={dropDown} />;
        break;
      case "companys":
        content = <Comapnies {...this.props} dropDown={dropDown} />;
        break;
      case "branches":
        content = <Branches {...this.props} dropDown={dropDown} />;
        break;
      default:
        content = <h1>Not Exist</h1>;
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

export default connect(mapStateToProps, null)(withRouter(Companies_Branches));
