import _ from "lodash";
import { connect } from "react-redux";
import { langChangeActivity } from "../../../../../Context/actions/lang";
import { displayContent } from "../../../../ScreenConstructor/screen/displayContent";
import { setLastIndex } from "../../../../ScreenConstructor/screen/functions/moves";
import {
  autoDisplay,
  changePropName,
} from "../../../../ScreenConstructor/screen/inputsHandlers";
import { functionsListeners } from "../../../../ScreenConstructor/screen/listeners";
import { updateMode } from "../../../../ScreenConstructor/screen/mode";
import ScreenConstructor from "../../../../ScreenConstructor/ScreenConstructor";
import { countryInitState } from "./state";

class Country extends ScreenConstructor {
  constructor() {
    super();
    this.state = {
      ...this.state,
      ..._.cloneDeep(countryInitState),
    };
  }

  componentDidMount() {
    setLastIndex(this);
    functionsListeners(this, true);
    const { tools } = updateMode("start", this.state, this.props);
    this.setState({ tools });
    autoDisplay(this, "region_no", "region", {
      main: {
        d: { recordProp: "region_d_name", stateProp: "region_no_d_name" },
        f: { recordProp: "region_f_name", stateProp: "region_no_f_name" },
      },
    });
  }

  static getDerivedStateFromProps(props, state) {
    const fieldsUpdate = changePropName(
      props,
      state.fields,
      "region_no_name",
      "region_no"
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

export default connect(mapStateToProps, mapDispatchToProps)(Country);
