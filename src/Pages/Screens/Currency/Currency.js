import { connect } from "react-redux";
import { langChangeActivity } from "../../../store/actions/lang";
import { displayContent } from "../../ScreenConstructor/screen/displayContent";
import { fieldListner } from "../../ScreenConstructor/screen/fields";
import {  handleModifyModel } from "../../ScreenConstructor/screen/functions/modify";
import { setlastIndex } from "../../ScreenConstructor/screen/functions/moves";
import { functionsListenrs } from "../../ScreenConstructor/screen/listeners";
import { initDetials } from "../../ScreenConstructor/screen/Details/DetailsPanel";
import ScreenConstructor from "../../ScreenConstructor/ScreenConstructor";
import { updateMode } from "../../ScreenConstructor/screen/mode";

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
      tapTools: ["copy", "excel"], // to be deleted and view the others
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
        type: "PRIMARY",
        show: true,
        tabs: {
          currency_values: {
            label: "currency_values",
            headers: {
              value: {
                propName: "value",
                label: "currency_value",
                disabled: true,
                type: "number",
                validationRules: {
                  requiered: true,
                },
              },
            },
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
  modify = async () => {
    handleModifyModel.call(this);
    this.setState({local_currency_update: true})
  };
  componentDidMount() {
    setlastIndex(this);
    functionsListenrs(this, true);
    const {tools} = updateMode("start", this.state, this.props)
    this.setState({tools})
    fieldListner.call(this, "local_currency", rateValidtaion);
  }

  static getDerivedStateFromProps(props, state) {
    // open local currency field when the local currency field is open
    const {
      fields,
      // preAdd: { content: preAddContent },
      // preModify: { content: preModifyContent },
      // mode,
    } = state;
    // const content = mode === "add" ? preAddContent : preModifyContent;
    // if (content) {
    //   const {
    //     info: { local_currency },
    //   } = content;
    //   if (local_currency) {
    //     if (
    //       local_currency.currency_code === fields.currency_code.value &&
    //       !fields.local_currency.writability
    //     ) {
    //       fields.local_currency.writability = true;
    //     }
    //   }
    // }
    return {
      fields: fields,
    };
  }
  render() {
    const { mode, fields, local_currency_update } = this.state;
    if (mode === "modify" && local_currency_update) {
      rateValidtaion(fields.local_currency.value, null, this);
      this.setState({ local_currency_update: false });
    }
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