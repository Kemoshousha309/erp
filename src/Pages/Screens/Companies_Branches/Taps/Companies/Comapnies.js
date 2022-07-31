import _ from "lodash";
import { connect } from "react-redux";
import { langChangeActivity } from "../../../../../Context/actions/lang";
import { displayContent } from "../../../../ScreenConstructor/screen/displayContent";
import { setlastIndex } from "../../../../ScreenConstructor/screen/functions/moves";
import { autoDisplay, changePropName } from "../../../../ScreenConstructor/screen/inputsHandlers";
import { functionsListenrs } from "../../../../ScreenConstructor/screen/listeners";
import { updateMode } from "../../../../ScreenConstructor/screen/mode";
import ScreenConstructor from "../../../../ScreenConstructor/ScreenConstructor";
import { companiesInitState } from "./state";

class Companies extends ScreenConstructor {
  constructor() {
    super();
    this.state = {
      ...this.state,
      ..._.cloneDeep(companiesInitState)
    };
  }

  componentDidMount() {
    setlastIndex(this);
    functionsListenrs(this, true);
    const {tools} = updateMode("start", this.state, this.props)
    this.setState({tools})
    autoDisplay(this, 'company_group', 'companyGroup', {
      main: {
        d: { recordProp: 'group_d_name', stateProp: 'group_d_name' },
        f: { recordProp: 'group_f_name', stateProp: 'group_f_name' },
      },
    });
    autoDisplay(this, 'country_no', 'country', {
      main: {
        d: { recordProp: 'country_d_name', stateProp: 'country_d_name' },
        f: { recordProp: 'country_f_name', stateProp: 'country_f_name' },
      },
    });
  }

  static getDerivedStateFromProps(props, state) {
    let fieldsUpdate = changePropName(
      props,
      state.fields,
      'group_d_name',
      'group',
    );
    fieldsUpdate = changePropName(
      props,
      fieldsUpdate,
      'country_d_name',
      'country',
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
  changeLangSelectAcivity: (mode) => dispatch(langChangeActivity(mode)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Companies);
