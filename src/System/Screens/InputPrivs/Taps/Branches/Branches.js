import _ from 'lodash';
import { connect } from 'react-redux';
import { langChangeActivity } from '../../../../../Context/actions/lang';
import { branchesPrivInitState } from './state';
import InputPrivsConstructor from "../../../../model/InputPrivsConstructor/InputPrivsConstructor";
import { RenderScreen } from '../../../../view/RenderScreen';

class Branches extends InputPrivsConstructor {
  constructor() {
    super();
    this.state = {
      ...this.state,
      ..._.cloneDeep(branchesPrivInitState)
    };
  }

  static getDerivedStateFromProps(props, state) {
    let { mode, input_privs } = state;
    if (mode === 'start') {
      input_privs = null;
    }
    return {
      input_privs,
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
  logged_user_id: state.auth.authData.user_id,
});
const mapDispatchToProps = (dispatch) => ({
  changeLangSelectActivity: (mode) => dispatch(langChangeActivity(mode)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Branches);
