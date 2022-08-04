
import _ from 'lodash';
import { connect } from 'react-redux';
import { langChangeActivity } from '../../../../../Context/actions/lang';
import { displayContent } from '../../../../ScreenConstructor/screen/displayContent';
import { setLastIndex } from '../../../../ScreenConstructor/screen/functions/moves';
import { autoDisplay, changeFieldPropNameAccordingToLanNo } from '../../../../ScreenConstructor/screen/inputsHandlers';
import { functionsListeners } from '../../../../ScreenConstructor/screen/listeners';
import { updateMode } from '../../../../ScreenConstructor/screen/mode';
import ScreenConstructor from '../../../../ScreenConstructor/ScreenConstructor';
import { provinceInitState } from './state';

class Province extends ScreenConstructor {
  constructor() {
    super();
    this.state = {
      ...this.state,
      ..._.cloneDeep(provinceInitState)
    };
  }

  componentDidMount() {
    setLastIndex(this);
    functionsListeners(this, true);
    const {tools} = updateMode("start", this.state, this.props)
    this.setState({tools})
    autoDisplay(this, 'country_no', 'country', {
      main: {
        d: { recordProp: 'country_d_name', stateProp: 'country_no_d_name' },
        f: { recordProp: 'country_f_name', stateProp: 'country_no_f_name' },
      },
      others: [
        {
          d: { recordProp: 'region_no_d_name', stateProp: 'region_no_d_name' },
          f: { recordProp: 'region_no_f_name', stateProp: 'region_no_f_name' },
        },
        {
          d: { recordProp: 'region_no', stateProp: 'region_no' },
          f: { recordProp: 'region_no', stateProp: 'region_no' },
        },
      ],
    });
  }

  static getDerivedStateFromProps(props, state) {
    let fieldsUpdate = changeFieldPropNameAccordingToLanNo(
      props,
      state.fields,
      'region_no_name',
      'region_no',
    );
    fieldsUpdate = changeFieldPropNameAccordingToLanNo(
      props,
      fieldsUpdate,
      'country_no_name',
      'country_no',
    );
    return {
      fields: fieldsUpdate,
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
  changeLangSelectActivity: (mode) => dispatch(langChangeActivity(mode)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Province);
