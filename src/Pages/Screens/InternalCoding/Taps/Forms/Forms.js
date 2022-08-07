import _ from "lodash";
import { connect } from "react-redux";
import { getTreeStructure } from "../../../../../Helpers/tree";
import { langChangeActivity } from "../../../../../Context/actions/lang";
import { getTree } from "../../../../ScreenConstructor/screen/async";
import { displayContent } from "../../../../ScreenConstructor/screen/displayContent";
import { setLastIndex } from "../../../../ScreenConstructor/screen/functions/moves";
import {
  autoDisplayModel,
  changeFieldPropNameAccordingToLanNo,
  FieldsAutoDisplayer,
} from "../../../../ScreenConstructor/screen/inputsHandlers";
import { functionsListeners } from "../../../../ScreenConstructor/screen/listeners";
import { updateMode } from "../../../../ScreenConstructor/screen/mode";
import ScreenConstructor from "../../../../ScreenConstructor/ScreenConstructor";
import { formsInitState } from "./state";

class Forms extends ScreenConstructor {
  constructor() {
    super();
    this.state = {
      ...this.state,
      ..._.cloneDeep(formsInitState),
    };
    this.autoDisplayHandler = new FieldsAutoDisplayer(this);
  }
  async componentDidMount() {
    const tree = await getTree.call(this, "forms/mainTree", getTreeStructure);
    setLastIndex(this);
    functionsListeners(this, true);
    const { tools } = updateMode("start", this.state, this.props);
    const { fields } = this.state;
    const fieldsUpdate = _.flow(
      this.parentFormAutoDisplay,
      this.moduleNoAutoDisplay,
      this.changeModuleNameProp,
      this.changeParentFormNameProp
    )(fields);
    this.setState({ tools, tree, fields: fieldsUpdate });
  }

  parentFormAutoDisplay = (fields) => {
    return autoDisplayModel.call(
      this,
      "parent_form",
      "forms",
      {
        main: {
          d: {
            recordProp: "parent_form_d_name",
            stateProp: "parent_form_d_name",
          },
          f: {
            recordProp: "parent_form_f_name",
            stateProp: "parent_form_f_name",
          },
        },
      },
      fields
    );
  };

  moduleNoAutoDisplay = (fields) => {
    return autoDisplayModel.call(
      this,
      "module_no",
      "modules",
      {
        main: {
          d: { recordProp: "module_d_name", stateProp: "module_no_d_name" },
          f: { recordProp: "module_f_name", stateProp: "module_no_f_name" },
        },
      },
      fields
    );
  };
  changeModuleNameProp = (fields) => {
    return changeFieldPropNameAccordingToLanNo(
      this.props,
      fields,
      "module_no_name",
      "module_no",
      "module_no"
    );
  };

  changeParentFormNameProp = (fields) => {
    return changeFieldPropNameAccordingToLanNo(
      this.props,
      fields,
      "parent_form_name",
      "parent_form",
      "parent_form"
    );
  };

  render() {
    return displayContent(this, this.props.location);
  }
}

const mapStateToProps = (state) => {
  return {
    lanState: state.lang.lan,
    lanTable: state.lang.langTables,
    token: state.auth.authData.token,
    languages: state.lang.langInfo,
    rawTree_hash: state.auth.authData.raw_tree_hash,
    forms_privs_hash: state.auth.authData.forms_privs_hash,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLangSelectActivity: (mode) => dispatch(langChangeActivity(mode)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Forms);
