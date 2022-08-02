
import _ from 'lodash';
import { connect } from 'react-redux';
import { langChangeActivity } from '../../../../../Context/actions/lang';
import { displayContent } from '../../../../ScreenConstructor/screen/displayContent';
import { setLastIndex } from '../../../../ScreenConstructor/screen/functions/moves';
import { autoDisplay, changePropName } from '../../../../ScreenConstructor/screen/inputsHandlers';
import { functionsListeners } from '../../../../ScreenConstructor/screen/listeners';
import { updateMode } from '../../../../ScreenConstructor/screen/mode';
import ScreenConstructor from '../../../../ScreenConstructor/ScreenConstructor';
import { zoneInitState } from './state';

class Zone extends ScreenConstructor {
  constructor() {
    super();
    this.state = {
      ...this.state,
      ..._.cloneDeep(zoneInitState)
    };
  }

  componentDidMount() {
    setLastIndex(this);
    functionsListeners(this, true);
    const {tools} = updateMode("start", this.state, this.props)
    this.setState({tools})
    autoDisplay(this, 'city_no', 'city', {
      main: {
        d: { recordProp: 'city_d_name', stateProp: 'city_no_d_name' },
        f: { recordProp: 'city_f_name', stateProp: 'city_no_f_name' },
      },
      others: [
        {
          d: {
            recordProp: 'province_no_d_name',
            stateProp: 'province_no_d_name',
          },
          f: {
            recordProp: 'province_no_f_name',
            stateProp: 'province_no_f_name',
          },
        },
        {
          d: { recordProp: 'province_no', stateProp: 'province_no' },
          f: { recordProp: 'province_no', stateProp: 'province_no' },
        },
        {
          d: {
            recordProp: 'country_no_d_name',
            stateProp: 'country_no_d_name',
          },
          f: {
            recordProp: 'country_no_f_name',
            stateProp: 'country_no_f_name',
          },
        },
        {
          d: { recordProp: 'country_no', stateProp: 'country_no' },
          f: { recordProp: 'country_no', stateProp: 'country_no' },
        },
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
    let fieldsUpdate = changePropName(
      props,
      state.fields,
      'region_no_name',
      'region_no',
    );
    fieldsUpdate = changePropName(
      props,
      fieldsUpdate,
      'country_no_name',
      'country_no',
    );
    fieldsUpdate = changePropName(
      props,
      fieldsUpdate,
      'province_no_name',
      'province_no',
    );
    fieldsUpdate = changePropName(
      props,
      fieldsUpdate,
      'city_no_name',
      'city_no',
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

export default connect(mapStateToProps, mapDispatchToProps)(Zone);
