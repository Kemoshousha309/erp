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
import { autoDisplay } from '../../../../utilities/tap/inputsHandlers';
import { fields } from '../../../../utilities/tap/fields';
import { handleUndo } from '../../../../utilities/tap/undo';

class Flags extends Component{
    state = {
        fields: {   
            flag_code:{
                fieldType: "input",
                type: "text",
                label: "flag_code",
                validation: {
                    length: 30
                },
                validity: {
                    valid: true,
                    touched: false,
                    message: null
                },
                writability: true,
                value: "",
                fKTable: {
                    SPN: "label_code",
                    PN: "flag_code"
                },
                readOnlyField: "label_code_m",
                readOnlyFieldT: "label_code",
                controlField: true,
                rowStyle: {
                    backgroundColor: "#f8f9fa"
                },
                fillFields: [
                    { recordName: "label_code", stateName: "label_code_m" },
                    { recordName: "flag_code", stateName: "flag_code" },
                ]
            },
            label_code_m:{
                fieldType: "input",
                type: "text",
                label: "label_code",
                readOnly:true,
                writability: false,
                value: "",
                autoFilledSuccess: false,
                controlField: true,
                backgroundColor: "green"
            },
            holder1:{fieldType: "holder"},
            holder2:{fieldType: "holder"},
            flag_value:{
                fieldType: "input",
                type: "number",
                label: "flag_value",
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
            label_code:{
                fieldType: "input",
                type: "text",
                label: "label_code",
                validation: {
                    requiered: true,
                    length: 100
                },
                validity: {
                    valid: true,
                    touched: false,
                    message: null
                },
                writability: true,
                value: "",
            },
            flag_sr:{
                fieldType: "input",
                type: "number",
                label: "flag_sr",
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
                value: "",
            },
            flag_priv:{
                fieldType: "checkbox",
                type: "checkbox",
                label: "flag_priv",
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
        pks: ["flag_value"],
        urls: {
            add: "flagDetail",
            modify: "flagDetail",
            search: "flagDetail",
            pages: "flagDetail/pages",   
            page:  "flagDetail/page",
            lastPage: "flagDetail/lastPage",
            filter: "flagDetail/filteredPages",
            pageNo: "flagDetail/pageNo",
            delete: "flagDetail"
        },
        fks: [ "flag_code"],
        fkListShow: null,
        fkList: {
            flag_code: {
                mainFields: ["flag_code", "label_code"],
                urls: {
                    add: "flagMaster",
                    modify: "flagMaster",
                    search: "flagMaster",
                    pages: "flagMaster/pages",   
                    page:  "flagMaster/page",
                    lastPage: "flagMaster/lastPage",
                    filter: "flagMaster/filteredPages",
                    pageNo: "flagMaster/pageNo",
                    delete: "flagMaster"
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
        mainFields: ["flag_value", "label_code"],
        tapName: "labels",
        deleteConfirm: false,
        searchFields: ["flag_value"],
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
        this.setState({mode: "list"})

        autoDisplay(this, "flag_code", "public/flagMaster", {
            main: {
                d: { recordProp: "label_code", stateProp: "label_code_m" },
                f: { recordProp: "label_code", stateProp: "label_code_m" },
            }
        })
    }

    componentWillUnmount () {
        functionsListenrs(this, false)
        this.props.changeLangSelectAcivity(true)
    }
    static getDerivedStateFromProps(props, state){
        let mode = state.mode
        let urls = state.urls
        let fieldsClone = {...state.fields}
        const modes =  ["modify", "search", "d_record", "copy", "add"]
        if(state.fields.label_code_m.autoFilledSuccess){
            if(!modes.includes(mode)){
                mode = "start"
            }
            const flag_code = state.fields.flag_code.value
            urls = {
                add: `flagDetail`,
                modify: `flagDetail`,
                search: `flagDetail/${flag_code}`,
                pages: `flagDetail/${flag_code}/pages`,   
                page:  `flagDetail/${flag_code}/page`,
                lastPage: `flagDetail/${flag_code}/lastPage`,
                filter: `flagDetail/${flag_code}/filteredPages`,
                pageNo: `flagDetail/pageNo/${flag_code}`,
                delete: `flagDetail/${flag_code}`
            }
        }else{
            mode = 'list'
            fieldsClone =  fields(state.fields, "close", true)
        }
        const {tools} =  handleDrivedState (props, state)
        return {
            fields: fieldsClone,
            tools: tools,
            mode: mode,
            urls: urls
        }
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(Flags);


