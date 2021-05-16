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
    handleDrivedState,
    handleCloseFkList,
    handleRecordFkClick
} from "../../../../utilities/tap/handlers"
import { displayContent } from '../../../../utilities/tap/displayContent';
import { langChangeActivity } from '../../../../store/actions/lang';
import { autoNameDisplay } from '../../../../utilities/tap/inputsHandlers';
import { fields } from '../../../../utilities/tap/fields';

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
                readOnlyField: "label_code",
                controlField: true,
                rowStyle: {
                    backgroundColor: "#f8f9fa"
                }
            },
            label_code:{
                fieldType: "input",
                type: "text",
                label: "name",
                readOnly:true,
                writability: false,
                value: "",
                autoFilledSuccess: false,
                controlField: true,
                backgroundColor: "green"
            },
            // holder3:{fieldType: "line"},
            // holder4:{fieldType: "line"},    
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
            // lang_no:{
            //     fieldType: "asyncSelect",
            //     type: "number",
            //     label: "lang_no",
            //     validation: {
            //         requiered: true
            //     },
            //     validity: {
            //         valid: true,
            //         touched: false,
            //         message: null
            //     },
            //     options : null,
            //     writability: false,
            //     value: "",
            // },
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
            // lang_no: {
            //     mainFields: ["lang_no", "lang_name", "lang_dir"],
            //     urls: {
            //         add: "public/language",
            //         modify: "public/language",
            //         search: "public/language",
            //         pages: "public/language/pages",   
            //         page:  "public/language/page",
            //         lastPage: "public/language/lastPage",
            //         filter: "public/language/filteredPages",
            //         pageNo: "public/language/pageNo",
            //         delete: "public/language"
            //     }
            // },
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
        tapTools: ['add', "copy", "delete"],
        tools: null,
        mode: "start",
        // we handle prevMode in list show only ....
        prevMode: null,
        recordIndex: null,
        lastIndex: null,
        message: null,
        loading: false,
        listShow: false,
        mainFields: ["flag_value", "label_code", "flag_sr"],
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
    recordFkClick = (record, i) => handleRecordFkClick(this, record, i)
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

        autoNameDisplay(this, "flag_code", "public/flagMaster", "label_code")
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
        if(state.fields.label_code.autoFilledSuccess){
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
        return displayContent(this)
    }
} 

const mapStateToProps = state => {
    return {
        lanState: state.lang.lan,
        lanTable: state.lang.langTables,
        token: state.auth.authData.token,
        languages: state.lang.langInfo
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeLangSelectAcivity: (mode) => dispatch(langChangeActivity(mode))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Flags);


