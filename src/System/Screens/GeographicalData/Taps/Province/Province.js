import _ from "lodash";
import { connect } from "react-redux";
import { langChangeActivity } from "../../../../../Context/actions/lang";
import ScreenConstructor from "../../../../../System/model/ScreenConstructor";
import { setLastIndex } from "../../../../model/screen/functions/moves";
import { autoDisplayModel, changeFieldPropNameAccordingToLanNo, FieldsAutoDisplayer } from "../../../../model/screen/handlers/inputsHandlers";
import { functionsListeners } from "../../../../model/screen/handlers/listeners";
import { updateMode } from "../../../../model/screen/handlers/mode";
import { RenderScreen } from "../../../../view/RenderScreen";
import { provinceInitState } from "./state";

class Province extends ScreenConstructor {
  constructor() {
    super();
    this.state = {
      ...this.state,
      ..._.cloneDeep(provinceInitState),
    };
    this.autoDisplayHandler = new FieldsAutoDisplayer(this);
  }

  componentDidMount() {
    setLastIndex(this);
    functionsListeners(this, true);
    const { tools } = updateMode("start", this.state, this.props);
    const { fields } = this.state;
    const fieldsUpdate = _.flow(
      this.changeCountryName,
      this.changeRegionName,
      this.countryAutoDisplay
    )(fields);
    this.setState({ tools, fields: fieldsUpdate });
  }

  countryAutoDisplay = (fields) => {
    return autoDisplayModel.call(
      this,
      "country_no",
      "country",
      {
        main: {
          d: { recordProp: "country_d_name", stateProp: "country_no_d_name" },
          f: { recordProp: "country_f_name", stateProp: "country_no_f_name" },
        },
        others: [
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
  changeRegionName = (fields) => {
    return changeFieldPropNameAccordingToLanNo(
      this.props,
      fields,
      "region_no_name",
      "region_no"
    );
  };

  changeCountryName = (fields) => {
    return changeFieldPropNameAccordingToLanNo(
      this.props,
      fields,
      "country_no_name",
      "country_no"
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

export default connect(mapStateToProps, mapDispatchToProps)(Province);
