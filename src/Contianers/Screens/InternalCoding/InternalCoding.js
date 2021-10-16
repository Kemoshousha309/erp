import React, { Component } from "react";
import SelectDrop from "../../../Components/UI/SelectDrop/SelectDrop";
import MenuItem from "@material-ui/core/MenuItem";
import { t } from "../../../utilities/lang";
import { connect } from "react-redux";
import asyncComponent from "../../../utilities/asyncComponent";
import { withRouter } from "react-router";

const AsyncLanguage = asyncComponent(() => import("./Taps/Language"));
const AsyncMassage = asyncComponent(() => import("./Taps/Massage"));
const AsyncModule = asyncComponent(() => import("./Taps/Module"));
const AsyncForms = asyncComponent(() => import("./Taps/Forms"));
const AsyncFlags = asyncComponent(() => import("./Taps/Flags"));
const AsyncLabel = asyncComponent(() => import("./Taps/label"));

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
    switch (this.state.currentTap) {
      case "language":
        return <AsyncLanguage {...this.props} dropDown={dropDown} />;
      case "label":
        return <AsyncLabel {...this.props} dropDown={dropDown} />;
      case "message":
        return <AsyncMassage {...this.props} dropDown={dropDown} />;
      case "form":
        return <AsyncForms {...this.props} dropDown={dropDown} />;
      case "module":
        return <AsyncModule {...this.props} dropDown={dropDown} />;
      case "flag":
        return <AsyncFlags {...this.props} dropDown={dropDown} />;
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
