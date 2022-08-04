import { connect } from "react-redux";
import { langChangeActivity } from "../../../Context/actions/lang";
import { initDetails } from "../../ScreenConstructor/screen/Details/DetailsPanel";
import { LimitAdder } from "../../ScreenConstructor/screen/Details/handlers/add";
import { LimitDetailsRemover } from "../../ScreenConstructor/screen/Details/handlers/remove";
import { displayContent } from "../../ScreenConstructor/screen/displayContent";
import ScreenConstructor from "../../ScreenConstructor/ScreenConstructor";
import _ from "lodash";
import { cashInitState } from "./initialState";
import { handleModifyModel } from "../../ScreenConstructor/screen/functions/modify";
import { handleCopyModel } from "../../ScreenConstructor/screen/functions/copy";
import {
  functionsListeners,
  setFieldKeyListener,
} from "../../ScreenConstructor/screen/listeners";
import {
  handleAccCurList,
} from "../Banks/helper";
import { isLangChanged } from "../../ScreenConstructor/screen/utilities";
import { changeFieldPropNameAccordingToLanNo } from "../../ScreenConstructor/screen/inputsHandlers";
import { updateMode } from "../../ScreenConstructor/screen/mode";
import { setLastIndex } from "../../ScreenConstructor/screen/functions/moves";
import { CashSaver, handleCashSaveModel } from "./cashHelpers";

class Cash extends ScreenConstructor {
  constructor() {
    super();
    this.state = {
      ...this.state,
      ..._.cloneDeep(cashInitState),
    };
    this.limitDtlAdder = new LimitAdder(
      this,
      this.state.details.tabs.cash_dtl_list.recordsNum
    );
    this.limitDtlRemover = new LimitDetailsRemover(
      this,
      this.state.details.tabs.cash_dtl_list.recordsNum
    );
    this.cashSaver = new CashSaver(this);
  }
  modify = () => {
    handleModifyModel.call(this);
    setFieldKeyListener("acc_curr", "F4", handleAccCurList.bind(this));
  };

  copy = () => {
    handleCopyModel.call(this);
    setFieldKeyListener("acc_curr", "F4", handleAccCurList.bind(this));
  };

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

  detailsAddHandler = (e) => {
    // Handler add details rows with limit numbers
    const { addState, recordUpdate } = this.limitDtlAdder.limitAddHandler(e);
    const {
      details,
      details: { current_tab },
    } = this.state;
    const detailsClone = _.cloneDeep(details);
    detailsClone.tabs[current_tab].addState = addState;
    this.setState({ record: recordUpdate, details: detailsClone });
    setFieldKeyListener("acc_curr", "F4", handleAccCurList.bind(this));
  };

  save = () => handleCashSaveModel.call(this);

  componentDidUpdate(prevProps, prevState) {
    if (isLangChanged(prevProps, this.props)) {
      this.setState({ fields: this.changeBranchPropName(this.state.fields) });
    }
  }

  componentDidMount() {
    setLastIndex(this);
    functionsListeners(this, true);
    const { tools } = updateMode("start", this.state, this.props);
    this.setState({
      tools,
      fields: this.changeBranchPropName(this.state.fields),
    });
  }

  changeBranchPropName = (fields) => {
    const { props } = this;
    const fieldsUpdate = changeFieldPropNameAccordingToLanNo(
      props,
      fields,
      "branch_name",
      "branch"
    );
    return fieldsUpdate;
  };

  render() {
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

export default connect(mapStateToProps, mapDispatchToProps)(Cash);
