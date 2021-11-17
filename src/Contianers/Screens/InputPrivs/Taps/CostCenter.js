import { connect } from "react-redux";
import { handleDrivedState } from "../../../ScreenConstructor/screen/handlers";
import { displayContent } from "../../../ScreenConstructor/screen/displayContent";
import { langChangeActivity } from "../../../../store/actions/lang";
import InputPrivsConstructor from "../InputPrivsConstructor/InputPrivsConstructor";
import { initInputPrivsView } from "../InputPrivsConstructor/InputPrivsView"


class Branches extends InputPrivsConstructor {
  constructor(){
    super();
    this.state = {
      ...this.state,
      fields: {
        from_cc_no: {
          fieldType: "input",
          type: "number",
          label: "from_cc_no",
          validation: {
            length: 11,
          },
          validity: {
            valid: true,
            touched: false,
            message: null,
          },
          writability: true,
          controlField: true,
          value: "",
          fillFields: [
            { recordName: "cc_no", stateName: "from_cc_no" },
          ],
        },
        to_cc_no: {
          fieldType: "input",
          type: "number",
          label: "to",
          validation: {
            length: 30,
          },
          validity: {
            valid: true,
            touched: false,
            message: null,
          },
          writability: true,
          controlField: true,
          value: "",
          fillFields: [
            { recordName: "cc_no", stateName: "to_cc_no" },
          ],
        },
        from_user_id: {
          fieldType: "input",
          type: "number",
          label: "from_user_id",
          validation: {
            length: 30,
          },
          validity: {
            valid: true,
            touched: false,
            message: null,
          },
          writability: true,
          controlField: true,
          value: "",
          fillFields: [
            { recordName: "user_id", stateName: "from_user_id" },
          ],
        },
        to_user_id: {
          fieldType: "input",
          type: "number",
          label: "to",
          validation: {
            length: 30,
          },
          validity: {
            valid: true,
            touched: false,
            message: null,
          },
          writability: true,
          controlField: true,
          value: "",
          fillFields: [
            { recordName: "user_id", stateName: "to_user_id" },
          ],
        },
        from_group_no: {
          fieldType: "input",
          type: "number",
          label: "from_group_no",
          validation: {
            length: 11,
          },
          validity: {
            valid: true,
            touched: false,
            message: null,
          },
          writability: true,
          controlField: true,
          value: "",
          fillFields: [
            { recordName: "group_no", stateName: "from_group_no" },
            { recordName: "group_f_name", stateName: "from_group_no_f_name" },
            { recordName: "group_d_name", stateName: "from_group_no_d_name" },
          ],
        },
        to_group_no: {
          fieldType: "input",
          type: "number",
          label: "to",
          validation: {
            length: 11,
          },
          validity: {
            valid: true,
            touched: false,
            message: null,
          },
          writability: true,
          controlField: true,
          value: "",
          fillFields: [
            { recordName: "group_no", stateName: "to_group_no" },
            { recordName: "group_f_name", stateName: "to_group_no_f_name" },
            { recordName: "group_d_name", stateName: "to_group_no_d_name" },
          ],
        },
        group_no: {
          fieldType: "input",
          type: "number",
          label: "group_no",
          validation: {
            length: 30,
          },
          validity: {
            valid: true,
            touched: false,
            message: null,
          },
          writability: true,
          controlField: true,
          value: "",
          fillFields: [
            { recordName: "group_no", stateName: "group_no" },
          ],
        },
      },
      fks: [
        "from_cc_no",
        "to_cc_no",
        "from_user_id",
        "to_user_id",
        "from_group_no",
        "to_group_no",
        "group_no",
      ],
      fkList: {
        from_cc_no: {
          mainFields: [
            "parent_cc",
            "cc_no",
            { label: "name", propName: "cc_d_name" },
          ],
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
        to_cc_no: {
          mainFields: [
            "parent_cc",
            "cc_no",
            { label: "name", propName: "cc_d_name" },
          ],
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
        from_user_id: {
          mainFields: [
            { label: "user_no", propName: "user_id" },
            { propName: "direct_mang", label: "direct_manager" },
            "group_no",
            { label: "name", propName: "user_d_name" },
          ],
          urls: {
            add: "users",
            modify: "users",
            search: "users",
            pages: "users/pages",
            page: "users/page",
            lastPage: "users/lastPage",
            filter: "users/filteredPages",
            pageNo: "users/pageNo",
            delete: "users",
          },
        },
        to_user_id: {
          mainFields: [
            { label: "user_no", propName: "user_id" },
            { propName: "direct_mang", label: "direct_manager" },
            "group_no",
            { label: "name", propName: "user_d_name" },
          ],
          urls: {
            add: "users",
            modify: "users",
            search: "users",
            pages: "users/pages",
            page: "users/page",
            lastPage: "users/lastPage",
            filter: "users/filteredPages",
            pageNo: "users/pageNo",
            delete: "users",
          },
        },
        from_group_no: {
          mainFields: ["group_no", { label: "name", propName: "group_d_name" }],
          urls: {
            pages: "accountsgroup/pages",
            page: "accountsgroup/page",
            lastPage: "accountsgroup/lastPage",
            filter: "accountsgroup/filteredPages",
            pageNo: "accountsgroup/pageNo",
          },
        },
        to_group_no: {
          mainFields: ["group_no", { label: "name", propName: "group_d_name" }],
          urls: {
            pages: "accountsgroup/pages",
            page: "accountsgroup/page",
            lastPage: "accountsgroup/lastPage",
            filter: "accountsgroup/filteredPages",
            pageNo: "accountsgroup/pageNo",
          },
        },
        group_no: {
          mainFields: [
            "group_no",
            { label: "name", propName: "group_d_name" },
            "admin_group",
          ],
          urls: {
            add: "usersgroups",
            modify: "usersgroups",
            search: "usersgroups",
            pages: "usersgroups/pages",
            page: "usersgroups/page",
            lastPage: "usersgroups/lastPage",
            filter: "usersgroups/filteredPages",
            pageNo: "usersgroups/pageNo",
            delete: "usersgroups",
          },
        },
      },
      // to indicate the content of the privs table
      content: {
        header: ["cc_no", "name", "user_no", "name", "add", "view"],
        propsName: [
          "cost_center",
          { d: "cc_d_name", f: "cc_f_name" },
          "user_id",
          { d: "user_d_name", f: "user_f_name" },
          "add_priv",
          "view_priv",
        ],
      },
      // to indicate the url of the screen
      url: "costcenters",
      // to indicate the props names
      propsNames: ["user_id", "cost_center", "add_priv", "view_priv"],
      // pks
      identifiers:  ["user_id", "cost_center"]
    };
  }

  static getDerivedStateFromProps(props, state) {
    let { mode, input_privs } = state;
    if (mode === "start") {
      input_privs = null;
    }
    const { tools } = handleDrivedState(props, state);
    return {
      tools: tools,
      input_privs: input_privs,
    };
  }

  render() {
    return displayContent(this, this.props.location, initInputPrivsView.call(this));
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
    logged_user_id: state.auth.authData.user_id,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    changeLangSelectAcivity: (mode) => dispatch(langChangeActivity(mode)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Branches);
