
import _ from 'lodash';
import { connect } from 'react-redux';
import { langChangeActivity } from '../../../../../Context/actions/lang';
import { displayContent } from '../../../../ScreenConstructor/screen/displayContent';
import { setLastIndex } from '../../../../ScreenConstructor/screen/functions/moves';
import {  autoDisplayModel, changeFieldPropNameAccordingToLanNo, FieldsAutoDisplayer } from '../../../../ScreenConstructor/screen/inputsHandlers';
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
    this.autoDisplayHandler = new FieldsAutoDisplayer(this);

  }

  componentDidMount() {
    setLastIndex(this);
    functionsListeners(this, true);
    const {tools} = updateMode("start", this.state, this.props)
    const {fields} = this.state;
    let fieldsUpdate = this.changeCountryName(fields);
    fieldsUpdate = this.changeRegionName(fieldsUpdate);
    fieldsUpdate = this.countryAutoDisplay(fieldsUpdate);
    this.setState({tools, fields: fieldsUpdate})
   
  }

  countryAutoDisplay(fields) {
    return autoDisplayModel.call(this, 'country_no', 'country', {
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
    }, fields);
  }
  changeRegionName(fields) {
    return changeFieldPropNameAccordingToLanNo(
      this.props,
      fields,
      'region_no_name',
      'region_no',
    );
  }

  changeCountryName(fields) {
    return changeFieldPropNameAccordingToLanNo(
      this.props,
      fields,
      'country_no_name',
      'country_no',
    );
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
