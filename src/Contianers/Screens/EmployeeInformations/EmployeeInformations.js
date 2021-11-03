import { connect } from "react-redux";
import { langChangeActivity } from "../../../store/actions/lang";
import { displayContent } from "../../ScreenConstructor/screen/displayContent";
import ScreenConstructor from "../../ScreenConstructor/ScreenConstructor";

class EmployeeInformations extends ScreenConstructor {
  constructor() {
    super();
    this.state = {
      ...this.state,
      fields: {
        emp_no: {
          fieldType: "input",
          type: "number",
          label: "emp_no",
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
        emp_d_name: {
          fieldType: "input",
          type: "text",
          label: "name",
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
        emp_f_name: {
          fieldType: "input",
          type: "text",
          label: "foreign_name",
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
        inactive: {
          fieldType: "checkbox",
          type: "checkbox",
          label: "inactive",
          writability: false,
          value: "",
        },
      },
      pks: ["emp_no"],
      urls: {
        add: "empinfo",
        modify: "empinfo",
        search: "empinfo",
        pages: "empinfo/pages",
        page: "empinfo/page",
        lastPage: "empinfo/lastPage",
        filter: "empinfo/filteredPages",
        pageNo: "empinfo/pageNo",
        delete: "empinfo",
        preAdd: "empinfo/preAdd",
      },
      mainFields: ["emp_no", {label: "name", propName: "emp_d_name"}],
      tapName: "empinfo",
      searchFields: ["emp_no"],
      preAdd: {
          state: true,
          connect: null
      },
    };
  }
  render() {
    return displayContent(this, this.props.location);
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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeInformations);
