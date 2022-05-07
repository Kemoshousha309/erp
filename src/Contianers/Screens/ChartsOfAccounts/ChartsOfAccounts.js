import { CircularProgress } from "@mui/material";
import { connect } from "react-redux";
import { langChangeActivity } from "../../../store/actions/lang";
import { displayContent } from "../../ScreenConstructor/screen/displayContent";
import {
  fkRecordClickHandler,
  handleRecordClick,
} from "../../ScreenConstructor/screen/functions/list";
import { setlastIndex } from "../../ScreenConstructor/screen/functions/moves";
import { handleDrivedState } from "../../ScreenConstructor/screen/handlers";
import {
  autoDisplay,
  changePropName,
} from "../../ScreenConstructor/screen/inputsHandlers";
import { functionsListenrs } from "../../ScreenConstructor/screen/listeners";
import ScreenConstructor from "../../ScreenConstructor/ScreenConstructor";
import {
  getAccTreestructure,
  parentAccHandler,
  subUpdate,
  updateOnParentAcc,
} from "./Utilities";
import axios from "../../../axios";
import { initDetials } from "../../ScreenConstructor/screen/Details/DetailsPanel";
import { handleDetailsScreensUndo } from "../../ScreenConstructor/screen/functions/undo";
import { getDetails } from "../../ScreenConstructor/screen/Details/requestDetails";
import _ from "lodash";
import { handleDetailsScreensSave } from "../../ScreenConstructor/screen/functions/save";
import { handleDeleteConfirmation } from "../../ScreenConstructor/screen/functions/delete";
import { getTree } from "../../ScreenConstructor/screen/async";

class ChartsOfAccounts extends ScreenConstructor {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      fields: {
        parent_acc: {
          fieldType: "input",
          type: "number",
          label: "parent_acc",
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
          changeHandler2: parentAccHandler.bind(this),
          fillFields: [
            { recordName: "acc_d_name", stateName: "parent_acc_d_name" },
            { recordName: "acc_f_name", stateName: "parent_acc_f_name" },
            { recordName: "acc_no", stateName: "parent_acc" },
          ],
          prevReqStatus: "FULFILLED",
        },
        parent_acc_name: {
          fieldType: "input",
          label: "name",
          readOnly: true,
          value: "",
        },
        holder1: {},
        acc_no: {
          fieldType: "input",
          type: "number",
          label: "acc_no",
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
          autoIncrement: "/chartofaccounts/nextPK/",
          autoIncrementValue: "parent_acc"
        },
        acc_d_name: {
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
        acc_f_name: {
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
        level: {
          fieldType: "input",
          label: "acc_level",
          readOnly: true,
          value: "",
        },
        sub: {
          fieldType: "select",
          type: "select",
          label: "type",
          readOnly: true,
          options: [
            { template: "sub", value: true },
            { template: "main", value: false },
          ],
          value: "",
        },
        bs: {
          fieldType: "select",
          type: "text",
          label: "report_type",
          validation: {
            length: 30,
          },
          validity: {
            valid: true,
            touched: false,
            message: null,
          },
          options: [
            { template: "balance_sheet", value: true },
            { template: "profit_loss", value: false },
          ],
          writability: false,
          value: "",
        },
        cc_post: {
          fieldType: "select",
          type: "text",
          label: "cc_post",
          validation: {
            length: 11,
          },
          validity: {
            valid: true,
            touched: false,
            message: null,
          },
          options: [
            { template: "mandatury", value: 1 },
            { template: "optional", value: 3 },
            { template: "not_used", value: 2 },
          ],
          writability: false,
          value: "",
        },
        dr: {
          fieldType: "select",
          type: "text",
          label: "acc_nature",
          validation: {
            length: 11,
          },
          validity: {
            valid: true,
            touched: false,
            message: null,
          },
          options: [
            { template: "credit", value: false },
            { template: "debit", value: true },
          ],
          writability: false,
          value: "",
        },
        inactive: {
          fieldType: "checkbox",
          type: "checkbox",
          label: "inactive",
          writability: false,
          value: false,
        },
        acc_group: {
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
            { recordName: "group_no", stateName: "acc_group" },
          ],
        },
        acc_group_name: {
          fieldType: "input",
          label: "name",
          readOnly: true,
          value: "",
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
        // sub fields
        acc_type: {
          fieldType: "select",
          type: "text",
          label: "acc_type",
          validation: {
            length: 100,
          },
          validity: {
            valid: true,
            touched: false,
            message: null,
          },
          options: [
            { template: "general", value: 1 },
            { template: "cash_on_hand", value: 2 },
            { template: "bank", value: 3 },
            { template: "customer", value: 4 },
            { template: "supplier", value: 5 },
            { template: "other_debit", value: 6 },
            { template: "other_credit", value: 7 },
            { template: "employee", value: 8 },
          ],
          writability: false,
          hide: true,
          value: "",
        },
        cash_flow_type: {
          fieldType: "select",
          type: "text",
          label: "cash_flow_type",
          validation: {
            length: 30,
          },
          validity: {
            valid: true,
            touched: false,
            message: null,
          },
          options: [
            { template: "invest", value: 2 },
            { template: "finance", value: 3 },
            { template: "operation", value: 1 },
          ],
          writability: false,
          hide: true,
          value: "",
        },
        acc_dtl: {
          fieldType: "select",
          type: "text",
          label: "acc_dtl",
          validation: {
            length: 30,
          },
          validity: {
            valid: true,
            touched: false,
            message: null,
          },
          options: [
            { template: "cash_cash_equevilant", value: 1 },
            { template: "inventory", value: 2 },
            { template: "acc_recievable", value: 3 },
            { template: "fixed_asset", value: 4 },
            { template: "Intangible_assets", value: 5 },
          ],
          writability: false,
          hide: true,
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
        preModify: "chartofaccounts/preModify",
      },
      fks: ["parent_acc", "acc_group"],
      fkList: {
        parent_acc: {
          mainFields: ["acc_no", { label: "name", propName: "acc_d_name" }],
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
      gridType: 3,
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
        propToAddToLabel: "acc_no",
        delimiter: " ",
        contain: (input) => `(${input})`,
        nodeIdentifier: "acc_no",
      },
      treeLoading: <CircularProgress className="m-5" />,
      details: {
        current_tab: "currency",
        loading: false,
        type: "FOREIGN",
        show: false,
        tabs: {
          currency: {
            fk: "cur_code",
            label: "currency",
            headers: [
              {
                propName: "cur_code",
                label: "currency_code",
                disabled: true,
                type: "text",
                validationRules: {
                  requiered: true,
                },
                foriegnPropName: "currency_code",
                fk: true,
              },
              {
                propName: "active",
                label: "active",
                type: "checkbox",
                validationRules: {
                  requiered: true,
                },
                foriegnPropName: "active",
                defaultValue: false,
              },
              {
                propName: "used",
                label: "used",
                type: "checkbox",
                validationRules: {
                  requiered: true,
                },
                foriegnPropName: "used",
                defaultValue: true,
              },
            ],
            viewOnly: false,
            recordDetailPropName: "account_currency_list",
            pageURL: {
              master: "acc_no",
              temp: "chartofaccounts",
            },
            foreignURLs: {
              pages: "currency/pages",
              page: "currency/page",
              lastPage: "currency/lastPage",
              filter: "currency/filteredPages",
              pageNo: "currency/pageNo",
            },
            foreignMainFields: [
              "currency_code",
              { label: "name", propName: "currency_d_name" },
              { label: "ex_rate", propName: "exchange_rate" },
            ],
          },
        },
      },
    };
  }
  recordFkClick = (record) => fkRecordClickHandler(this, record, updateFields);
  treeNodeClick = (record) => handleRecordClick(this, record, null, getDetails);
  recordClick = (record, i) => handleRecordClick(this, record, i, getDetails);
  undo = () => handleDetailsScreensUndo.call(this);
  save = () =>
    handleDetailsScreensSave.call(
      this,
      () => getTree.call(this, "chartofaccounts", getAccTreestructure)
    );
  deleteConfirmation = (res) =>
    handleDeleteConfirmation(
      this,
      res,
      () => getTree.call(this, "chartofaccounts", getAccTreestructure)
    );


  componentDidMount() {
    setlastIndex(this);
    functionsListenrs(this, true);
    getTree.call(this, "chartofaccounts", getAccTreestructure)

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
    const { tools } = handleDrivedState(props, newState);
    newState.tools = tools;
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
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ChartsOfAccounts);

function updateFields(record) {
  axios
    .get(`chartofaccounts/nextPK/${record.acc_no}`)
    .then((res) => {
      this.setState((state, props) => {
        const { fields } = state;
        fields.acc_no.value = res.data.next_PK ? res.data.next_PK : "";
        return {
          fields: updateOnParentAcc.call(this, fields, record, "PRESENT"),
        };
      });
    })
    .catch((err) => console.log(err));
}
