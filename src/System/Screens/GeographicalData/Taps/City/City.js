import { cityInitState } from "./state";
import _ from "lodash";
import ScreenConstructor from "../../../../../System/model/ScreenConstructor";

import { langChangeActivity } from "../../../../../Context/actions/lang";
import { connect } from "react-redux";
import { autoDisplayModel, changeFieldPropNameAccordingToLanNo, FieldsAutoDisplayer } from "../../../../model/screen/handlers/inputsHandlers";
import { setLastIndex } from "../../../../model/screen/functions/moves";
import { functionsListeners } from "../../../../model/screen/handlers/listeners";
import { updateMode } from "../../../../model/screen/handlers/mode";
import { RenderScreen } from "../../../../view/RenderScreen";

class City extends ScreenConstructor {
  constructor() {
    super();
    this.state = {
      ...this.state,
      ..._.cloneDeep(cityInitState),
    };
    this.autoDisplayHandler = new FieldsAutoDisplayer(this);
  }

  componentDidMount() {
    setLastIndex(this);
    functionsListeners(this, true);
    const { tools } = updateMode("start", this.state, this.props);
    const { fields } = this.state;
    const fieldsUpdate = _.flow(
      this.provinceAutoDisplay,
      this.changeCountryNameProp,
      this.changeProvinceNameProp,
      this.changeRegionNameProp
    )(fields);
    this.setState({ tools, fields: fieldsUpdate });
  }

  provinceAutoDisplay = (fields) => {
    return autoDisplayModel.call(
      this,
      "province_no",
      "province",
      {
        main: {
          d: { recordProp: "province_d_name", stateProp: "province_no_d_name" },
          f: { recordProp: "province_f_name", stateProp: "province_no_f_name" },
        },
        others: [
          {
            d: {
              recordProp: "country_no_d_name",
              stateProp: "country_no_d_name",
            },
            f: {
              recordProp: "country_no_f_name",
              stateProp: "country_no_f_name",
            },
          },
          {
            d: { recordProp: "country_no", stateProp: "country_no" },
            f: { recordProp: "country_no", stateProp: "country_no" },
          },
          {
            d: {
              recordProp: "region_no_d_name",
              stateProp: "region_no_d_name",
            },
            f: {
              recordProp: "region_no_f_name",
              stateProp: "region_no_f_name",
            },
          },
          {
            d: { recordProp: "region_no", stateProp: "region_no" },
            f: { recordProp: "region_no", stateProp: "region_no" },
          },
        ],
      },
      fields
    );
  };

  changeRegionNameProp = (fields) => {
    return changeFieldPropNameAccordingToLanNo(
      this.props,
      fields,
      "region_no_name",
      "region_no"
    );
  };
  changeCountryNameProp = (fields) => {
    return changeFieldPropNameAccordingToLanNo(
      this.props,
      fields,
      "country_no_name",
      "country_no"
    );
  };
  changeProvinceNameProp = (fields) => {
    return changeFieldPropNameAccordingToLanNo(
      this.props,
      fields,
      "province_no_name",
      "province_no"
    );
  };

  render() {
    return <RenderScreen screen={this} />
  }
}

const mapStateToProps = (state) => ({
  lanState: state.lang.lan,
  lanTable: state.lang.langTables,
  token: state.auth.authData.token,
  languages: state.lang.langInfo,
  rawTree_hash: state.auth.authData.raw_tree_hash,
  forms_privs_hash: state.auth.authData.forms_privs_hash,
});
const mapDispatchToProps = (dispatch) => ({
  changeLangSelectActivity: (mode) => dispatch(langChangeActivity(mode)),
});

export default connect(mapStateToProps, mapDispatchToProps)(City);
