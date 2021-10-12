import { Component} from 'react';
import {connect} from "react-redux";
import { toolSelectHandler } from '../../../../utilities/tools';
import {handleDelete, handleDeleteConfirmation} from "../../../../utilities/tap/functions/delete"
import {handleSearch} from "../../../../utilities/tap/functions/search"
import {handleSave} from "../../../../utilities/tap/functions/save"
import {handleMove, setlastIndex} from "../../../../utilities/tap/functions/moves"
import { handleUndo } from '../../../../utilities/tap/functions/undo';
import {functionsListenrs} from "../../../../utilities/tap/listeners"
import { displayContent } from '../../../../utilities/tap/displayContent';
import { langChangeActivity } from '../../../../store/actions/lang';
import { handleAdd } from '../../../../utilities/tap/functions/add';
import { handleModify } from '../../../../utilities/tap/functions/modify';
import { handleCloseList, handleList, handleRecordClick } from '../../../../utilities/tap/functions/list';
import { handleCopy } from '../../../../utilities/tap/functions/copy';
import { handleCloseShortCuts, handleDrivedState, handleInputChange } from '../../../../utilities/tap/handlers';

class Module extends Component{
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
            },
            shortcut:{
                fieldType: "input",
                type: "text",
                label: "shortcut",
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
            module_d_name:{
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
            module_f_name:{
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
            order_no:{
                fieldType: "input",
                type: "number",
                label: "order_no",
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
},
        pks: ["module_no"],
        tapTools: ["delete", "add", "copy"],
        tools: null,
        mode: "start",
        // we handle prevMode in list show only ....
        prevMode: null,
        recordIndex: null,
        lastIndex: null,
        message: null,
        loading: false,
        listShow: false,
        mainFields: ["module_no", "shortcut", "module_d_name"],
        tapName: "modules", 
        deleteConfirm: false,
        searchFields: ["module_no"],
        ShortCutsList: false,
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

export default connect(mapStateToProps, mapDispatchToProps)(Module);


