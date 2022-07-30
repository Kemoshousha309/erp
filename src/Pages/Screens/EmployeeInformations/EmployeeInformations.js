import _ from 'lodash';
import { connect } from 'react-redux';
import { langChangeActivity } from '../../../store/actions/lang';
import { displayContent } from '../../ScreenConstructor/screen/displayContent';
import ScreenConstructor from '../../ScreenConstructor/ScreenConstructor';
import { empolyeeInfoInitState } from './state';

class EmployeeInformations extends ScreenConstructor {
  constructor() {
    super();
    this.state = {
      ...this.state,
      ..._.cloneDeep(empolyeeInfoInitState)
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
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EmployeeInformations);
