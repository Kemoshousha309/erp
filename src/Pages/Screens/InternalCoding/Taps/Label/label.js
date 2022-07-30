import { connect } from "react-redux";
import _ from "lodash";
import { labelInitState } from "./state";
import ScreenConstructor from "../../../../ScreenConstructor/ScreenConstructor";
import { handleAsyncLangNoOpts } from "../../../../ScreenConstructor/screen/async";
import { displayContent } from "../../../../ScreenConstructor/screen/displayContent";
import { langChangeActivity } from "../../../../../store/actions/lang";

class Label extends ScreenConstructor {
  constructor() {
    super();
    this.state = {
      ...this.state,
      ..._.cloneDeep(labelInitState)
    };
  }
  async_lang_no_options = (mode) => {
    handleAsyncLangNoOpts(this, mode);
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
    changeLangSelectAcivity: (mode) => dispatch(langChangeActivity(mode)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Label);
