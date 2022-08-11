import { connect } from 'react-redux';
import _ from 'lodash';
import { langInitState } from './state';
import { langChangeActivity } from '../../../../../Context/actions/lang';
import ScreenConstructor from '../../../../../System/model/ScreenConstructor';
import { add_lan_dir_options } from '../../../../model/screen/handlers/async';
import { setLastIndex } from '../../../../model/screen/functions/moves';
import { functionsListeners } from '../../../../model/screen/handlers/listeners';
import { updateMode } from '../../../../model/screen/handlers/mode';
import { RenderScreen } from '../../../../view/RenderScreen';

class Language extends ScreenConstructor {
  constructor() {
    super();
    this.state = {
      ...this.state,
      ..._.cloneDeep(langInitState)
    };
  }

  componentDidMount() {
    add_lan_dir_options(this);
    setLastIndex(this);
    functionsListeners(this, true);
    const {tools} = updateMode("start", this.state, this.props)
    this.setState({tools})
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

export default connect(mapStateToProps, mapDispatchToProps)(Language);
