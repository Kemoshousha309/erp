import { connect } from "react-redux";
import { langChangeActivity } from "../../../Context/actions/lang";
import { displayContent } from "../../ScreenConstructor/screen/displayContent";
import { setLastIndex } from "../../ScreenConstructor/screen/functions/moves";
import {
  autoDisplayModel,
  changeFieldPropNameAccordingToLanNo,
  FieldsAutoDisplayer,
} from "../../ScreenConstructor/screen/inputsHandlers";
import { functionsListeners } from "../../ScreenConstructor/screen/listeners";
import ScreenConstructor from "../../ScreenConstructor/ScreenConstructor";
import { getCCTreestructure } from "./Utilities";
import _ from "lodash";
import { getTree } from "../../ScreenConstructor/screen/async";
import { checkValidity } from "../../../Validation/validation";
import { timer } from "../../ScreenConstructor/screen/utilities";
import { updateMode } from "../../ScreenConstructor/screen/mode";
import { CenterInitState, } from "./state";

class CostCenter extends ScreenConstructor {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      ..._.cloneDeep(CenterInitState.call(this)),
    };
    this.autoDisplayHandler = new FieldsAutoDisplayer(this);
  }
  treeNodeClick = (record) => this.recordClick(record, null);
  save = async () => {
    const [valid, fieldsUpdate] = checkValidity(this);
    if (!valid) return this.setState({ fields: fieldsUpdate });
    this.setState({ loading: true, tree: null });
    try {
      const res = await this.saveHandler.handleSaveRequest();
      const tree = await getTree.call(this, "costcenters", getCCTreestructure);
      const { message, fieldsUpdate } = res;
      this.setState({
        mode: "d_record",
        loading: false,
        message,
        recordIndex: null,
        fields: fieldsUpdate,
        tree,
      });
      timer().then((res) => this.setState({ message: false }));
    } catch (err) {
      const tree = await getTree.call(this, "costcenters", getCCTreestructure);
      const { message, fieldsUpdate } = err;
      this.setState({
        loading: false,
        message: message,
        recordIndex: null,
        fields: fieldsUpdate,
        tree,
      });
      timer().then((res) => this.setState({ message: false }));
    }
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
    const tree = await getTree.call(this, "costcenters", getCCTreestructure);
    this.setState({ tree });
  };

  async componentDidMount() {
    setLastIndex(this);
    functionsListeners(this, true);
    const { tools } = updateMode("start", this.state, this.props);
    const tree = await getTree.call(this, "costcenters", getCCTreestructure);
    const {fields} = this.state;
    let fieldsUpdate = this.ccGroupAutoDisplay(fields);
    fieldsUpdate = this.parentAccAutoDisplay(fieldsUpdate);
    fieldsUpdate = this.changeParentAccName(fieldsUpdate);
    fieldsUpdate = this.changeCCGroupName(fieldsUpdate);
    this.setState({ tree, tools, fields: fieldsUpdate });
  }

  ccGroupAutoDisplay(fields) {
    return autoDisplayModel.call(
      this,
      "cc_group",
      "accountsgroup",
      {
        main: {
          d: { recordProp: "group_d_name", stateProp: "group_d_name" },
          f: { recordProp: "group_f_name", stateProp: "group_f_name" },
        },
      },
      fields
    );
  }
  parentAccAutoDisplay(fields) {
    return autoDisplayModel.call(
      this,
      "parent_cc",
      "costcenters",
      {
        main: {
          d: { recordProp: "cc_d_name", stateProp: "parent_cc_d_name" },
          f: { recordProp: "cc_f_name", stateProp: "parent_cc_f_name" },
        },
      },
      fields
    );
  }
  changeParentAccName(fields) {
    return changeFieldPropNameAccordingToLanNo(
      this.props,
      fields,
      "parent_cc_name",
      "parent_cc"
    );
  }
  changeCCGroupName(fields) {
    return changeFieldPropNameAccordingToLanNo(
      this.props,
      fields,
      "cc_group_name",
      "group"
    );
  }
  static getDerivedStateFromProps(props, state) {
    let newState = _.cloneDeep(state);
    if (["add", "modify", "copy"].includes(newState.mode)) {
      newState.fields.inactive_reason.writability =
        newState.fields.inactive.value;
      newState.fields.inactive_reason.validation.required =
        newState.fields.inactive.value;
    }

    return newState;
  }
  render() {
    return displayContent(this, this.props.location);
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
export default connect(mapStateToProps, mapDispatchToProps)(CostCenter);
