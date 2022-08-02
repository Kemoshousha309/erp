import { cityInitState } from "./state";
import _ from "lodash";
import ScreenConstructor from "../../../../ScreenConstructor/ScreenConstructor";
import { setLastIndex } from "../../../../ScreenConstructor/screen/functions/moves";
import { functionsListeners } from "../../../../ScreenConstructor/screen/listeners";
import { updateMode } from "../../../../ScreenConstructor/screen/mode";
import {
  autoDisplay,
  changePropName,
} from "../../../../ScreenConstructor/screen/inputsHandlers";
import { displayContent } from "../../../../ScreenConstructor/screen/displayContent";
import { langChangeActivity } from "../../../../../Context/actions/lang";
import { connect } from "react-redux";

class City extends ScreenConstructor {
  constructor() {
    super();
    this.state = {
      ...this.state,
      ..._.cloneDeep(cityInitState),
    };
  }

  componentDidMount() {
    setLastIndex(this);
    functionsListeners(this, true);
    const { tools } = updateMode("start", this.state, this.props);
    this.setState({ tools });
    autoDisplay(this, "province_no", "province", {
      main: {
        d: { recordProp: "province_d_name", stateProp: "province_no_d_name" },
        f: { recordProp: "province_f_name", stateProp: "province_no_f_name" },
      },
      others: [
        {
          d: {
            recordProp: "country_no_d_name",
            stateProp: "country_no_d_name",
          },
          f: {
            recordProp: "country_no_f_name",
            stateProp: "country_no_f_name",
          },
        },
        {
          d: { recordProp: "country_no", stateProp: "country_no" },
          f: { recordProp: "country_no", stateProp: "country_no" },
        },
        {
          d: { recordProp: "region_no_d_name", stateProp: "region_no_d_name" },
          f: { recordProp: "region_no_f_name", stateProp: "region_no_f_name" },
        },
        {
          d: { recordProp: "region_no", stateProp: "region_no" },
          f: { recordProp: "region_no", stateProp: "region_no" },
        },
      ],
    });
  }

  static getDerivedStateFromProps(props, state) {
    let fieldsUpdate = changePropName(
      props,
      state.fields,
      "region_no_name",
      "region_no"
    );
    fieldsUpdate = changePropName(
      props,
      fieldsUpdate,
      "country_no_name",
      "country_no"
    );
    fieldsUpdate = changePropName(
      props,
      fieldsUpdate,
      "province_no_name",
      "province_no"
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

export default connect(mapStateToProps, mapDispatchToProps)(City);
