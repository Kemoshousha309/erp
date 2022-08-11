import { connect } from "react-redux";
import { langChangeActivity } from "../../../Context/actions/lang";
import ScreenConstructor from "../../../System/model/ScreenConstructor";
import _ from "lodash";
import { BanksSave, handleAccCurList, handleBanksSaveModel } from "./helper";
import { banksInitState } from "./initialState";
import { LimitDetailsRemover } from "../../model/screen/Details/remove";
import { setFieldKeyListener } from "../../model/screen/handlers/listeners";
import { handleCopyModel } from "../../model/screen/functions/copy";
import { RenderScreen } from "../../view/RenderScreen";
import { handleModifyModel } from "../../model/screen/functions/modify";
import { LimitAdder } from "../../model/screen/Details/add";
class Banks extends ScreenConstructor {
  constructor() {
    super();
    this.state = {
      ...this.state,
      ..._.cloneDeep(banksInitState)
    };
    this.limitAdder = new LimitAdder(this, this.state.details.tabs.bnk_dtl_list.recordsNum);
    this.limitDtlRemover = new LimitDetailsRemover(this, this.state.details.tabs.bnk_dtl_list.recordsNum);
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
    setFieldKeyListener("acc_curr", "F4", handleAccCurList.bind(this));
  };

  copy = () => {
    handleCopyModel.call(this);
    setFieldKeyListener("acc_curr", "F4", handleAccCurList.bind(this));
  }
  

  detailsAddHandler = (e) => {
    // Handler add details rows with limit numbers
    const { addState, recordUpdate } = this.limitAdder.limitAddHandler(e);
    const {
      details,
      details: { current_tab },
    } = this.state;
    const detailsClone = _.cloneDeep(details);
    detailsClone.tabs[current_tab].addState = addState;
    this.setState({ record: recordUpdate, details: detailsClone });

    setFieldKeyListener("acc_curr", "F4", handleAccCurList.bind(this));
  
  };

  save = () => handleBanksSaveModel.call(this);

  render() {
    return <RenderScreen screen={this} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Banks);
