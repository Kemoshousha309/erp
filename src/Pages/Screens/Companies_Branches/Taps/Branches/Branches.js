import _ from "lodash";
import { connect } from "react-redux";
import { langChangeActivity } from "../../../../../Context/actions/lang";
import { displayContent } from "../../../../ScreenConstructor/screen/displayContent";
import { setLastIndex } from "../../../../ScreenConstructor/screen/functions/moves";
import {
  autoDisplay,
  changeFieldPropNameAccordingToLanNo,
} from "../../../../ScreenConstructor/screen/inputsHandlers";
import { functionsListeners } from "../../../../ScreenConstructor/screen/listeners";
import { updateMode } from "../../../../ScreenConstructor/screen/mode";
import ScreenConstructor from "../../../../ScreenConstructor/ScreenConstructor";
import { branchesInitState } from "./state";

class Branches extends ScreenConstructor {
  constructor() {
    super();
    this.state = {
      ...this.state,
      ..._.cloneDeep(branchesInitState),
    };
  }

  componentDidMount() {
    setLastIndex(this);
    functionsListeners(this, true);
    const { tools } = updateMode("start", this.state, this.props);
    this.setState({ tools });
    autoDisplay(this, "city_no", "city", {
      main: {
        d: { recordProp: "city_d_name", stateProp: "city_d_name" },
        f: { recordProp: "city_f_name", stateProp: "city_f_name" },
      },
      others: [
        {
          d: { recordProp: "province_no_d_name", stateProp: "province_d_name" },
          f: { recordProp: "province_no_f_name", stateProp: "province_f_name" },
        },
        {
          d: { recordProp: "province_no", stateProp: "province_no" },
          f: { recordProp: "province_no", stateProp: "province_no" },
        },
        {
          d: { recordProp: "country_no_d_name", stateProp: "country_d_name" },
          f: { recordProp: "country_no_f_name", stateProp: "country_f_name" },
        },
        {
          d: { recordProp: "country_no", stateProp: "country_no" },
          f: { recordProp: "country_no", stateProp: "country_no" },
        },
      ],
    });
    autoDisplay(this, "company_no", "company", {
      main: {
        d: { recordProp: "company_d_name", stateProp: "company_d_name" },
        f: { recordProp: "company_f_name", stateProp: "company_f_name" },
      },
    });
  }

  static getDerivedStateFromProps(props, state) {
    let fieldsUpdate = changeFieldPropNameAccordingToLanNo(
      props,
      state.fields,
      "company_name",
      "company"
    );
    fieldsUpdate = changeFieldPropNameAccordingToLanNo(
      props,
      fieldsUpdate,
      "country_name",
      "country"
    );
    fieldsUpdate = changeFieldPropNameAccordingToLanNo(
      props,
      fieldsUpdate,
      "province_name",
      "province"
    );
    fieldsUpdate = changeFieldPropNameAccordingToLanNo(props, fieldsUpdate, "city_name", "city");

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

export default connect(mapStateToProps, mapDispatchToProps)(Branches);
