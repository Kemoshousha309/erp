import { Component} from 'react';
import {connect} from "react-redux";
import { toolSelectHandler } from '../../../../utilities/tools';
import {handleDelete, handleDeleteConfirmation} from "../../../../utilities/tap/delete"
import {handleSearch} from "../../../../utilities/tap/search"
import {handleSave} from "../../../../utilities/tap/save"
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
    fkRecordClickHandler
} from "../../../../utilities/tap/handlers"
import { displayContent } from '../../../../utilities/tap/displayContent';
import { langChangeActivity } from '../../../../store/actions/lang';
import { autoDisplay, changePropName } from '../../../../utilities/tap/inputsHandlers';



class City extends Component{
    state = {
        fields: {
            city_no:{
                fieldType: "input",
                type: "number",
                label: "city_no",
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
                autoIncrement: "city/nextPK"
            },
            city_d_name :{
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
            city_f_name:{
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
            province_no:{
                fieldType: "input",
                type: "number",
                label: "province_no",
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
                    SPN: "province",
                    PN: "province_no",
                },
                fillFields: [

                    {
                        recordName: "province_no",   
                        stateName:  "province_no"
                    },
                    {
                        recordName: "province_d_name",
                        stateName:  "province_no_d_name"
                    },
                    {
                        recordName: "province_f_name",
                        stateName:  "province_no_f_name"
                    },
                    {
                        recordName: "country_no",   
                        stateName:  "country_no"
                    },
                    {
                        recordName: "country_no_d_name",
                        stateName:  "country_no_d_name"
                    },
                    {
                        recordName: "country_no_f_name",
                        stateName:  "country_no_f_name"
                    },
                    {
                        recordName: "region_no",   
                        stateName:  "region_no"
                    },
                    {
                        recordName: "region_no_d_name",
                        stateName:  "region_no_d_name"
                    },
                    {
                        recordName: "region_no_f_name",
                        stateName:  "region_no_f_name"
                    },
                    
                ]
            },
            province_no_name :{
                fieldType: "input",
                label: "name",
                readOnly: true,
                value: ""
            },

            country_no:{
                fieldType: "input",
                label: "country_no",
                readOnly: true,
                value: ""
            },
            country_no_name:{
                fieldType: "input",
                label: "name",
                readOnly: true,
                value: ""
            },
            region_no:{
                fieldType: "input",
                label: "region_no",
                readOnly: true,
                value: ""
            },
            region_no_name:{
                fieldType: "input",
                label: "name",
                readOnly: true,
                value: ""
            },
           
},
        pks: ["city_no"],
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
        tapName: "city",
        deleteConfirm: false,
        searchFields: ['city_no'],
        ShortCutsList: false,
        mainFields: ["city_no", "city_d_name", "shortcut"],
        urls: {
            add: "city",
            modify: "city",
            search: "city",
            pages: "city/pages",   
            page:  "city/page",
            lastPage: "city/lastPage",
            filter: "city/filteredPages",
            pageNo: "city/pageNo",
            delete: "city"
        },
        fks: ["region_no", "country_no", "province_no"],
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
            country_no: {
                mainFields: ["country_no", "country_d_name", "shortcut"],
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
            },
            province_no: {
                mainFields: ["province_no", "province_d_name", "shortcut"],
                urls: {
                    add: "province",
                    modify: "province",
                    search: "province",
                    pages: "province/pages",   
                    page:  "province/page",
                    lastPage: "province/lastPage",
                    filter: "province/filteredPages",
                    pageNo: "province/pageNo",
                    delete: "province"
                },
            }
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
    recordFkClick = (record, i) => fkRecordClickHandler(this, record)
    inputChange = (state, identifier) => handleInputChange(this, state, identifier)
    deleteConfirmation = (res) => handleDeleteConfirmation(this, res)
    ShortCutsListCloseHandler = () => handleCloseShortCuts(this)

    // LifeCycle methods *******************************************
    componentDidMount () {
        setlastIndex(this)
        functionsListenrs(this, true)

        autoDisplay(this, "province_no", "province", {
            main: {
                d: { recordProp: "province_d_name", stateProp: "province_no_d_name" },
                f: { recordProp: "province_f_name", stateProp: "province_no_f_name" },
            },
            others: [
               
                {
                    d: { recordProp: "country_no_d_name", stateProp: "country_no_d_name" },
                    f: { recordProp: "country_no_f_name", stateProp: "country_no_f_name" },
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
            ]
        })

    }
    componentWillUnmount () {
        functionsListenrs(this, false)
        this.props.changeLangSelectAcivity(true)
    }
    static getDerivedStateFromProps(props, state){
        let fieldsUpdate = changePropName(props, state.fields, "region_no_name", "region_no")
        fieldsUpdate = changePropName(props, fieldsUpdate, "country_no_name", "country_no")
        fieldsUpdate = changePropName(props, fieldsUpdate, "province_no_name", "province_no")
        const {tools} =  handleDrivedState (props, state)
        return {
            tools: tools,
            fields: fieldsUpdate
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


export default connect(mapStateToProps, mapDispatchToProps)(City);


