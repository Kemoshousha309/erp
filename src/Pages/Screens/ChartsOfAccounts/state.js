import { CircularProgress } from "@mui/material";
import ChartsExcelInstructions from "./ChartsOfAccsXlsx/ChartsOfAccsXlsx";
import { parentAccHandler } from "./Utilities";


export const ChartsOfAccountsInitState = {
  fields: {
    parent_acc: {
      fieldType: "input",
      type: "number",
      label: "parent_acc",
      validation: {
        required: true,
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
        required: true,
        size: 2147483647,
      },
      validity: {
        valid: true,
        touched: false,
        message: null,
      },
      writability: false,
      value: "",
      // autoIncrement: "/chartofaccounts/nextPK/",
      // autoIncrementValue: "parent_acc",
    },
    acc_d_name: {
      fieldType: "input",
      type: "text",
      label: "name",
      validation: {
        required: true,
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
        { template: "mandatory", value: 1 },
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
        required: true,
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
        { template: "cash_cash_equivalent", value: 1 },
        { template: "inventory", value: 2 },
        { template: "acc_receivable", value: 3 },
        { template: "fixed_asset", value: 4 },
        { template: "Intangible_assets", value: 5 },
      ],
      writability: false,
      hide: true,
      value: "",
    },
  },
  excelSheetOpen: false,
  ExcelSheetInstructions: ChartsExcelInstructions,
  recordPropNames: [
    "acc_no",
    "account_currency_list",
    "acc_d_name",
    "acc_f_name",
    "parent_acc",
    "level",
    "sub",
    "bs",
    "acc_group",
    "dr",
    "acc_type",
    "acc_dtl",
    "cash_flow_type",
    "cc_post",
    "inactive",
    "inactive_reason",
  ],
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
    addExcel: "chartofaccounts/addExcel",
    checkExcel: "chartofaccounts/validateExcel",
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
  tapTools: [],
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
    treeLabels: {
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
        headers: {
          cur_code: {
            propName: "cur_code",
            label: "currency_code",
            disabled: true,
            type: "text",
            validationRules: {
              required: true,
            },
            foreignPropName: "currency_code",
            fk: true,
          },
          active: {
            propName: "active",
            label: "active",
            type: "checkbox",
            validationRules: {
              required: true,
            },
            foreignPropName: "active",
            defaultValue: false,
          },
          used: {
            propName: "used",
            label: "used",
            type: "checkbox",
            validationRules: {
              required: true,
            },
            foreignPropName: "used",
            defaultValue: true,
          },
        },
        viewOnly: false,
        recordDetailPropName: "account_currency_list",
        pageURL: {
          master: "acc_no",
          temp: "chartofaccounts",
        },
        foreignURLs_ADD: {
          pages: "currency/pages",
          page: "currency/page",
          lastPage: "currency/lastPage",
          filter: "currency/filteredPages",
          pageNo: "currency/pageNo",
        },
        foreignMainFields_ADD: [
          "currency_code",
          { label: "name", propName: "currency_d_name" },
          { label: "ex_rate", propName: "exchange_rate" },
        ],
      },
    },
  },
};
