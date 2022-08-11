import _ from "lodash";
import { connect } from "react-redux";
import { langChangeActivity } from "../../../../../Context/actions/lang";
import ScreenConstructor from "../../../../../System/model/ScreenConstructor";
import { setLastIndex } from "../../../../model/screen/functions/moves";
import { autoDisplayModel, changeFieldPropNameAccordingToLanNo, FieldsAutoDisplayer } from "../../../../model/screen/handlers/inputsHandlers";
import { functionsListeners } from "../../../../model/screen/handlers/listeners";
import { updateMode } from "../../../../model/screen/handlers/mode";
import { RenderScreen } from "../../../../view/RenderScreen";
import { countryInitState } from "./state";

class Country extends ScreenConstructor {
  constructor() {
    super();
    this.state = {
      ...this.state,
      ..._.cloneDeep(countryInitState),
    };
    this.autoDisplayHandler = new FieldsAutoDisplayer(this);
  }

  componentDidMount() {
    setLastIndex(this);
    functionsListeners(this, true);
    const { tools } = updateMode("start", this.state, this.props);

    const { fields } = this.state;
    const fieldsUpdate = _.flow(
      this.changeRegionNameProp,
      this.regionAutoDisplay
    )(fields);
    this.setState({ tools, fields: fieldsUpdate });
  }

  regionAutoDisplay = (fields) => {
    return autoDisplayModel.call(
      this,
      "region_no",
      "region",
      {
        main: {
          d: { recordProp: "region_d_name", stateProp: "region_no_d_name" },
          f: { recordProp: "region_f_name", stateProp: "region_no_f_name" },
        },
      },
      fields
    );
  }

  changeRegionNameProp = (fields) => {
    return changeFieldPropNameAccordingToLanNo(
      this.props,
      fields,
      "region_no_name",
      "region_no"
    );
  }

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

export default connect(mapStateToProps, mapDispatchToProps)(Country);
