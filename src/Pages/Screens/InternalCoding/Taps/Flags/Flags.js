import _ from "lodash";
import { connect } from "react-redux";
import { langChangeActivity } from "../../../../../Context/actions/lang";
import { handleAsyncLangNoOpts } from "../../../../ScreenConstructor/screen/async";
import { displayContent } from "../../../../ScreenConstructor/screen/displayContent";
import { handleFields } from "../../../../ScreenConstructor/screen/fields";
import { setLastIndex } from "../../../../ScreenConstructor/screen/functions/moves";
import { handleDerivedState } from "../../../../ScreenConstructor/screen/handlers";
import { autoDisplayModel, FieldsAutoDisplayer } from "../../../../ScreenConstructor/screen/inputsHandlers";
import { functionsListeners } from "../../../../ScreenConstructor/screen/listeners";
import ScreenConstructor from "../../../../ScreenConstructor/ScreenConstructor";
import { flagsInitState } from "./state";

class Flags extends ScreenConstructor {
  constructor() {
    super();
    this.state = {
      ...this.state,
      ..._.cloneDeep(flagsInitState)
    };
    this.autoDisplayHandler = new FieldsAutoDisplayer(this);
  }
  // async handle
  async_lang_no_options = (mode) => {
    handleAsyncLangNoOpts(this, mode);
  };

  // LifeCycle methods *******************************************
  componentDidMount() {
    setLastIndex(this);
    functionsListeners(this, true);
    const {fields} = this.state;
    let fieldsUpdate = this.flagCodeAutoDisplay(fields);
    this.setState({ mode: "list", fields: fieldsUpdate });
  }

  flagCodeAutoDisplay(fields) {
    return autoDisplayModel.call(this, "flag_code", "public/flagMaster", {
      main: {
        d: { recordProp: "label_code", stateProp: "label_code_m" },
        f: { recordProp: "label_code", stateProp: "label_code_m" },
      },
    }, fields);
  }

  static getDerivedStateFromProps(props, state) {
    let mode = state.mode;
    let urls = state.urls;
    let fieldsClone = { ...state.fields };
    const modes = ["modify", "search", "d_record", "copy", "add"];
    if (state.fields.label_code_m.autoFilledSuccess) {
      if (!modes.includes(mode)) {
        mode = "start";
      }
      const flag_code = state.fields.flag_code.value;
      urls = {
        add: `flagDetail`,
        modify: `flagDetail`,
        search: `flagDetail/${flag_code}`,
        pages: `flagDetail/${flag_code}/pages`,
        page: `flagDetail/${flag_code}/page`,
        lastPage: `flagDetail/${flag_code}/lastPage`,
        filter: `flagDetail/${flag_code}/filteredPages`,
        pageNo: `flagDetail/pageNo/${flag_code}`,
        delete: `flagDetail/${flag_code}`,
      };
    } else {
      mode = "list";
      fieldsClone = handleFields(state.fields, "close", true);
    }
    const { tools } = handleDerivedState(props, state);
    return {
      fields: fieldsClone,
      tools: tools,
      mode: mode,
      urls: urls,
    };
  }
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

export default connect(mapStateToProps, mapDispatchToProps)(Flags);
