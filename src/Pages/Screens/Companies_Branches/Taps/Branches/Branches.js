import _ from "lodash";
import { connect } from "react-redux";
import { langChangeActivity } from "../../../../../Context/actions/lang";
import { displayContent } from "../../../../ScreenConstructor/screen/displayContent";
import { setLastIndex } from "../../../../ScreenConstructor/screen/functions/moves";
import {
  autoDisplayModel,
  changeFieldPropNameAccordingToLanNo,
  FieldsAutoDisplayer,
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
    this.autoDisplayHandler = new FieldsAutoDisplayer(this);
  }

  componentDidMount() {
    setLastIndex(this);
    functionsListeners(this, true);
    const { tools } = updateMode("start", this.state, this.props);
    const { fields } = this.state;

    const fieldsUpdate = _.flow(
      this.cityAutoDisplay,
      this.companyAutoDisplay,
      this.changeCompanyPropName,
      this.changeCityPropName,
      this.changeCountryPropName,
      this.changeProvincePropName
    )(fields);
    this.setState({ tools, fields: fieldsUpdate });
  }

  cityAutoDisplay = (fields) => {
    return autoDisplayModel.call(
      this,
      "city_no",
      "city",
      {
        main: {
          d: { recordProp: "city_d_name", stateProp: "city_d_name" },
          f: { recordProp: "city_f_name", stateProp: "city_f_name" },
        },
        others: [
          {
            d: {
              recordProp: "province_no_d_name",
              stateProp: "province_d_name",
            },
            f: {
              recordProp: "province_no_f_name",
              stateProp: "province_f_name",
            },
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
      },
      fields
    );
  };
  companyAutoDisplay = (fields) => {
    return autoDisplayModel.call(
      this,
      "company_no",
      "company",
      {
        main: {
          d: { recordProp: "company_d_name", stateProp: "company_d_name" },
          f: { recordProp: "company_f_name", stateProp: "company_f_name" },
        },
      },
      fields
    );
  };
  changeCompanyPropName = (fields) => {
    const { props } = this;
    return changeFieldPropNameAccordingToLanNo(
      props,
      fields,
      "company_name",
      "company"
    );
  };
  changeCountryPropName = (fields) => {
    const { props } = this;
    return changeFieldPropNameAccordingToLanNo(
      props,
      fields,
      "country_name",
      "country"
    );
  };
  changeProvincePropName = (fields) => {
    const { props } = this;
    return changeFieldPropNameAccordingToLanNo(
      props,
      fields,
      "province_name",
      "province"
    );
  };
  changeCityPropName = (fields) => {
    const { props } = this;
    return changeFieldPropNameAccordingToLanNo(
      props,
      fields,
      "city_name",
      "city"
    );
  };

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
