import _ from 'lodash';
import { connect } from 'react-redux';
import { langChangeActivity } from '../../../../../Context/actions/lang';
import ScreenConstructor from '../../../../../System/model/ScreenConstructor';
import { RenderScreen } from '../../../../view/RenderScreen';
import { moduleInitState } from './state';

class Module extends ScreenConstructor {
  constructor() {
    super();
    this.state = {
      ...this.state,
      ..._.cloneDeep(moduleInitState)
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

export default connect(mapStateToProps, mapDispatchToProps)(Module);
