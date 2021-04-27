import { Component} from 'react';
import {connect} from "react-redux";
import { toolSelectHandler } from '../../../../utilities/tools';
import {handleDelete, handleDeleteConfirmation} from "../../../../utilities/tap/delete"
import {handleSearch} from "../../../../utilities/tap/search"
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
    handleRecordFkClick,
    handleInputChange,
    handleCloseShortCuts,
    handleDrivedState,
    handleCloseFkList
} from "../../../../utilities/tap/handlers"
import { displayContent } from '../../../../utilities/tap/displayContent';
import {getTree , asyncTreeSave} from "../../../../utilities/tap/async" 
import { changeModuleNoNameprop, handleModuleNoName } from '../../../../utilities/tap/inputsHandlers';

class Forms extends Component{
    state = {
        fields: {
            module_no:{
                fieldType: "input",
                type: "number",
                label: "module_no",
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
                fkName: "module" 
            },
            module_no_name:{
                fieldType: "input",
                label: "name",
                readOnly: true,
                value: ""
            },
            form_no:{
                fieldType: "input",
                type: "number",
                label: "form_no",
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
            form_d_name:{
                fieldType: "input",
                type: "text",
                label: "name",
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
            form_f_name:{
                fieldType: "input",
                type: "text",
                label: "foreign_name",
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
            parent_form:{
                fieldType: "input",
                type: "number",
                label: "parent_form",
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
            form_order:{
                fieldType: "input",
                type: "number",
                label: "form_order",
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
            active:{
                fieldType: "checkbox",
                type: "checkbox",
                label: "active",
                writability: false,
                value: false
            },
            main:{
                fieldType: "checkbox",
                type: "checkbox",
                label: "main",
                writability: false,
                value: false
            },
        },
        pks: ["form_no"],
        listShow: false,
        tapName: "forms",
        mainFields: ["form_no", "module_no","form_d_name"],
        searchFields: ["form_no"],
        urls: {
            modify: "forms",
            search: "forms",
            pages: "forms/pages",   
            page:  "forms/page",
            lastPage: "forms/lastPage",
            filter: "forms/filteredPages",
            pageNo: "forms/pageNo",
            delete: "forms"
        },
        fks: ["module_no", "parent_form"],
        fkListShow: null,
        fkList: {
            module_no: {
                mainFields: ["module_no", "shortcut", "module_d_name"],
                urls: {
                    add: "modules",
                    modify: "modules",
                    search: "modules",
                    pages: "modules/pages",   
                    page:  "modules/page",
                    lastPage: "modules/lastPage",
                    filter: "modules/filteredPages",
                    pageNo: "modules/pageNo",
                    delete: "modules"
                },
            },
            parent_form: {
                mainFields: ["form_no", "module_no","form_d_name"],
                urls: {
                    modify: "forms",
                    search: "forms",
                    pages: "forms/pages",   
                    page:  "forms/page",
                    lastPage: "forms/lastPage",
                    filter: "forms/filteredPages",
                    pageNo: "forms/pageNo",
                    delete: "forms"
                },
            }

        },
        tapTools: ["delete", "add", "copy"],
        tools: null,
        mode: "start",
        // we handle prevMode in list show only ....
        prevMode: null,
        recordIndex: null,
        lastIndex: null,
        message: null,
        loading: false,
        deleteConfirm: false,
        ShortCutsList: false,
        tree: null,
    }

    // Tools Handle *********************************************
    toolsClickedHandler = identifier => toolSelectHandler(identifier, this)
    modify = () => handleModify(this)
    add = () => handleAdd(this)
    undo = () => handleUndo(this)
    save = () => asyncTreeSave(this)
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
    recordFkClick = (record, i) => handleRecordFkClick(this, record, i)
    inputChange = (state, identifier) => handleInputChange(this, state, identifier)
    deleteConfirmation = (res) => handleDeleteConfirmation(this, res)
    ShortCutsListCloseHandler = () => handleCloseShortCuts(this)

    
    // LifeCycle methods *******************************************
    componentDidMount () {
        getTree(this)
        setlastIndex(this)
        functionsListenrs(this, true)

        // inputs handlers
        handleModuleNoName(this)
    }
    componentWillUnmount () {functionsListenrs(this, false)}
    static getDerivedStateFromProps(props, state){
        const fieldsUpdate = changeModuleNoNameprop(props, state)
        const {tools} =  handleDrivedState (props, state)
        return {
            tools: tools,
            fields: fieldsUpdate
        }
    }
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

export default connect(mapStateToProps, null)(Forms);


