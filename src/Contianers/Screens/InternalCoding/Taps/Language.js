import { Component} from 'react';
import {connect} from "react-redux";
import { toolSelectHandler } from '../../../../utilities/tools';
import {handleDelete, handleDeleteConfirmation} from "../../../../utilities/tap/delete"
import {handleSearch} from "../../../../utilities/tap/search"
import {handleSave} from "../../../../utilities/tap/save"
import {add_lan_dir_options} from '../../../../utilities/tap/async'
import {handleMove, setlastIndex} from "../../../../utilities/tap/moves"
import {functionsListenrs} from "../../../../utilities/tap/listeners"
import {
    handleAdd,
    handleModify,
    handleList,
    handleCopy,
    handleUndo,
    handleCloseList,
    handleRecordClick,
    handleInputChange,
    handleCloseShortCuts,
    handleDrivedState
} from "../../../../utilities/tap/handlers"
import { displayContent } from '../../../../utilities/tap/displayContent';

class Language extends Component{
    state = {
        fields: {
            lang_no:{
                fieldType: "input",
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
                writability: false,
                value: "",
            },
            lang_name:{
                fieldType: "input",
                type: "text",
                label: "name",
                validation: {
                    requiered: true,
                    length: 50
                },
                validity: {
                    valid: true,
                    touched: false,
                    message: null
                },
                writability: false,     
                value: "" 
            },
            lang_dir:{
                fieldType: "select",
                type: "number",
                label: "lang_dir",
                validation: {
                    requiered: true
                },
                validity: {
                    valid: true,
                    touched: false,
                    message: null
                },
                writability: false,
                value: "",
            },
            report_ext:{
                fieldType: "input",
                type: "text",
                label: "report_ext",
                validation: {
                    requiered: true,
                    length: 10
                },
                validity: {
                    valid: true,
                    touched: false,
                    message: null
                },
                writability: false,
                value: ""
            },
            lang_ext:{
                fieldType: "input",
                type: "text",
                label: "lang_ext",
                validation: {
                    requiered: true,
                    length: 10
                },
                validity: {
                    valid: true,
                    touched: false,
                    message: null
                },
                writability: false,
                value: ""
            },
            lang_dfl:{
                fieldType: "checkbox",
                type: "checkbox",
                label: "lang_dfl",
                writability: false,
                value: false
            },
            active:{
                fieldType: "checkbox",
                type: "checkbox",
                label: "active",
                writability: false,
                value: false
            },
            
},
        pks: ["lang_no"],
        tapTools: ["delete"], // to be deleted and view the others
        tools: null,
        mode: "start",
        // we handle prevMode in list show only ....
        prevMode: null,
        recordIndex: null,
        lastIndex: null,
        message: null,
        loading: false,
        listShow: false,
        mainFields: ["lang_no", "lang_name", "lang_dir"],
        tapName: "language",
        deleteConfirm: false,
        searchFields: ['lang_no'],
        ShortCutsList: false,
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
    recordClick = (record, i) => handleRecordClick(this, record, i)
    inputChange = (state, identifier) => handleInputChange(this, state, identifier)
    deleteConfirmation = (res) => handleDeleteConfirmation(this, res)
    ShortCutsListCloseHandler = () => handleCloseShortCuts(this)

    // LifeCycle methods *******************************************
    componentDidMount () {
        add_lan_dir_options(this)
        setlastIndex(this)
        functionsListenrs(this, true)
    }
    componentWillUnmount () {functionsListenrs(this, false)}
    static getDerivedStateFromProps(props, state){return handleDrivedState (props, state)}

    render (){return displayContent(this)}
} 

const mapStateToProps = state => {
    return {
        lanState: state.lang.lan,
        lanTable: state.lang.langTables,
        token: state.auth.authData.token,
        languages: state.lang.langInfo
    }
}

export default connect(mapStateToProps, null)(Language);


