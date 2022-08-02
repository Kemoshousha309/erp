export const banksInitState = {
  fields: {
    bank_no: {
      fieldType: "input",
      type: "number",
      label: "bank_no",
      validation: {
        required: true,
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
        required: true,
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
        required: false,
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
              required: true,
            },
            foreignPropName: "acc_no",
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
              required: true,
            },
          },
          inactive: {
            propName: "inactive",
            label: "inactive",
            disabled: false,
            type: "checkbox",
            validationRules: {
              required: true,
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
