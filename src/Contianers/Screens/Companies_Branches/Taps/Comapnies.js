import { connect } from "react-redux";
import { setlastIndex } from "../../../ScreenConstructor/screen/functions/moves";
import { functionsListenrs } from "../../../ScreenConstructor/screen/listeners";
import ScreenConstructor from "../../../ScreenConstructor/ScreenConstructor";
import {
  autoDisplay,
  changePropName
} from "../../../ScreenConstructor/screen/inputsHandlers"
import { handleDrivedState } from "../../../ScreenConstructor/screen/handlers";
import { displayContent } from "../../../ScreenConstructor/screen/displayContent";
import { langChangeActivity } from "../../../../store/actions/lang";

class Companies extends ScreenConstructor {
  constructor() {
    super();
    this.state = {
      ...this.state,
      fields: {
        company_no: {
          fieldType: "input",
          type: "number",
          label: "company_no",
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
          autoIncrement: "company/nextPK",
        },
        company_d_name: {
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
        company_f_name: {
          fieldType: "input",
          type: "text",
          label: "foreign_name",
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
        company_mail: {
          fieldType: "input",
          type: "email",
          label: "mail",
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
        company_website: {
          fieldType: "input",
          type: "text",
          label: "website",
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
        shortcut_d: {
          fieldType: "input",
          type: "text",
          label: "shortcut",
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
        shortcut_f: {
          fieldType: "input",
          type: "text",
          label: "foreign_shortcut",
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
        holder: {},
        company_group: {
          fieldType: "input",
          type: "number",
          label: "group_no",
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
          fillFields: [
            {
              recordName: "group_no",
              stateName: "company_group",
            },
            {
              recordName: "group_d_name",
              stateName: "group_d_name",
            },
            {
              recordName: "group_f_name",
              stateName: "group_f_name",
            },
          ],
          fKTable: {
            SPN: "group",
            PN: "group_no",
          },
        },
        group_d_name: {
          fieldType: "input",
          label: "name",
          readOnly: true,
          value: "",
        },
        country_no: {
          fieldType: "input",
          type: "number",
          label: "country_no",
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
          fillFields: [
            {
              recordName: "country_no",
              stateName: "country_no",
            },
            {
              recordName: "country_d_name",
              stateName: "country_d_name",
            },
            {
              recordName: "country_f_name",
              stateName: "country_f_name",
            },
          ],
        },
        country_d_name: {
          fieldType: "input",
          label: "name",
          readOnly: true,
          value: "",
        },
      },
      pks: ["company_no"],
      tapTools: [], // to be deleted and view the others
      mainFields: [
        "company_no",
        "company_d_name",
        { propName: { d: "shortcut_d", f: "shortcut_f" }, label: "shortcut" },
      ],
      tapName: "company",
      searchFields: ["company_no"],
      urls: {
        add: "company",
        modify: "company",
        search: "company",
        pages: "company/pages",
        page: "company/page",
        lastPage: "company/lastPage",
        filter: "company/filteredPages",
        pageNo: "company/pageNo",
        delete: "company",
      },
      fks: ["country_no", "company_group"],
      fkList: {
        country_no: {
          mainFields: ["country_no", "country_d_name", "shortcut"],
          urls: {
            add: "country",
            modify: "country",
            search: "country",
            pages: "country/pages",
            page: "country/page",
            lastPage: "country/lastPage",
            filter: "country/filteredPages",
            pageNo: "country/pageNo",
            delete: "country",
          },
        },
        company_group: {
          mainFields: ["group_no", "group_d_name"],
          urls: {
            add: "companyGroup",
            modify: "companyGroup",
            search: "companyGroup",
            pages: "companyGroup/pages",
            page: "companyGroup/page",
            lastPage: "companyGroup/lastPage",
            filter: "companyGroup/filteredPages",
            pageNo: "companyGroup/pageNo",
            delete: "companyGroup",
          },
        },
      },
    };
  }
  componentDidMount() {
    setlastIndex(this);
    functionsListenrs(this, true);

    autoDisplay(this, "company_group", "companyGroup", {
      main: {
        d: { recordProp: "group_d_name", stateProp: "group_d_name" },
        f: { recordProp: "group_f_name", stateProp: "group_f_name" },
      },
    });
    autoDisplay(this, "country_no", "country", {
      main: {
        d: { recordProp: "country_d_name", stateProp: "country_d_name" },
        f: { recordProp: "country_f_name", stateProp: "country_f_name" },
      },
    });
  }

  static getDerivedStateFromProps(props, state) {
    let fieldsUpdate = changePropName(
      props,
      state.fields,
      "group_d_name",
      "group"
    );
    fieldsUpdate = changePropName(
      props,
      fieldsUpdate,
      "country_d_name",
      "country"
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

export default connect(mapStateToProps, mapDispatchToProps)(Companies);
