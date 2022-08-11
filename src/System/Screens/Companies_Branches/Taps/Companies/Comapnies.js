import _ from "lodash";
import { connect } from "react-redux";
import { langChangeActivity } from "../../../../../Context/actions/lang";
import ScreenConstructor from "../../../../../System/model/ScreenConstructor";
import { companiesInitState } from "./state";
import { functionsListeners } from "../../../../model/screen/handlers/listeners";
import { updateMode } from "../../../../model/screen/handlers/mode";
import {
  autoDisplayModel,
  changeFieldPropNameAccordingToLanNo,
  FieldsAutoDisplayer,
} from "../../../../model/screen/handlers/inputsHandlers";
import { setLastIndex } from "../../../../model/screen/functions/moves";
import { RenderScreen } from "../../../../view/RenderScreen";

class Companies extends ScreenConstructor {
  constructor() {
    super();
    this.state = {
      ...this.state,
      ..._.cloneDeep(companiesInitState),
    };
    this.autoDisplayHandler = new FieldsAutoDisplayer(this);
  }

  componentDidMount() {
    setLastIndex(this);
    functionsListeners(this, true);
    const { tools } = updateMode("start", this.state, this.props);
    const { fields } = this.state;
    const fieldsUpdate = _.flow(
      this.countryAutoDisplay,
      this.groupNameAutoDisplay,
      this.changeCountryNameProp,
      this.changeGroupNameProp
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
          d: { recordProp: "country_d_name", stateProp: "country_d_name" },
          f: { recordProp: "country_f_name", stateProp: "country_f_name" },
        },
      },
      fields
    );
  };
  groupNameAutoDisplay = (fields) => {
    return autoDisplayModel.call(
      this,
      "company_group",
      "companyGroup",
      {
        main: {
          d: { recordProp: "group_d_name", stateProp: "group_d_name" },
          f: { recordProp: "group_f_name", stateProp: "group_f_name" },
        },
      },
      fields
    );
  };

  changeGroupNameProp = (fields) => {
    return changeFieldPropNameAccordingToLanNo(
      this.props,
      fields,
      "group_d_name",
      "group"
    );
  };
  changeCountryNameProp = (fields) => {
    return changeFieldPropNameAccordingToLanNo(
      this.props,
      fields,
      "country_d_name",
      "country"
    );
  };

  render() {
    return <RenderScreen screen={this} />;
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

export default connect(mapStateToProps, mapDispatchToProps)(Companies);
