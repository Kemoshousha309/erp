import { connect } from "react-redux";
import ScreenConstructor from "../../../ScreenConstructor/ScreenConstructor";
import { displayContent } from "../../../ScreenConstructor/screen/displayContent";
import { langChangeActivity } from "../../../../store/actions/lang";

class Region extends ScreenConstructor {
  constructor() {
    super();
    this.state = {
      ...this.state,
      fields: {
        region_no: {
          fieldType: "input",
          type: "number",
          label: "region_no",
          validation: {
            requiered: true,
          },
          validity: {
            valid: true,
            touched: false,
            message: null,
          },
          writability: false,
          value: "",
          autoIncrement: "region/nextPK",
        },
        region_d_name: {
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
        region_f_name: {
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
        shortcut: {
          fieldType: "input",
          type: "text",
          label: "shortcut",
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
      },
      pks: ["region_no"],
      mainFields: ["region_no", "region_d_name", "shortcut"],
      tapName: "region",
      searchFields: ["region_no"],
      urls: {
        add: "region",
        modify: "region",
        search: "region",
        pages: "region/pages",
        page: "region/page",
        lastPage: "region/lastPage",
        filter: "region/filteredPages",
        pageNo: "region/pageNo",
        delete: "region",
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

export default connect(mapStateToProps, mapDispatchToProps)(Region);
