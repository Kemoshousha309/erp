import React, { Component, Suspense } from "react";
import SelectDrop from "../../../Components/UI/SelectDrop/SelectDrop";
import { MenuItem } from "@mui/material";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import SkeletonLoader from "../../../Components/UI/SkeletonLoader/SkeletonLoader";
import { t } from "../../../Languages/languages";

const Region = React.lazy(() => import("./Taps/Region/Region"));
const Country = React.lazy(() => import("./Taps/Country/Country"));
const Province = React.lazy(() => import("./Taps/Province/Province"));
const City = React.lazy(() => import("./Taps/City/City"));
const Zone = React.lazy(() => import("./Taps/Zone/Zone"));

class GeographicalData extends Component {
  state = {
    currentTap: "region",
    dropDownChange: false,
  };

  onChangeHandler = (event) => {
    this.setState({ currentTap: event.target.value, dropDownChange: true });
  };

  render() {
    const flags = this.props.flag_details.filter(
      (i) => i.flag_code === "geographical_coding"
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
              {t(ele).toUpperCase()}
            </MenuItem>
          );
        })}
      </SelectDrop>
    );
    let content = null;
    switch (this.state.currentTap) {
      case "region":
        content = <Region {...this.props} dropDown={dropDown} />;
        break;
      case "country":
        content = <Country {...this.props} dropDown={dropDown} />;
        break;
      case "province":
        content = <Province {...this.props} dropDown={dropDown} />;
        break;
      case "city":
        content = <City {...this.props} dropDown={dropDown} />;
        break;
      case "zone":
        content = <Zone {...this.props} dropDown={dropDown} />;
        break;
      default:
        content = <h1>Not Exist</h1>;
    }

    return (
      <Suspense fallback={<SkeletonLoader type="Bp" />}>{content}</Suspense>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.authData.token,
    languages: state.lang.langInfo,
    flag_details: state.auth.authData.flag_detail_main_tree,
  };
};

export default connect(mapStateToProps, null)(withRouter(GeographicalData));
