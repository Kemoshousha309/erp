import { connect } from "react-redux";
import InputPrivsConstructor from "../../InputPrivsConstructor/InputPrivsConstructor";
import { initInputPrivsView } from "../../InputPrivsConstructor/InputPrivsView";
import _ from "lodash";
import { costCenterPrivInitState } from "./state";
import { displayContent } from "../../../../ScreenConstructor/screen/displayContent";
import { langChangeActivity } from "../../../../../Context/actions/lang";

class Banks extends InputPrivsConstructor {
  constructor() {
    super();
    this.state = {
      ...this.state,
      ..._.cloneDeep(costCenterPrivInitState),
    };
  }

  static getDerivedStateFromProps(props, state) {
    let { mode, input_privs } = state;
    if (mode === "start") {
      input_privs = null;
    }
    return {
      input_privs,
    };
  }

  render() {
    return displayContent(
      this,
      this.props.location,
      initInputPrivsView.call(this)
    );
  }
}

const mapStateToProps = (state) => ({
  lanState: state.lang.lan,
  lanTable: state.lang.langTables,
  token: state.auth.authData.token,
  languages: state.lang.langInfo,
  rawTree_hash: state.auth.authData.raw_tree_hash,
  forms_privs_hash: state.auth.authData.forms_privs_hash,
  logged_user_id: state.auth.authData.user_id,
});
const mapDispatchToProps = (dispatch) => ({
  changeLangSelectActivity: (mode) => dispatch(langChangeActivity(mode)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Banks);
