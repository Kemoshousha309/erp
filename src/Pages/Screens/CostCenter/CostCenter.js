import { CircularProgress } from "@mui/material";
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
import { getCCTreestructure, parentccHandler } from "./Utilities";
import _ from "lodash";
import { getTree } from "../../ScreenConstructor/screen/async";
import { checkValidity } from "../../../Validation/validation";
import { timer } from "../../ScreenConstructor/screen/utilities";
import { updateMode } from "../../ScreenConstructor/screen/mode";

class CostCenter extends ScreenConstructor {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      fields: {
        parent_cc: {
          fieldType: "input",
          type: "number",
          label: "parent_cc",
          validation: {
            requiered: true,
            size: 2147483647,
          },
          validity: {
            valid: true,
            touched: false,
            message: null,
          },
          writability: false,
          value: "",
          changeHandler2: parentccHandler.bind(this),
          fillFields: [
            { recordName: "cc_d_name", stateName: "parent_cc_d_name" },
            { recordName: "cc_f_name", stateName: "parent_cc_f_name" },
            { recordName: "cc_no", stateName: "parent_cc" },
          ],
        },
        parent_cc_name: {
          fieldType: "input",
          label: "name",
          readOnly: true,
          value: "",
        },
        holder1: {},
        cc_no: {
          fieldType: "input",
          type: "number",
          label: "cc_no",
          validation: {
            requiered: true,
            size: 2147483647,
          },
          validity: {
            valid: true,
            touched: false,
            message: null,
          },
          writability: false,
          value: "",
          // autoIncrement: "/costcenters/nextPK/",
          // autoIncrementValue: "parent_cc",
        },
        cc_d_name: {
          fieldType: "input",
          type: "text",
          label: "name",
          validation: {
            requiered: true,
            length: 100,
          },
          validity: {
            valid: true,
            touched: false,
            message: null,
          },
          writability: false,
          value: "",
        },
        cc_f_name: {
          fieldType: "input",
          type: "text",
          label: "foreign_name",
          validation: {
            length: 100,
          },
          validity: {
            valid: true,
            touched: false,
            message: null,
          },
          writability: false,
          value: "",
        },
        sub: {
          fieldType: "select",
          type: "select",
          label: "type",
          validation: {
            requiered: true,
          },
          validity: {
            valid: true,
            touched: false,
            message: null,
          },
          options: [
            { template: "sub", value: true },
            { template: "main", value: false },
          ],
          value: "",
        },
        inactive: {
          fieldType: "checkbox",
          type: "checkbox",
          label: "inactive",
          writability: false,
          value: false,
        },
        inactive_reason: {
          fieldType: "textarea",
          type: "textarea",
          label: "inactive_reason",
          validity: {
            valid: true,
            touched: false,
            message: null,
          },
          validation: {},
          writability: false,
          value: "",
        },
        cc_group: {
          fieldType: "input",
          type: "number",
          label: "group",
          validation: {
            requiered: true,
            size: 2147483647,
          },
          validity: {
            valid: true,
            touched: false,
            message: null,
          },
          writability: false,
          value: "",
          fillFields: [
            { recordName: "group_d_name", stateName: "group_d_name" },
            { recordName: "group_f_name", stateName: "group_f_name" },
            { recordName: "group_no", stateName: "cc_group" },
          ],
        },
        cc_group_name: {
          fieldType: "input",
          label: "name",
          readOnly: true,
          value: "",
        },
      },
      pks: ["cc_no"],
      urls: {
        add: "costcenters",
        modify: "costcenters",
        search: "costcenters",
        pages: "costcenters/pages",
        page: "costcenters/page",
        lastPage: "costcenters/lastPage",
        filter: "costcenters/filteredPages",
        pageNo: "costcenters/pageNo",
        delete: "costcenters",
      },
      fks: ["parent_cc", "cc_group"],
      fkList: {
        parent_cc: {
          mainFields: ["cc_no", { label: "name", propName: "cc_d_name" }],
          urls: {
            add: "costcenters",
            modify: "costcenters",
            search: "costcenters",
            pages: "costcenters/pages",
            page: "costcenters/page",
            lastPage: "costcenters/lastPage",
            filter: "costcenters/filteredPages",
            pageNo: "costcenters/pageNo",
            delete: "costcenters",
          },
        },
        cc_group: {
          mainFields: ["group_no", { label: "name", propName: "group_d_name" }],
          urls: {
            add: "accountsgroup",
            modify: "accountsgroup",
            search: "accountsgroup",
            pages: "accountsgroup/pages",
            page: "accountsgroup/page",
            lastPage: "accountsgroup/lastPage",
            filter: "accountsgroup/filteredPages",
            pageNo: "accountsgroup/pageNo",
            delete: "accountsgroup",
          },
        },
      },
      gridType: 3,
      mainFields: [
        "parent_cc",
        "cc_no",
        { label: "name", propName: "cc_d_name" },
      ],
      tapName: "costcenters",
      searchFields: ["cc_no"],
      tree: null,
      treeInfo: {
        treeLables: {
          d: "cc_d_name",
          f: "cc_f_name",
        },
        propToAddToLabel: "cc_no",
        delimiter: " ",
        contain: (input) => `(${input})`,
        nodeIdentifier: "cc_no",
      },
      treeLoading: <CircularProgress className="m-5" />,
    };
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
        tree
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
        tree
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
      tree: null
    });
    timer().then((res) => this.setState({ message: false }));
    const tree = await getTree.call(this, "costcenters", getCCTreestructure)
    this.setState({tree})
  }

  async componentDidMount() {
    setlastIndex(this);
    functionsListenrs(this, true);
    const {tools} = updateMode("start", this.state, this.props)
    this.setState({tools})
    const tree = await getTree.call(this, "costcenters", getCCTreestructure);
    this.setState({tree})
    autoDisplay(this, "parent_cc", "costcenters", {
      main: {
        d: { recordProp: "cc_d_name", stateProp: "parent_cc_d_name" },
        f: { recordProp: "cc_f_name", stateProp: "parent_cc_f_name" },
      },
    });

    autoDisplay(this, "cc_group", "accountsgroup", {
      main: {
        d: { recordProp: "group_d_name", stateProp: "group_d_name" },
        f: { recordProp: "group_f_name", stateProp: "group_f_name" },
      },
    });
  }

  static getDerivedStateFromProps(props, state) {
    let newState = _.cloneDeep(state);
    newState.fields = changePropName(
      props,
      newState.fields,
      "parent_cc_name",
      "parent_cc"
    );

    newState.fields = changePropName(
      props,
      newState.fields,
      "cc_group_name",
      "group"
    );

    if (["add", "modify", "copy"].includes(newState.mode)) {
      newState.fields.inactive_reason.writability =
        newState.fields.inactive.value;
      newState.fields.inactive_reason.validation.requiered =
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
    changeLangSelectAcivity: (mode) => dispatch(langChangeActivity(mode)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CostCenter);
