import { connect } from "react-redux";
import { langChangeActivity } from "../../../store/actions/lang";
import { displayContent } from "../../ScreenConstructor/screen/displayContent";
import { setlastIndex } from "../../ScreenConstructor/screen/functions/moves";
import {
  autoDisplay,
  changePropName,
} from "../../ScreenConstructor/screen/inputsHandlers";
import { functionsListenrs } from "../../ScreenConstructor/screen/listeners";
import ScreenConstructor from "../../ScreenConstructor/ScreenConstructor";
import { getAccTreestructure, subUpdate, updateOnParentAcc } from "./Utilities";
import axios from "../../../axios";
import { initDetials } from "../../ScreenConstructor/screen/Details/DetailsPanel";
import _ from "lodash";
import { getTree } from "../../ScreenConstructor/screen/async";
import {
  ChartsOfAccsXlsxPreparer,
  ChartsOfAccsXlsxValidator,
} from "./ChartsOfAccsXlsx/ChartsOfAccsXlsx";
import { updateCurrentScreen } from "../../../store/actions/app";
import { timer } from "../../ScreenConstructor/screen/utilities";
import { updateMode } from "../../ScreenConstructor/screen/mode";
import { ChartsOfAccountsInitState } from "./state";

class ChartsOfAccounts extends ScreenConstructor {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      ..._.cloneDeep(ChartsOfAccountsInitState),
    };
  }
  recordFkClick = async (record) => {
    let fieldsUpdate = this.fkListHandler.recordClick(record);
    this.setState({
      fkListShow: null,
      fields: fieldsUpdate,
      fkRecord: record,
    });
    fieldsUpdate = await updateFields.call(this, fieldsUpdate, record);
    this.setState({ fields: fieldsUpdate });
  };

  deleteConfirmation = async (res) => {
    if (!res) return this.setState({ deleteConfirm: false });
    const { fieldsUpdate, message } = await this.deleteHandler.handleRequest();
    this.setState({
      mode: "start",
      loading: false,
      message,
      recordIndex: null,
      record: null,
      fields: fieldsUpdate,
      deleteConfirm: false,
      tree: null,
    });
    timer().then((res) => this.setState({ message: false }));
    const tree = await getTree.call(
      this,
      "chartofaccounts",
      getAccTreestructure
    );
    this.setState({ tree });
  };

  async componentDidMount() {
    setlastIndex(this);
    functionsListenrs(this, true);
    const { tools } = updateMode("start", this.state, this.props);
    this.setState({ tools });
    const tree = await getTree.call(
      this,
      "chartofaccounts",
      getAccTreestructure
    );
    this.setState({ tree });
    autoDisplay(this, "parent_acc", "chartofaccounts", {
      main: {
        d: { recordProp: "acc_d_name", stateProp: "parent_acc_d_name" },
        f: { recordProp: "acc_f_name", stateProp: "parent_acc_f_name" },
      },
    });

    autoDisplay(this, "acc_group", "accountsgroup", {
      main: {
        d: { recordProp: "group_d_name", stateProp: "group_d_name" },
        f: { recordProp: "group_f_name", stateProp: "group_f_name" },
      },
    });
  }

  // retrun a new validator specific to this screen
  excelPageValidator = (sheet, sheetColumnsNum) => {
    return new ChartsOfAccsXlsxValidator(sheet, sheetColumnsNum);
  };

  // return a new preparer specific to this screen
  excelPagePreparer = (recordPropNames, sheet) => {
    return new ChartsOfAccsXlsxPreparer(recordPropNames, sheet);
  };

  static getDerivedStateFromProps(props, state) {
    let newState = _.cloneDeep(state);
    newState.fields = changePropName(
      props,
      newState.fields,
      "parent_acc_name",
      "parent_acc"
    );

    newState.fields = changePropName(
      props,
      newState.fields,
      "acc_group_name",
      "group"
    );

    if (["add", "modify", "copy"].includes(newState.mode)) {
      newState.fields.inactive_reason.writability =
        newState.fields.inactive.value;
      newState.fields.inactive_reason.validation.requiered =
        newState.fields.inactive.value;
    }

    newState = subUpdate(newState);
    return newState;
  }
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
    updateCurrentScreen: (screen) => dispatch(updateCurrentScreen(screen)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ChartsOfAccounts);

function updateFields(fieldsUpdate, record) {
  return new Promise((resolve, reject) => {
    axios
      .get(`chartofaccounts/nextPK/${record.acc_no}`)
      .then((res) => {
        fieldsUpdate.acc_no.value = res.data.next_PK ? res.data.next_PK : "";
        resolve(updateOnParentAcc.call(this, fieldsUpdate, record, "PRESENT"));
      })
      .catch((err) => console.log(err));
  });
}
