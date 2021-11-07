import { connect } from "react-redux";
import { langChangeActivity } from "../../../store/actions/lang";
import { displayContent } from "../../ScreenConstructor/screen/displayContent";
import { fieldListner } from "../../ScreenConstructor/screen/fields";
import { handleRecordClick } from "../../ScreenConstructor/screen/functions/list";
import { handleModify } from "../../ScreenConstructor/screen/functions/modify";
import { setlastIndex } from "../../ScreenConstructor/screen/functions/moves";
import { handleDetailsScreensSave } from "../../ScreenConstructor/screen/functions/save";
import { handleDetailsScreensUndo } from "../../ScreenConstructor/screen/functions/undo";
import { handleDrivedState } from "../../ScreenConstructor/screen/handlers";
import { functionsListenrs } from "../../ScreenConstructor/screen/listeners";
import {
  addHandler,
  detailsInputChangeHandler,
  removeHandler,
  tabsChangeHandler,
} from "../../ScreenConstructor/screen/Details/handlers";
import DetailsPanel from "../../ScreenConstructor/screen/Details/DetailsPanel";
import { getDetails } from "../../ScreenConstructor/screen/Details/Utilities";
import ScreenConstructor from "../../ScreenConstructor/ScreenConstructor";
import _ from "lodash";

class Currency extends ScreenConstructor {
  constructor() {
    super();
    this.state = {
      ...this.state,
      fields: {
        currency_code: {
          fieldType: "input",
          type: "text",
          label: "currency_code",
          validation: {
            requiered: true,
            length: 10,
          },
          validity: {
            valid: true,
            touched: false,
            message: null,
          },
          capitalize: true,
          writability: false,
          value: "",
        },
        currency_d_name: {
          fieldType: "input",
          type: "text",
          label: "name",
          validation: {
            requiered: true,
            length: 50,
          },
          validity: {
            valid: true,
            touched: false,
            message: null,
          },
          writability: false,
          value: "",
        },
        currency_f_name: {
          fieldType: "input",
          type: "text",
          label: "foreign_name",
          validation: {
            requiered: true,
            length: 50,
          },
          validity: {
            valid: true,
            touched: false,
            message: null,
          },
          writability: false,
          value: "",
        },
        exchange_rate: {
          fieldType: "input",
          type: "number",
          label: "ex_rate",
          validation: {
            requiered: true,
            point6Format: true,
          },
          validity: {
            valid: true,
            touched: false,
            message: null,
          },
          writability: false,
          value: "",
        },
        fraction_no: {
          fieldType: "input",
          type: "number",
          label: "fraction_no",
          validation: {
            int: true,
          },
          validity: {
            valid: true,
            touched: false,
            message: null,
          },
          writability: false,
          value: "",
        },
        fraction_d_name: {
          fieldType: "input",
          type: "text",
          label: "fraction_name",
          validation: {
            length: 20,
          },
          validity: {
            valid: true,
            touched: false,
            message: null,
          },
          writability: false,
          value: "",
        },
        fraction_f_name: {
          fieldType: "input",
          type: "text",
          label: "fraction_foreign_name",
          validation: {
            requiered: false,
            length: 20,
          },
          validity: {
            valid: true,
            touched: false,
            message: null,
          },
          writability: false,
          value: "",
        },
        max_ex_rate: {
          fieldType: "input",
          type: "number",
          label: "max_ex_rate",
          validation: {
            requiered: false,
            point6Format: true,
          },
          validity: {
            valid: true,
            touched: false,
            message: null,
          },
          writability: false,
          value: "",
        },
        min_ex_rate: {
          fieldType: "input",
          type: "number",
          label: "min_ex_rate",
          validation: {
            requiered: false,
            point6Format: true,
          },
          validity: {
            valid: true,
            touched: false,
            message: null,
          },
          writability: false,
          value: "",
        },
        pos_ex_rate: {
          fieldType: "input",
          type: "number",
          label: "pos_ex_rate",
          validation: {
            requiered: false,
            point6Format: true,
          },
          validity: {
            valid: true,
            touched: false,
            message: null,
          },
          writability: false,
          value: "",
        },
        local_currency: {
          fieldType: "checkbox",
          type: "checkbox",
          label: "local_currency",
          validation: {
            requiered: false,
          },
          validity: {
            valid: true,
            touched: false,
            message: null,
          },
          writability: false,
          value: "",
        },
      },
      gridType: 3,
      pks: ["currency_code"],
      tapTools: ["copy"], // to be deleted and view the others
      mode: "start",
      tapName: "currency",
      searchFields: ["currency_code"],
      mainFields: [
        "currency_code",
        { label: "name", propName: "currency_d_name" },
        { label: "ex_rate", propName: "exchange_rate" },
      ],
      urls: {
        add: "currency",
        modify: "currency",
        search: "currency",
        pages: "currency/pages",
        page: "currency/page",
        lastPage: "currency/lastPage",
        filter: "currency/filteredPages",
        pageNo: "currency/pageNo",
        delete: "currency",
        preAdd: "currency/preAdd",
        preModify: "currency/preModify",
      },
      preAdd: {
        state: true,
        content: null,
      },
      preModify: {
        state: true,
        content: null,
      },
      details: {
        current_tab: "currency_values",
        loading: false,
        tabs: {
          currency_values: {
            label: "currency_values",
            headers: [
              {
                propName: "value",
                label: "currency_value",
                disabled: true,
                type: "number",
                validationRules: {
                  requiered: true,
                },
              },
            ],
            viewOnly: false,
            recordDetailPropName: "currency_values_list",
            pageURL: {
              master: "currency_code",
              temp: "currency",
            },
          },
          currency_history: {
            label: "currency_history",
            headers: [
              { propName: "exchange_rate", label: "ex_rate" },
              { propName: "max_ex_rate", label: "max_ex_rate" },
              { propName: "min_ex_rate", label: "min_ex_rate" },
              { propName: "modify_user", label: "modify_user" },
              { propName: "modify_user", label: "name", changeOnLang: true },
              { propName: "modify_date", label: "edited_at", type: "date" },
            ],
            viewOnly: true,
            recordDetailPropName: "currency_history_list",
            pageURL: {
              master: "currency_code",
              temp: "currency",
            },
          },
        },
      },
    };
  }
  modify = () => handleModify(this, { local_currency_update: true });
  undo = () => handleDetailsScreensUndo.call(this);
  save = () => handleDetailsScreensSave.call(this);
  recordClick = (record, i) => handleRecordClick(this, record, i, getDetails);
  componentDidMount() {
    setlastIndex(this);
    functionsListenrs(this, true);
    fieldListner.call(this, "local_currency", rateValidtaion);
  }

  // DETAILS HANDLERS
  navigateTabsHandler = (value) => tabsChangeHandler(value)

  detailsAddHandler = (e) => addHandler.call(this, e);

  detailsRemoveHandler = (index, e) => removeHandler.call(this, index, e);

  detailsInputChangeHandler = (event, index, serverValue, validationRules) =>
    detailsInputChangeHandler.call(this, event, index, serverValue, validationRules);

  static getDerivedStateFromProps(props, state) {
    // open local currency field when the local currency field is open
    const {
      fields,
      preAdd: { content: preAddContent },
      preModify: { content: preModifyContent },
      mode,
    } = state;
    const content = mode === "add" ? preAddContent : preModifyContent;
    if (content) {
      const {
        info: { local_currency },
      } = content;
      if (local_currency) {
        if (
          local_currency.currency_code === fields.currency_code.value &&
          !fields.local_currency.writability
        ) {
          fields.local_currency.writability = true;
        }
      }
    }
    const { tools } = handleDrivedState(props, state);
    return {
      tools: tools,
      fields: fields,
    };
  }
  render() {
    const { mode, fields, local_currency_update, record, details } = this.state;
    if (mode === "modify" && local_currency_update) {
      rateValidtaion(fields.local_currency.value, null, this);
      this.setState({ local_currency_update: false });
    }
    // const tabs = TabsHandler.call(this);
    const detailsPanel = (
      <DetailsPanel
        current_tab={details.current_tab}
        details={details}
        record={_.clone(record)}
        mode={mode}
        navigateTabsHandler={this.navigateTabsHandler}
        detailsAddHandler={this.detailsAddHandler}
        detailsRemoveHandler={this.detailsRemoveHandler}
        detailsInputChangeHandler={this.detailsInputChangeHandler}
      />
    );

    return displayContent(this, this.props.location, detailsPanel);
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

export default connect(mapStateToProps, mapDispatchToProps)(Currency);

function rateValidtaion(value, CheckBoxField, Currency) {
  const { fields } = Currency.state;
  const effectedFeilds = [
    "exchange_rate",
    "pos_ex_rate",
    "max_ex_rate",
    "min_ex_rate",
  ];
  if (value) {
    effectedFeilds.forEach((i) => {
      fields[i].writability = false;
      if (["max_ex_rate", "min_ex_rate"].includes(i)) {
        fields[i].value = "";
      } else {
        fields[i].value = 1;
      }
    });
  } else {
    effectedFeilds.forEach((i) => {
      fields[i].writability = true;
    });
  }
  Currency.setState({ fields: fields });
}
