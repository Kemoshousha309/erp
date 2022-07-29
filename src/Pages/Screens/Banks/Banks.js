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

class Banks extends ScreenConstructor {
  constructor() {
    super();
    this.state = {
      ...this.state,
      fields: {
        bank_no: {
          fieldType: "input",
          type: "number",
          label: "bank_no",
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
        bank_d_name: {
          fieldType: "input",
          type: "text",
          label: "name",
          validation: {
            requiered: true,
            length: 200,
          },
          validity: {
            valid: true,
            touched: false,
            message: null,
          },
          writability: false,
          value: "",
        },
        bank_f_name: {
          fieldType: "input",
          type: "text",
          label: "foreign_name",
          validation: {
            requiered: false,
            length: 200,
          },
          validity: {
            valid: true,
            touched: false,
            message: null,
          },
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
      },
      pks: ["bank_no"],
      urls: {
        add: "banks",
        modify: "banks",
        search: "banks",
        pages: "banks/pages",
        page: "banks/page",
        lastPage: "banks/lastPage",
        filter: "banks/filteredPages",
        pageNo: "banks/pageNo",
        delete: "banks",
        preAdd: "banks/preAdd",
      },
      fks: [],
      fkListShow: null,
      preAdd: {
        state: true,
        content: null,
      },
      fkList: {
        account_no: {
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
          filterBody: {
            acc_no: null,
            acc_d_name: null,
            acc_f_name: null,
            sub: true,
            parent_acc: null,
            bs: null,
            acc_type: 3,
            inactive: false,
          },
        },
      },
      mainFields: ["bank_no", { label: "name", propName: "bank_d_name" }],
      tapName: "banks",
      searchFields: ["bank_no"],
      details: {
        current_tab: "bnk_dtl_list",
        loading: false,
        show: true,
        tabs: {
          bnk_dtl_list: {
            label: "bnk_dtl_list",
            headers: {
              acc_no: {
                propName: "acc_no",
                label: "acc_no",
                disabled: false,
                type: "number",
                validationRules: {
                  requiered: true,
                },
                foriegnPropName: "acc_no",
                fk: true,
                fillFields: ["acc_no"],
                foreignURLs: {
                  pages: "chartofaccounts/pages",
                  page: "chartofaccounts/page",
                  lastPage: "chartofaccounts/lastPage",
                  filter: "chartofaccounts/filteredPages",
                  pageNo: "chartofaccounts/pageNo",
                },
                foreignMainFields: [
                  "acc_no",
                  { label: "name", propName: "acc_d_name" },
                ],
                filterBody: {
                  acc_no: null,
                  acc_d_name: null,
                  acc_f_name: null,
                  sub: true,
                  parent_acc: null,
                  bs: null,
                  acc_type: 3,
                  inactive: false,
                },
              },
              acc_curr: {
                propName: "acc_curr",
                label: "acc_curr",
                disabled: false,
                type: "text",
                validationRules: {
                  requiered: true,
                },
              },
              inactive: {
                propName: "inactive",
                label: "inactive",
                disabled: false,
                type: "checkbox",
                validationRules: {
                  requiered: true,
                },
                defaultValue: false,
              },
            },
            viewOnly: false,
            recordDetailPropName: "bnk_dtl_list",
            activeForeignList: null,
            detailsRowIndex: null,
            foreignKeys: ["acc_no"],
            pageURL: {
              master: "bank_no",
              temp: "banks",
            },
            addState: true,
            recordsNum: 1,
          },
        },
      },
    };
    // if i had more than one tab with different record nums i would init more than one adder for
    // each one
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
