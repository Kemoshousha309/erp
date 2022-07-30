
import _ from 'lodash';
import { companiesGroupInitState } from './state';
import { langChangeActivity } from '../../../../../store/actions/lang';
import ScreenConstructor from '../../../../ScreenConstructor/ScreenConstructor';
import { displayContent } from '../../../../ScreenConstructor/screen/displayContent';
import { connect } from 'react-redux';

class CompaniesGroups extends ScreenConstructor {
  constructor() {
    super();
    this.state = {
      ...this.state,
      ..._.cloneDeep(companiesGroupInitState)
    };
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

export default connect(mapStateToProps, mapDispatchToProps)(CompaniesGroups);
