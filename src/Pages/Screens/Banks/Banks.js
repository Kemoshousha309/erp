import { connect } from "react-redux";
import { langChangeActivity } from "../../../store/actions/lang";
import { initDetials } from "../../ScreenConstructor/screen/Details/DetailsPanel";
import { LimitAdder } from "../../ScreenConstructor/screen/Details/handlers/add";
import { LimitDetialsRomver } from "../../ScreenConstructor/screen/Details/handlers/remove";
import { displayContent } from "../../ScreenConstructor/screen/displayContent";
import { handleDetailsScreensSave } from "../../ScreenConstructor/screen/functions/save";
import { DetailsUndoHandler } from "../../ScreenConstructor/screen/functions/undo";
import Page from "../../ScreenConstructor/screen/RecordDisplay/Page/Page";
import ScreenConstructor from "../../ScreenConstructor/ScreenConstructor";
import axios from "../../../axios";
import { timer } from "../../ScreenConstructor/screen/utilities";
import { selectMessage } from "../../../Helpers/lang";

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
        account_no: {
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
          fillFields: [{ recordName: "acc_no", stateName: "account_no" }],
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
      fks: ["account_no"],
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
              master: "acc_no",
              temp: "chartofaccounts",
            },
            addState: true,
            recordsNum: 3,
          },
        },
      },
    };
    // if i had more than one tab with different record nums i would init more than one adder for
    // each one
    this.adder = new LimitAdder(
      this,
      this.state.details.tabs.bnk_dtl_list.recordsNum
    );
  }
  detailsAddHandler = (e) => {
    // hanle add details rows with limit numbers
    this.adder.limitAddHandler(e);

    // set listeners to the account currency
    // set timeout function make sure to run the code after set the state
    setTimeout(() => {
      const presentAccCurrFiels = document.querySelectorAll("#acc_curr");
      presentAccCurrFiels.forEach((element) => {
        if (element.dataset.hasListener === "true") return;
        element.addEventListener("keydown", (event) => {
          event.preventDefault();
          if (event.key === "F4") {
            let currentElement = event.target;
            while (currentElement.tagName !== "TR") {
              currentElement = currentElement.parentElement;
            }
            const rowIndex = currentElement.dataset.rowindex;
            const { custimizedList } = this.state;
            this.setState({ loading: true });
            prepareData(this, rowIndex)
              .then((currList) => {
                custimizedList.open = true;
                custimizedList.render = renderCustomBanksDtlAccCurrList(
                  currList,
                  accCurRecordClick.bind(this, rowIndex)
                );
                this.setState({ custimizedList, loading: false });
                timer(this);
              })
              .catch((errMess) => {
                const message = {
                  content: selectMessage(errMess, this.props.lanState),
                  type: "error",
                };
                this.setState({ message, loading: false });
                timer(this);
              });
          }
        });
        element.dataset.hasListener = true;
      });
    });
  };
  detailsRemoveHandler = (index, e) => {
    const remover = new LimitDetialsRomver(
      this,
      this.state.details.tabs.bnk_dtl_list.recordsNum
    );
    remover.limitRemover(index, e);
  };
  undo = () => {
    const undoHandler = new DetailsUndoHandler(this);
    undoHandler.LimitRecordsUnodHandler();
  };
  save = () => handleDetailsScreensSave.call(this);

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

function renderCustomBanksDtlAccCurrList(data, accCurRecordClick) {
  if (typeof data === "string") return <h1>{data}</h1>;
  return (
    <Page
      page={data}
      recordClick={accCurRecordClick}
      fields={[{ propName: "cur_code", label: "acc_curr" }]}
    />
  );
}

function accCurRecordClick(rowIndex, event, recordIndex, choosedRecord) {
  const {
    state: {
      details,
      details: { current_tab },
      record: stateRecord,
    },
  } = this;

  const recDtlPropName = details.tabs[current_tab].recordDetailPropName;
  stateRecord[recDtlPropName][rowIndex].acc_curr = choosedRecord.cur_code;
  this.setState({
    custimizedList: { open: false, render: null },
    record: stateRecord,
  });
}

function prepareData(screen, rowIndex) {
  return new Promise((resolve, reject) => {
    const {
      state: {
        record,
        details,
        details: { current_tab },
      },
    } = screen;

    // get the associated acc_no
    const accountNum =
      record[details.tabs[current_tab].recordDetailPropName][rowIndex].acc_no;
    const errMess = {
      ar: "يجب ادخال رقم الحساب",
      en: "You must enter account number",
    };
    if (!accountNum) reject(errMess);
    // get the currencies associated to this acc_no from the server
    axios({
      method: "get",
      url: `chartofaccounts/${accountNum}`,
    })
      .then((res) => {
        resolve(res.data.account_currency_list);
      })
      .catch((err) => {
        reject(err.response.data.message);
      });
  });
}
