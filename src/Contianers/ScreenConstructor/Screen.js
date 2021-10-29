import { langChangeActivity } from "../../store/actions/lang";
import { connect } from "react-redux";
import ScreenConstructor from "./ScreenConstructor";
import { displayContent } from "../../utilities/tap/displayContent";


class Screen extends ScreenConstructor {
    constructor() {
        super();
       this.state = {
           ...this.state,
           fields: {
            label_code:{
                fieldType: "input",
                type: "text",
                label: "label_code",
                validation: {
                    requiered: true,
                    length: 30
                },
                validity: {
                    valid: true,
                    touched: false,
                    message: null
                },
                writability: false,
                value: "",
            },
            label_desc:{
                fieldType: "input",
                type: "text",
                label: "label_desc",
                validation: {
                    requiered: true,
                    length: 200
                },
                validity: {
                    valid: true,
                    touched: false,
                    message: null
                },
                writability: false,
                value: ""
            },
            lang_no:{
                fieldType: "asyncSelect",
                type: "number",
                label: "lang_no",
                validation: {
                    requiered: true
                },
                validity: {
                    valid: true,
                    touched: false,
                    message: null
                },
                options : null,
                writability: false,
                value: "",
                fillFields: [
                    { recordName: "lang_no", stateName: "lang_no" },
                    { recordName: "lang_name", stateName: "lang_no_name" },
                ]
            },
            lang_no_name:{
                fieldType: "input",
                type: "text",
                label: "name",
                writability: false,     
                readOnly: true,       
                value: ""    
            }
},
        pks: ["label_code", "lang_no"],
        urls: {
            add: "public/labels",
            modify: "public/labels",
            search: "public/labels",
            pages: "public/labels/pages",   
            page:  "public/labels/page",
            lastPage: "public/labels/lastPage",
            filter: "public/labels/filteredPages",
            pageNo: "public/labels/pageNo",
            delete: "public/labels"
        },
        fks: ["lang_no"],
        fkList: {
            lang_no: {
                mainFields: ["lang_no", "lang_name", "lang_dir"],
                urls: {
                    add: "public/language",
                    modify: "public/language",
                    search: "public/language",
                    pages: "public/language/pages",   
                    page:  "public/language/page",
                    lastPage: "public/language/lastPage",
                    filter: "public/language/filteredPages",
                    pageNo: "public/language/pageNo",
                    delete: "public/language"
                }
            },

        },
        tapTools: [],
        mainFields: ["label_code", "label_desc", "lang_no"],
        tapName: "labels",
        searchFields: ["label_code", 'lang_no'],
       }
    }

    render() {
        console.log("child=>", this.state)
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

export default connect(mapStateToProps, mapDispatchToProps)(Screen);
