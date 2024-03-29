
import _ from 'lodash';
import { companiesGroupInitState } from './state';
import { langChangeActivity } from '../../../../../Context/actions/lang';
import ScreenConstructor from '../../../../../System/model/ScreenConstructor';
import { connect } from 'react-redux';
import { RenderScreen } from '../../../../view/RenderScreen';

class CompaniesGroups extends ScreenConstructor {
  constructor() {
    super();
    this.state = {
      ...this.state,
      ..._.cloneDeep(companiesGroupInitState)
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

export default connect(mapStateToProps, mapDispatchToProps)(CompaniesGroups);
