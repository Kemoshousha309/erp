import { Component} from 'react';
import {connect} from "react-redux";
import { toolSelectHandler } from '../../../../utilities/tools';
import {handleDelete, handleDeleteConfirmation} from "../../../../utilities/tap/delete"
import {handleSearch} from "../../../../utilities/tap/search"
import {handleSave} from "../../../../utilities/tap/save"
import {handleAsyncLangNoOpts} from '../../../../utilities/tap/async'
import {handleMove, setlastIndex} from "../../../../utilities/tap/moves"
import {functionsListenrs} from "../../../../utilities/tap/listeners"
import {
    handleAdd,
    handleModify,
    handleList,
    handleCopy,
    handleCloseList,
    handleRecordClick,
    handleInputChange,
    handleCloseShortCuts,
    handleDrivedState,
    handleCloseFkList,
    fkRecordClickHandler
} from "../../../../utilities/tap/handlers"
import { displayContent } from '../../../../utilities/tap/displayContent';
import { langChangeActivity } from '../../../../store/actions/lang';
import { handleUndo } from '../../../../utilities/tap/undo';


class Label extends Component{
    state = {
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
        fkListShow: null,
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
        tools: null,
        mode: "start",
        // we handle prevMode in list show only ....
        prevMode: null,
        recordIndex: null,
        lastIndex: null,
        message: null,
        loading: false,
        listShow: false,
        mainFields: ["label_code", "label_desc", "lang_no"],
        tapName: "labels",
        deleteConfirm: false,
        searchFields: ["label_code", 'lang_no'],
        ShortCutsList: false,
    }

    // Tools Handle *********************************************
    toolsClickedHandler = identifier => toolSelectHandler(identifier, this)
    modify = () => handleModify(this)
    add = () => handleAdd(this)
    undo = () => handleUndo(this)
    save = () => handleSave(this)
    copy = () => handleCopy(this)
    list = () => handleList(this)
    delete = () => handleDelete(this)
    search = () => handleSearch(this)
    previous = () => handleMove("previous", this)
    next = () => handleMove("next", this)
    first = () =>  handleMove("first", this)
    last = () => handleMove("last", this)

    // Handlers ************************************************
    closeList = () =>  handleCloseList(this)
    closeFkList = () => handleCloseFkList(this)
    recordClick = (record, i) => handleRecordClick(this, record, i)
    recordFkClick = (record, i) => fkRecordClickHandler(this, record)
    inputChange = (state, identifier) => handleInputChange(this, state, identifier)
    deleteConfirmation = (res) => handleDeleteConfirmation(this, res)
    ShortCutsListCloseHandler = () => handleCloseShortCuts(this)

    // async handle
    async_lang_no_options = (mode) => {handleAsyncLangNoOpts(this, mode)}
 
    // LifeCycle methods *******************************************
    componentDidMount () {
        setlastIndex(this)
        functionsListenrs(this, true)
    }
    componentWillUnmount () {
        functionsListenrs(this, false)
        this.props.changeLangSelectAcivity(true)
    }
    static getDerivedStateFromProps(props, state){return handleDrivedState (props, state)}
    render (){
        return displayContent(this, this.props.location)
    }
} 

const mapStateToProps = state => {
    return {
        lanState: state.lang.lan,
        lanTable: state.lang.langTables,
        token: state.auth.authData.token,
        languages: state.lang.langInfo,
        rawTree_hash: state.auth.authData.raw_tree_hash,
        forms_privs_hash: state.auth.authData.forms_privs_hash
    }   
}
const mapDispatchToProps = dispatch => {
    return {
        changeLangSelectAcivity: (mode) => dispatch(langChangeActivity(mode))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Label);


