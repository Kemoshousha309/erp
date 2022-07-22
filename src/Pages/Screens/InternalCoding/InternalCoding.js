import React, { Component, Suspense } from "react";
import SelectDrop from "../../../Components/UI/SelectDrop/SelectDrop";
import {MenuItem} from "@mui/material";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import SkeletonLoader from "../../../Components/UI/SkeletonLoader/SkeletonLoader";
import { t } from "../../../Helpers/lang";


const Language = React.lazy(() => import("./Taps/Language"));
const Massage = React.lazy(() => import("./Taps/Massage"));
const Module = React.lazy(() => import("./Taps/Module"));
const Forms = React.lazy(() => import("./Taps/Forms"));
const Flags = React.lazy(() => import("./Taps/Flags"));
const Label = React.lazy(() => import("./Taps/label"));

class InternalCoding extends Component {
  state = {
    tapOptions: ["label", "language", "message", "form", "module", "flag"], // these options is static just for now
    currentTap: "label",
    dropDownChange: false,
  };

  onChangeHandler = (event) => {
    this.setState({ currentTap: event.target.value, dropDownChange: true });
  };

  render() {
    const flags = this.props.flag_details.filter(
      (i) => i.flag_code === "internal_coding"
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
      case "language":
        content = <Language {...this.props} dropDown={dropDown} />; break;
      case "label":
        content = <Label {...this.props} dropDown={dropDown} />; break;
      case "message":
        content = <Massage {...this.props} dropDown={dropDown} />; break;
      case "form":
        content = <Forms {...this.props} dropDown={dropDown} />; break;
      case "module":
        content = <Module {...this.props} dropDown={dropDown} />; break;
      case "flag":
        content = <Flags {...this.props} dropDown={dropDown} />; break;
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

export default connect(mapStateToProps, null)(withRouter(InternalCoding));
