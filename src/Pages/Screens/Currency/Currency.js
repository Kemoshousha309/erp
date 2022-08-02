import { connect } from "react-redux";
import { langChangeActivity } from "../../../Context/actions/lang";
import { displayContent } from "../../ScreenConstructor/screen/displayContent";
import { fieldListener } from "../../ScreenConstructor/screen/fields";
import {  handleModifyModel } from "../../ScreenConstructor/screen/functions/modify";
import { setLastIndex } from "../../ScreenConstructor/screen/functions/moves";
import { functionsListeners } from "../../ScreenConstructor/screen/listeners";
import { initDetails } from "../../ScreenConstructor/screen/Details/DetailsPanel";
import ScreenConstructor from "../../ScreenConstructor/ScreenConstructor";
import { updateMode } from "../../ScreenConstructor/screen/mode";
import _ from "lodash";
import { currencyInitState } from "./state";

class Currency extends ScreenConstructor {
  constructor() {
    super();
    this.state = {
      ...this.state,
      ..._.cloneDeep(currencyInitState)
    };
  }
  modify = async () => {
    handleModifyModel.call(this);
    this.setState({local_currency_update: true})
  };
  componentDidMount() {
    setLastIndex(this);
    functionsListeners(this, true);
    const {tools} = updateMode("start", this.state, this.props)
    this.setState({tools})
    fieldListener.call(this, "local_currency", rateValidation);
  }

  static getDerivedStateFromProps(props, state) {
    // open local currency field when the local currency field is open
    const {
      fields,
      // preAdd: { content: preAddContent },
      // preModify: { content: preModifyContent },
      // mode,
    } = state;
    // const content = mode === "add" ? preAddContent : preModifyContent;
    // if (content) {
    //   const {
    //     info: { local_currency },
    //   } = content;
    //   if (local_currency) {
    //     if (
    //       local_currency.currency_code === fields.currency_code.value &&
    //       !fields.local_currency.writability
    //     ) {
    //       fields.local_currency.writability = true;
    //     }
    //   }
    // }
    return {
      fields: fields,
    };
  }
  render() {
    const { mode, fields, local_currency_update } = this.state;
    if (mode === "modify" && local_currency_update) {
      rateValidation(fields.local_currency.value, null, this);
      this.setState({ local_currency_update: false });
    }
    return displayContent(this, this.props.location, initDetails.call(this));
  }
}

const mapStateToProps = (state) => {
  return {
    lanState: state.lang.lan,
    lanTable: state.lang.langTables,
    token: state.auth.authData.token,
    languages: state.lang.langInfo,
    rawTree_hash: state.auth.authData.raw_tree_hash,
    forms_privs_hash: state.auth.authData.forms_privs_hash,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLangSelectActivity: (mode) => dispatch(langChangeActivity(mode)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Currency);

function rateValidation(value, CheckBoxField, Currency) {
  const { fields } = Currency.state;
  const effectedFields = [
    "exchange_rate",
    "pos_ex_rate",
    "max_ex_rate",
    "min_ex_rate",
  ];
  if (value) {
    effectedFields.forEach((i) => {
      fields[i].writability = false;
      if (["max_ex_rate", "min_ex_rate"].includes(i)) {
        fields[i].value = "";
      } else {
        fields[i].value = 1;
      }
    });
  } else {
    effectedFields.forEach((i) => {
      fields[i].writability = true;
    });
  }
  Currency.setState({ fields: fields });
}
