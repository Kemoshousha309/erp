export const currencyInitState = {
  fields: {
    currency_code: {
      fieldType: "input",
      type: "text",
      label: "currency_code",
      validation: {
        required: true,
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
        required: true,
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
        required: true,
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
        required: true,
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
        required: false,
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
        required: false,
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
        required: false,
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
        required: false,
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
        required: false,
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
              required: true,
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
}