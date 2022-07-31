import _ from 'lodash';
import { connect } from 'react-redux';
import { formatDate } from '../../../Helpers/date';
import { langChangeActivity } from '../../../Context/actions/lang';
import { displayContent } from '../../ScreenConstructor/screen/displayContent';
import { setlastIndex } from '../../ScreenConstructor/screen/functions/moves';
import { handleDrivedState } from '../../ScreenConstructor/screen/handlers';
import {
  autoDisplay, changePropName, checkPassConfirm, onlyActiveField,
} from '../../ScreenConstructor/screen/inputsHandlers';
import { functionsListenrs } from '../../ScreenConstructor/screen/listeners';
import ScreenConstructor from '../../ScreenConstructor/ScreenConstructor';
import { usersInitState } from './state';

class Users extends ScreenConstructor {
  constructor() {
    super();
    this.state = {
      ...this.state,
      ..._.cloneDeep(usersInitState)
    };
  }

  componentDidMount() {
    // getTree(this)
    setlastIndex(this);
    functionsListenrs(this, true);

    // // inputs handlers on Auto display
    autoDisplay(this, 'direct_mang', 'users', {
      main: {
        d: { recordProp: 'user_d_name', stateProp: 'direct_mang_d_name' },
        f: { recordProp: 'user_f_name', stateProp: 'direct_mang_f_name' },
      },
    });
    autoDisplay(this, 'group_no', 'usersgroups', {
      main: {
        d: { recordProp: 'group_d_name', stateProp: 'group_no_d_name' },
        f: { recordProp: 'group_f_name', stateProp: 'group_no_f_name' },
      },
    });
    autoDisplay(this, 'copy_priv_from', 'users', {
      main: {
        d: { recordProp: 'user_d_name', stateProp: 'copy_priv_from_name' },
        f: { recordProp: 'user_f_name', stateProp: 'copy_priv_from_name' },
      },
    });
    autoDisplay(this, 'copy_priv_to', 'usersgroups', {
      main: {
        d: { recordProp: 'group_d_name', stateProp: 'copy_priv_to_name' },
        f: { recordProp: 'group_f_name', stateProp: 'copy_priv_to_name' },
      },
    });
    checkPassConfirm(this);

    // special fields hanlde
    hanldeInactiveFields(this);
  }

  static getDerivedStateFromProps(props, state) {
    const fieldsClone = { ...state.fields };
    let fieldsUpdate = fieldsClone;
    let lang_no = state.langNo;
    // this is the technique of active only one field without affect other things
    if (parseInt(props.lanState) !== parseInt(state.langNo)) {
      lang_no = props.lanState;
      fieldsUpdate = changePropName(
        props,
        fieldsClone,
        'group_no_name',
        'group_no',
        'group_no',
      );
      fieldsUpdate = changePropName(
        props,
        fieldsUpdate,
        'direct_mang_name',
        'direct_mang',
        'direct_mang',
      );
    } else {
      fieldsUpdate = onlyActiveField(
        fieldsClone,
        'copy_priv_from',
        'copy_priv_to',
        state.mode,
      );
    }
    const { tools } = handleDrivedState(props, state);

    return {
      tools,
      fields: fieldsUpdate,
      langNo: lang_no,
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

export default connect(mapStateToProps, mapDispatchToProps)(Users);

const hanldeInactiveFields = (thisK) => {
  thisK.state.fields.inactive.changeHandler = (state) => {
    const fieldsClone = { ...thisK.state.fields };
    const flag = !state.value;
    if (flag) {
      fieldsClone.inactive_reason.writability = true;
      if (thisK.state.mode !== 'add') {
        fieldsClone.inactive_reason.value = thisK.state.record.inactive_reason;
        fieldsClone.inactive_user.value = thisK.state.record.inactive_user;
        fieldsClone.inactive_date.value = formatDate(
          thisK.state.record.inactive_date,
        );
      }
    } else {
      fieldsClone.inactive_reason.writability = false;
      if (thisK.state.mode !== 'add') {
        fieldsClone.inactive_reason.value = '';
        fieldsClone.inactive_user.value = '';
        fieldsClone.inactive_date.value = '';
      }
    }
    thisK.setState({ fields: fieldsClone });
  };
};
