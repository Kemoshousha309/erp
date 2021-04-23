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
    handleUndo,
    handleCloseList,
    handleRecordClick,
    handleInputChange,
    handleCloseShortCuts,
    handleDrivedState
} from "../../../../utilities/tap/handlers"
import { displayContent } from '../../../../utilities/tap/displayContent';

class Massage extends Component{
    state = {
        fields: {
            message_code:{
                fieldType: "input",
                type: "text",
                label: "message_code",
                validation: {
                    requiered: true,
                    length: 60
                },
                validity: {
                    valid: true,
                    touched: false,
                    message: null
                },
                writability: false,     
                value: "" 
            },
            message_desc:{
                fieldType: "input",
                type: "text",
                label: "message_desc",
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
                pk: true
            },
            lang_no_name:{
                fieldType: "input",
                type: "text",
                label: "name",
                writability: false,     
                readOnly: true,           
                value: ""
            },
            
},
        pks: ["message_code", "lang_no"],
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
        mainFields: ["message_code", "message_desc", "lang_no"],
        tapName: "messages",
        deleteConfirm: false,
        searchFields: ["message_code", "lang_no"],
        ShortCutsList: false,
        urls: {
            add: "public/messages",
            modify: "public/messages",
            search: "public/messages",
            pages: "public/messages/pages",   
            page:  "public/messages/page",
            lastPage: "public/messages/lastPage",
            filter: "public/messages/filteredPages",
            pageNo: "public/messages/pageNo",
            delete: "public/messages"
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

     // async handle
     async_lang_no_options = (mode) => {handleAsyncLangNoOpts(this, mode)}

    // LifeCycle methods *******************************************
    componentDidMount () {
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

export default connect(mapStateToProps, null)(Massage);


