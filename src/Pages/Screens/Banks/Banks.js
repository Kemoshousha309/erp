import { connect } from "react-redux";
import { langChangeActivity } from "../../../store/actions/lang";
import { initDetials } from "../../ScreenConstructor/screen/Details/DetailsPanel";
import { LimitAdder } from "../../ScreenConstructor/screen/Details/handlers/add";
import { LimitDetialsRomver } from "../../ScreenConstructor/screen/Details/handlers/remove";
import { displayContent } from "../../ScreenConstructor/screen/displayContent";
import ScreenConstructor from "../../ScreenConstructor/ScreenConstructor";
import _ from "lodash";
import { BanksSave, handleBanksSaveModel, setAccCurListener } from "./helper";
import { handleModifyModel } from "../../ScreenConstructor/screen/functions/modify";
import { handleCopyModel } from "../../ScreenConstructor/screen/functions/copy";
import { banksInitState } from "./initialState";

class Banks extends ScreenConstructor {
  constructor() {
    super();
    this.state = {
      ...this.state,
      ..._.cloneDeep(banksInitState)
    };
    this.limitAdder = new LimitAdder(this);
    this.limitDtlRemover = new LimitDetialsRomver(this);
    this.banksSaver = new BanksSave(this);
  }
  detailsRemoveHandler = (index, e) => {
    const { addState, recordUpdate } = this.limitDtlRemover.limitRemover(
      index,
      e
    );
    const {
      details,
      details: { current_tab },
    } = this.state;
    const detailsClone = _.cloneDeep(details);
    detailsClone.tabs[current_tab].addState = addState;
    this.setState({ record: recordUpdate, details: detailsClone });
  };

  modify = () => {
    handleModifyModel.call(this);
    setAccCurListener.call(this);
  };

  copy = () => {
    handleCopyModel.call(this);
    setAccCurListener.call(this);
  }
  

  detailsAddHandler = (e) => {
    // hanle add details rows with limit numbers
    const { addState, recordUpdate } = this.limitAdder.limitAddHandler(e);
    const {
      details,
      details: { current_tab },
    } = this.state;
    const detailsClone = _.cloneDeep(details);
    detailsClone.tabs[current_tab].addState = addState;
    this.setState({ record: recordUpdate, details: detailsClone });

    setAccCurListener.call(this)
  };

  save = () => handleBanksSaveModel.call(this);

  render() {
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

export default connect(mapStateToProps, mapDispatchToProps)(Banks);
