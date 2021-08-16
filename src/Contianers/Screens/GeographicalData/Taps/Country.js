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
    handleDrivedState,
    handleRecordFkClick,
    handleCloseFkList
} from "../../../../utilities/tap/handlers"
import { displayContent } from '../../../../utilities/tap/displayContent';
import { langChangeActivity } from '../../../../store/actions/lang';
import { autoNameDisplay } from '../../../../utilities/tap/inputsHandlers';



class Country extends Component{
    state = {
        fields: {
            country_no:{
                fieldType: "input",
                type: "number",
                label: "country_no",
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
            country_d_name:{
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
            country_f_name:{
                fieldType: "input",
                type: "text",
                label: "foreign_name",
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
            shortcut:{
                fieldType: "input",
                type: "text",
                label: "shortcut",
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
          
            region_no:{
                fieldType: "input",
                type: "number",
                label: "region_no",
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
                fKTable: {
                    SPN: "region",
                    PN: "region_no",
                },
            },
            region_no_d_name:{
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
            region_no_f_name:{
                fieldType: "input",
                type: "text",
                label: "foreign_name",
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
            
},
        pks: ["country_no"],
        tapTools: [], // to be deleted and view the others
        tools: null,
        mode: "start",
        // we handle prevMode in list show only ....
        prevMode: null,
        recordIndex: null,
        lastIndex: null,
        message: null,
        loading: false,
        listShow: false,
        mainFields: ["country_no", "country_d_name", "shortcut"],
        tapName: "country",
        deleteConfirm: false,
        searchFields: ['country_no'],
        ShortCutsList: false,
        urls: {
            add: "country",
            modify: "country",
            search: "country",
            pages: "country/pages",   
            page:  "country/page",
            lastPage: "country/lastPage",
            filter: "country/filteredPages",
            pageNo: "country/pageNo",
            delete: "country"
        },
        fks: ["region_no"],
        fkListShow: null,
        fkList: {
            region_no: {
                mainFields: ["region_no", "region_d_name", "shortcut"],
                urls: {
                    add: "region",
                    modify: "region",
                    search: "region",
                    pages: "region/pages",   
                    page:  "region/page",
                    lastPage: "region/lastPage",
                    filter: "region/filteredPages",
                    pageNo: "region/pageNo",
                    delete: "region"
                }
            },
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
    closeFkList = () => handleCloseFkList(this)
    recordClick = (record, i) => handleRecordClick(this, record, i)
    recordFkClick = (record, i) => {
        const fillFields = [
            {
                recordName: "region_d_name",
                stateName:  "region_no_d_name"
            },
            {
                recordName: "region_f_name",
                stateName:  "region_no_f_name"
            }
        ]
        handleRecordFkClick(this, record, i, fillFields)
    }
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


export default connect(mapStateToProps, mapDispatchToProps)(Country);


