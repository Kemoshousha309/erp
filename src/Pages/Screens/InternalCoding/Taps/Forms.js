import { connect } from "react-redux";
import { setlastIndex } from "../../../ScreenConstructor/screen/functions/moves";
import { functionsListenrs } from "../../../ScreenConstructor/screen/listeners";
import ScreenConstructor from "../../../ScreenConstructor/ScreenConstructor";
import {
  autoDisplay, changePropName,
} from "../../../ScreenConstructor/screen/inputsHandlers"
import { handleDrivedState } from "../../../ScreenConstructor/screen/handlers";
import { displayContent } from "../../../ScreenConstructor/screen/displayContent";
import { langChangeActivity } from "../../../../store/actions/lang";
import { CircularProgress } from "@mui/material";
import { handleRecordClick } from "../../../ScreenConstructor/screen/functions/list";
import { getTree } from "../../../ScreenConstructor/screen/async";
import { getTreeStructure } from "../../../../Helpers/tree";


class Forms extends ScreenConstructor {
  constructor() {
    super();
    this.state = {
      ...this.state,
      fields: {
        module_no: {
          fieldType: "input",
          type: "number",
          label: "module_no",
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
          fKTable: {
            bothLangs: true,
          },
          fillFields: [
            { recordName: "module_d_name", stateName: "module_no_d_name" },
            { recordName: "module_f_name", stateName: "module_no_f_name" },
            { recordName: "module_no", stateName: "module_no" },
          ],
        },
        module_no_name: {
          fieldType: "input",
          label: "name",
          readOnly: true,
          value: "",
        },
        form_no: {
          fieldType: "input",
          type: "number",
          label: "form_no",
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
        form_d_name: {
          fieldType: "input",
          type: "text",
          label: "name",
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
        },
        form_f_name: {
          fieldType: "input",
          type: "text",
          label: "foreign_name",
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
        },
        parent_form: {
          fieldType: "input",
          type: "number",
          label: "parent_form",
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
          fillFields: [
            {
              recordName: "parent_form_d_name",
              stateName: "parent_form_d_name",
            },
            {
              recordName: "parent_form_f_name",
              stateName: "parent_form_f_name",
            },
            { recordName: "parent_form", stateName: "parent_form" },
          ],
        },
        parent_form_name: {
          fieldType: "input",
          label: "name",
          readOnly: true,
          value: "",
        },

        form_order: {
          fieldType: "input",
          type: "number",
          label: "form_order",
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
        active: {
          fieldType: "checkbox",
          type: "checkbox",
          label: "active",
          writability: false,
          value: false,
        },
        main: {
          fieldType: "checkbox",
          type: "checkbox",
          label: "main",
          writability: false,
          value: false,
        },
      },
      pks: ["form_no"],
      tapName: "forms",
      mainFields: ["form_no", "module_no", "form_d_name"],
      searchFields: ["form_no"],
      urls: {
        modify: "forms",
        search: "forms",
        pages: "forms/pages",
        page: "forms/page",
        lastPage: "forms/lastPage",
        filter: "forms/filteredPages",
        pageNo: "forms/pageNo",
        delete: "forms",
      },
      fks: ["module_no", "parent_form"],
      fkList: {
        module_no: {
          mainFields: ["module_no", "shortcut", "module_d_name"],
          urls: {
            add: "modules",
            modify: "modules",
            search: "modules",
            pages: "modules/pages",
            page: "modules/page",
            lastPage: "modules/lastPage",
            filter: "modules/filteredPages",
            pageNo: "modules/pageNo",
            delete: "modules",
          },
        },
        parent_form: {
          mainFields: ["form_no", "module_no", "form_d_name"],
          urls: {
            modify: "forms",
            search: "forms",
            pages: "forms/pages",
            page: "forms/page",
            lastPage: "forms/lastPage",
            filter: "forms/filteredPages",
            pageNo: "forms/pageNo",
            delete: "forms",
          },
        },
      },
      tapTools: ["delete", "add", "copy"],
      tree: null,
      treeLoading: <CircularProgress className="m-5" />,
    };
  }
  treeNodeClick = (record) => handleRecordClick(this, record);
  componentDidMount() {
    getTree.call(this, "forms/mainTree", getTreeStructure);
    setlastIndex(this);
    functionsListenrs(this, true);

    // inputs handlers
    autoDisplay(this, "parent_form", "forms", {
      main: {
        d: {
          recordProp: "parent_form_d_name",
          stateProp: "parent_form_d_name",
        },
        f: {
          recordProp: "parent_form_f_name",
          stateProp: "parent_form_f_name",
        },
      },
    });

    autoDisplay(this, "module_no", "modules", {
      main: {
        d: { recordProp: "module_d_name", stateProp: "module_no_d_name" },
        f: { recordProp: "module_f_name", stateProp: "module_no_f_name" },
      },
    });
  }

  static getDerivedStateFromProps(props, state) {
    let fieldsUpdate = changePropName(
      props,
      state.fields,
      "module_no_name",
      "module_no",
      "module_no"
    );
    fieldsUpdate = changePropName(
      props,
      fieldsUpdate,
      "parent_form_name",
      "parent_form",
      "parent_form"
    );
    const { tools } = handleDrivedState(props, state);
    return {
      tools: tools,
      fields: fieldsUpdate,
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

export default connect(mapStateToProps, mapDispatchToProps)(Forms);
