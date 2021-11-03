import { CircularProgress } from "@material-ui/core";
import { connect } from "react-redux";
import { langChangeActivity } from "../../../store/actions/lang";
import { t } from "../../../utilities/lang";
import { displayContent } from "../../ScreenConstructor/screen/displayContent";
import { handleRecordClick } from "../../ScreenConstructor/screen/functions/list";
import { setlastIndex } from "../../ScreenConstructor/screen/functions/moves";
import { handleDrivedState } from "../../ScreenConstructor/screen/handlers";
import {
  autoDisplay,
  changePropName,
} from "../../ScreenConstructor/screen/inputsHandlers";
import { functionsListenrs } from "../../ScreenConstructor/screen/listeners";
import ScreenConstructor from "../../ScreenConstructor/ScreenConstructor";
import { getAccTree, parentAccHandler } from "./Utilities";

class ChartsOfAccounts extends ScreenConstructor {
  constructor(props) {
    super(props);
    const {lanTable, lanState} = props
    this.state = {
      ...this.state,
      fields: {
        parent_acc: {
          fieldType: "input",
          type: "number",
          label: "parent_acc",
          validation: {
            requiered: true,
            length: 30,
          },
          validity: {
            valid: true,
            touched: false,
            message: null,
          },
          writability: false,
          value: "",
          changeHandler2: parentAccHandler.bind(this),
          fillFields: [
            { recordName: "acc_d_name", stateName: "parent_acc_d_name" },
            { recordName: "acc_f_name", stateName: "parent_acc_f_name" },
            { recordName: "acc_no", stateName: "parent_acc" },
          ],
        },
        parent_acc_name: {
          fieldType: "input",
          label: "name",
          readOnly: true,
          value: "",
        },
        acc_no: {
          fieldType: "input",
          type: "number",
          label: "acc_no",
          validation: {
            requiered: true,
            length: 30,
          },
          validity: {
            valid: true,
            touched: false,
            message: null,
          },
          writability: false,
          value: "",
        },
        acc_d_name: {
          fieldType: "input",
          type: "text",
          label: "name",
          validation: {
            requiered: true,
            length: 30,
          },
          validity: {
            valid: true,
            touched: false,
            message: null,
          },
          writability: false,
          value: "",
        },
        acc_f_name: {
          fieldType: "input",
          type: "text",
          label: "foreign_name",
          validation: {
            requiered: true,
            length: 30,
          },
          validity: {
            valid: true,
            touched: false,
            message: null,
          },
          writability: false,
          value: "",
        },
        level: {
          fieldType: "input",
          label: "acc_level",
          readOnly: true,
          value: "",
        },
        acc_type: {
          fieldType: "select",
          type: "select",
          label: "acc_type",
          readOnly: true,
          options: [
            { template: t("sub", lanTable, lanState), value: true },
            { template: t("main", lanTable, lanState), value: false },
          ],
          value: "",
        },
        bs: {
          fieldType: "select",
          type: "text",
          label: "report_type",
          validation: {
            requiered: true,
            length: 30,
          },
          validity: {
            valid: true,
            touched: false,
            message: null,
          },
          options: [
            { template: t("balance_sheet", lanTable, lanState), value: true },
            { template: t("profit_loss", lanTable, lanState), value: false },
          ],
          writability: false,
          value: "",
        },
        acc_group: {
          fieldType: "input",
          type: "number",
          label: "group",
          validation: {
            requiered: true,
            length: 30,
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
            { recordName: "group_no", stateName: "acc_group" },
          ],
        },
        acc_group_name: {
          fieldType: "input",
          label: "name",
          readOnly: true,
          value: "",
        },
      },
      preAdd: {
        state: true,
        content: null,
      },
      preModify: {
        state: true,
        content: null,
      },
      pks: ["acc_no"],
      urls: {
        add: "chartofaccounts",
        modify: "chartofaccounts",
        search: "chartofaccounts",
        pages: "chartofaccounts/pages",
        page: "chartofaccounts/page",
        lastPage: "chartofaccounts/lastPage",
        filter: "chartofaccounts/filteredPages",
        pageNo: "chartofaccounts/pageNo",
        delete: "chartofaccounts",
        preAdd: "chartofaccounts/preAdd",
        preModify: "chartofaccounts/preModify"
      },
      fks: ["parent_acc", "acc_group"],
      fkList: {
        parent_acc: {
          mainFields: [
            "acc_no",
            { label: "name", propName: "acc_d_name" },
          ],
          urls: {
            add: "chartofaccounts",
            modify: "chartofaccounts",
            search: "chartofaccounts",
            pages: "chartofaccounts/pages",
            page: "chartofaccounts/page",
            lastPage: "chartofaccounts/lastPage",
            filter: "chartofaccounts/filteredPages",
            pageNo: "chartofaccounts/pageNo",
            delete: "chartofaccounts",
          },
        },
        acc_group: {
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
      gridType: 2,
      mainFields: [
        "parent_acc",
        "acc_no",
        { label: "name", propName: "acc_d_name" },
      ],
      tapName: "chartofaccounts",
      searchFields: ["acc_no"],
      tree: null,
      treeInfo: {
        treeLables: {
          d: "acc_d_name",
          f: "acc_f_name",
        },
        nodeIdentifier: "acc_no",
      },
      treeLoading: <CircularProgress className="m-5" />,
    };
  }
  recordClick = (record, i) => handleRecordClick(this, record, i, );
  treeNodeClick = (record) => handleRecordClick(this, record);
  componentDidMount() {
    setlastIndex(this);
    functionsListenrs(this, true);
    getAccTree.call(this, "chartofaccounts");

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

  static getDerivedStateFromProps(props, state) {
    const fieldsClone = { ...state.fields };
    let fieldsUpdate = changePropName(
      props,
      fieldsClone,
      "parent_acc_name",
      "parent_acc"
    );

    fieldsUpdate = changePropName(
      props,
      fieldsUpdate,
      "acc_group_name",
      "group"
    );

    let { tools } = handleDrivedState(props, state);

    return {
      tools: tools,
      fields: fieldsUpdate,
    };
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
export default connect(mapStateToProps, mapDispatchToProps)(ChartsOfAccounts);
