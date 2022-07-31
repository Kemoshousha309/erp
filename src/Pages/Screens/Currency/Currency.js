import { connect } from "react-redux";
import { langChangeActivity } from "../../../Context/actions/lang";
import { displayContent } from "../../ScreenConstructor/screen/displayContent";
import { fieldListner } from "../../ScreenConstructor/screen/fields";
import {  handleModifyModel } from "../../ScreenConstructor/screen/functions/modify";
import { setlastIndex } from "../../ScreenConstructor/screen/functions/moves";
import { functionsListenrs } from "../../ScreenConstructor/screen/listeners";
import { initDetials } from "../../ScreenConstructor/screen/Details/DetailsPanel";
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
    setlastIndex(this);
    functionsListenrs(this, true);
    const {tools} = updateMode("start", this.state, this.props)
    this.setState({tools})
    fieldListner.call(this, "local_currency", rateValidtaion);
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
      rateValidtaion(fields.local_currency.value, null, this);
      this.setState({ local_currency_update: false });
    }
    return displayContent(this, this.props.location, initDetials.call(this));
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
    changeLangSelectAcivity: (mode) => dispatch(langChangeActivity(mode)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Currency);

function rateValidtaion(value, CheckBoxField, Currency) {
  const { fields } = Currency.state;
  const effectedFeilds = [
    "exchange_rate",
    "pos_ex_rate",
    "max_ex_rate",
    "min_ex_rate",
  ];
  if (value) {
    effectedFeilds.forEach((i) => {
      fields[i].writability = false;
      if (["max_ex_rate", "min_ex_rate"].includes(i)) {
        fields[i].value = "";
      } else {
        fields[i].value = 1;
      }
    });
  } else {
    effectedFeilds.forEach((i) => {
      fields[i].writability = true;
    });
  }
  Currency.setState({ fields: fields });
}
