import { connect } from 'react-redux';
import _ from 'lodash';
import { langInitState } from './state';
import { add_lan_dir_options } from '../../../../ScreenConstructor/screen/async';
import { setlastIndex } from '../../../../ScreenConstructor/screen/functions/moves';
import { functionsListenrs } from '../../../../ScreenConstructor/screen/listeners';
import { displayContent } from '../../../../ScreenConstructor/screen/displayContent';
import { langChangeActivity } from '../../../../../store/actions/lang';
import ScreenConstructor from '../../../../ScreenConstructor/ScreenConstructor';

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
    setlastIndex(this);
    functionsListenrs(this, true);
  }

  render() {
    return displayContent(this, this.props.location);
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
  changeLangSelectAcivity: (mode) => dispatch(langChangeActivity(mode)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Language);
