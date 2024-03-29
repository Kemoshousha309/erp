import { CircularProgress } from "@mui/material";
import { parentccHandler } from "./Utilities";

export function CenterInitState() {
  return {
    fields: {
      parent_cc: {
        fieldType: "input",
        type: "number",
        label: "parent_cc",
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
      },
      cc_d_name: {
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
          required: true,
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
    displayPattern: "TREE",
    treeInfo: {
      treeLabels: {
        d: "cc_d_name",
        f: "cc_f_name",
      },
      propToAddToLabel: "cc_no",
      delimiter: " ",
      contain: (input) => `(${input})`,
      nodeIdentifier: "cc_no",
    },
    treeLoading: <CircularProgress className="m-5" />,
  }
}