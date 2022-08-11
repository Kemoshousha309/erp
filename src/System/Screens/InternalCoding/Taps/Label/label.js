import { connect } from "react-redux";
import _ from "lodash";
import { labelInitState } from "./state";
import ScreenConstructor from "../../../../../System/model/ScreenConstructor";
import { langChangeActivity } from "../../../../../Context/actions/lang";
import { handleAsyncLangNoOpts } from "../../../../model/screen/handlers/async";
import { RenderScreen } from "../../../../view/RenderScreen";

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
    return <RenderScreen screen={this} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Label);
