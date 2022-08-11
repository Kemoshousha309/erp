import { costCenterGroupInitState } from "./state";
import _ from "lodash";
import ScreenConstructor from "../../../../../System/model/ScreenConstructor";
import { langChangeActivity } from "../../../../../Context/actions/lang";
import { connect } from "react-redux";
import { RenderScreen } from "../../../../view/RenderScreen";

class CostCenterGroup extends ScreenConstructor {
  constructor() {
    super();
    this.state = {
      ...this.state,
      ..._.cloneDeep(costCenterGroupInitState),
    };
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

export default connect(mapStateToProps, mapDispatchToProps)(CostCenterGroup);
