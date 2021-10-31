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

class Zone extends ScreenConstructor {
  constructor() {
    super();
    this.state = {
      ...this.state,
      fields: {
        zone_no: {
          fieldType: "input",
          type: "number",
          label: "zone_no",
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
          autoIncrement: "zone/nextPK",
        },
        zone_d_name: {
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
        zone_f_name: {
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
        hold: {
          fieldType: "holde",
        },
        city_no: {
          fieldType: "input",
          type: "number",
          label: "city_no",
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
          fKTable: {
            SPN: "city",
            PN: "city_no",
          },
          fillFields: [
            {
              recordName: "city_no",
              stateName: "city_no",
            },
            {
              recordName: "city_d_name",
              stateName: "city_no_d_name",
            },
            {
              recordName: "city_f_name",
              stateName: "city_no_f_name",
            },
            {
              recordName: "province_no",
              stateName: "province_no",
            },
            {
              recordName: "province_no_d_name",
              stateName: "province_no_d_name",
            },
            {
              recordName: "province_no_f_name",
              stateName: "province_no_f_name",
            },
            {
              recordName: "country_no",
              stateName: "country_no",
            },
            {
              recordName: "country_no_d_name",
              stateName: "country_no_d_name",
            },
            {
              recordName: "country_no_f_name",
              stateName: "country_no_f_name",
            },
            {
              recordName: "region_no",
              stateName: "region_no",
            },
            {
              recordName: "region_no_d_name",
              stateName: "region_no_d_name",
            },
            {
              recordName: "region_no_f_name",
              stateName: "region_no_f_name",
            },
          ],
        },
        city_no_name: {
          fieldType: "input",
          label: "name",
          readOnly: true,
          value: "",
        },
        province_no: {
          fieldType: "input",
          label: "province_no",
          readOnly: true,
          value: "",
        },
        province_no_name: {
          fieldType: "input",
          label: "name",
          readOnly: true,
          value: "",
        },

        country_no: {
          fieldType: "input",
          label: "country_no",
          readOnly: true,
          value: "",
        },
        country_no_name: {
          fieldType: "input",
          label: "name",
          readOnly: true,
          value: "",
        },
        region_no: {
          fieldType: "input",
          label: "region_no",
          readOnly: true,
          value: "",
        },
        region_no_name: {
          fieldType: "input",
          label: "name",
          readOnly: true,
          value: "",
        },
      },
      pks: ["zone_no"],
      mainFields: ["zone_no", "zone_d_name"],
      tapName: "zone",
      searchFields: ["zone_no"],
      urls: {
        add: "zone",
        modify: "zone",
        search: "zone",
        pages: "zone/pages",
        page: "zone/page",
        lastPage: "zone/lastPage",
        filter: "zone/filteredPages",
        pageNo: "zone/pageNo",
        delete: "zone",
      },
      fks: ["region_no", "country_no", "province_no", "city_no"],
      fkList: {
        region_no: {
          mainFields: ["region_no", "region_d_name", "shortcut"],
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
        },
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
        province_no: {
          mainFields: ["province_no", "province_d_name", "shortcut"],
          urls: {
            add: "province",
            modify: "province",
            search: "province",
            pages: "province/pages",
            page: "province/page",
            lastPage: "province/lastPage",
            filter: "province/filteredPages",
            pageNo: "province/pageNo",
            delete: "province",
          },
        },
        city_no: {
          mainFields: ["city_no", "city_d_name", "shortcut"],
          urls: {
            add: "city",
            modify: "city",
            search: "city",
            pages: "city/pages",
            page: "city/page",
            lastPage: "city/lastPage",
            filter: "city/filteredPages",
            pageNo: "city/pageNo",
            delete: "city",
          },
        },
      },
    };
  }
  componentDidMount() {
    setlastIndex(this);
    functionsListenrs(this, true);

    autoDisplay(this, "city_no", "city", {
      main: {
        d: { recordProp: "city_d_name", stateProp: "city_no_d_name" },
        f: { recordProp: "city_f_name", stateProp: "city_no_f_name" },
      },
      others: [
        {
          d: {
            recordProp: "province_no_d_name",
            stateProp: "province_no_d_name",
          },
          f: {
            recordProp: "province_no_f_name",
            stateProp: "province_no_f_name",
          },
        },
        {
          d: { recordProp: "province_no", stateProp: "province_no" },
          f: { recordProp: "province_no", stateProp: "province_no" },
        },
        {
          d: {
            recordProp: "country_no_d_name",
            stateProp: "country_no_d_name",
          },
          f: {
            recordProp: "country_no_f_name",
            stateProp: "country_no_f_name",
          },
        },
        {
          d: { recordProp: "country_no", stateProp: "country_no" },
          f: { recordProp: "country_no", stateProp: "country_no" },
        },
        {
          d: { recordProp: "region_no_d_name", stateProp: "region_no_d_name" },
          f: { recordProp: "region_no_f_name", stateProp: "region_no_f_name" },
        },
        {
          d: { recordProp: "region_no", stateProp: "region_no" },
          f: { recordProp: "region_no", stateProp: "region_no" },
        },
      ],
    });
  }
  static getDerivedStateFromProps(props, state) {
    let fieldsUpdate = changePropName(
      props,
      state.fields,
      "region_no_name",
      "region_no"
    );
    fieldsUpdate = changePropName(
      props,
      fieldsUpdate,
      "country_no_name",
      "country_no"
    );
    fieldsUpdate = changePropName(
      props,
      fieldsUpdate,
      "province_no_name",
      "province_no"
    );
    fieldsUpdate = changePropName(
      props,
      fieldsUpdate,
      "city_no_name",
      "city_no"
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

export default connect(mapStateToProps, mapDispatchToProps)(Zone);
