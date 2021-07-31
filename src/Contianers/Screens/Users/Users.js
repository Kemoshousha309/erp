import { Component} from 'react';
import {connect} from "react-redux";
import { toolSelectHandler } from '../../../utilities/tools';
import {handleDelete, handleDeleteConfirmation} from "../../../utilities/tap/delete"
import {handleSearch} from "../../../utilities/tap/search"
import {handleMove, setlastIndex} from "../../../utilities/tap/moves"
import {functionsListenrs} from "../../../utilities/tap/listeners"
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
} from "../../../utilities/tap/handlers"
import { displayContent } from '../../../utilities/tap/displayContent';
import { autoNameDisplay, changePropName, checkPassConfirm, onlyActiveField } from '../../../utilities/tap/inputsHandlers';
import { langChangeActivity } from '../../../store/actions/lang';
import { handleSave } from '../../../utilities/tap/save';
import { formatDate } from '../../../utilities/date';



class Users extends Component{
    state = {
        fields: {
            user_id:{
                fieldType: "input",
                type: "number",
                label: "user_no",
                validation: {
                    requiered: true,
                    size: 2147483647
                },
                validity: {
                    valid: true,
                    touched: false,
                    message: null
                },
                writability: false,
                value: "",
            },
            user_d_name:{
                fieldType: "input",
                type: "text",
                label: "name",
                validation: {
                    requiered: true,
                    length: 100
                },
                validity: {
                    valid: true,
                    touched: false,
                    message: null
                },
                writability: false,
                value: "",
            },
            user_f_name:{
                fieldType: "input",
                type: "text",
                label: "foreign_name",
                validation: {
                    length: 100
                },
                validity: {
                    valid: true,
                    touched: false,
                    message: null
                },
                writability: false,
                value: "",
            },
            placeholder:{fieldType: "",},
            direct_mang:{
                fieldType: "input",
                type: "number",
                label: "direct_manager",
                validation: {
                    requiered: true,
                    size: 2147483647
                },
                validity: {
                    valid: true,
                    touched: false,
                    message: null
                },
                writability: false,
                value: "",
                fKTable: {
                    SPN: "user",
                    PN: "user_id"
                }
            },
            direct_mang_name:{
                fieldType: "input",
                label: "name",
                readOnly: true,
                value: ""
            },
            group_no:{
                fieldType: "input",
                type: "number",
                label: "group_no",
                validation: {
                    size: 2147483647
                },
                validity: {
                    valid: true,
                    touched: false,
                    message: null
                },
                writability: false,
                value: "",
                fKTable: {
                    SPN: "group",
                    PN: "group_no"
                }
            },
            group_no_name:{
                fieldType: "input",
                label: "name",
                readOnly: true,
                value: ""
            },
            password:{
                fieldType: "input",
                type: "password",
                label: "password",
                validation: {
                    requiered: true,
                    length: 100
                },
                validity: {
                    valid: true,
                    touched: false,
                    message: null
                },
                writability: false,
                value: "",
            },
            confirm_password:{
                fieldType: "input",
                type: "password",
                label: "confirm_pass",
                validation: {
                    requiered: true,
                    length: 100
                },
                validity: {
                    valid: true,
                    touched: false,
                    message: null
                },
                writability: false,
                value: "",
            },
            copy_priv_from:{
                fieldType: "input",
                type: "number",
                label: "copy_privileges_from_user",
                validation: {
                    size: 2147483647
                },
                validity: {
                    valid: true,
                    touched: false,
                    message: null
                },
                writability: false,
                value: "",
                fKTable: {
                    SPN: "user",
                    PN: "user_id"
                },
                readOnlyField: 'copy_priv_from_name' 
            },
            copy_priv_from_name:{
                fieldType: "input",
                label: "name",
                readOnly: true,
                value: ""
            },
            copy_priv_to:{
                fieldType: "input",
                type: "number",
                label: "copy_privileges_to_group",
                validation: {
                    size: 2147483647
                },
                validity: {
                    valid: true,
                    touched: false,
                    message: null
                },
                writability: false,
                value: "",
                fKTable: {
                    SPN: "group",
                    PN: "group_no"
                },
                readOnlyField: 'copy_priv_to_name'
            },
            copy_priv_to_name:{
                fieldType: "input",
                label: "name",
                readOnly: true,
                value: ""
            },
            inactive:{
                fieldType: "checkbox",
                type: "checkbox",
                label: "inactive",
                writability: false,
                value: false
            },
            placeholder2:{fieldType: "",},
            inactive_user:{
                fieldType: "input",
                type: "number",
                label: "inactive_user",
                validation: {
                    size: 2147483647
                },
                validity: {
                    valid: true,
                    touched: false,
                    message: null
                },
                writability: false,
                value: "",
                readOnly: true
            },
            inactive_date:{
                fieldType: "input",
                type: "dateFormat",
                label: "inactive_date",
                validity: {
                    valid: true,
                    touched: false,
                    message: null
                },
                writability: false,
                readOnly: true,
                value: "", // should be at this form 2111-04-09
            },
            inactive_reason:{
                fieldType: "textarea",
                type: "textarea",
                label: "inactive_reason",
                validity: {
                    valid: true,
                    touched: false,
                    message: null
                },
                writability: false,
                value: "",
            },  

        },
        pks: ["user_id"],
        listShow: false,
        tapName: "users",
        mainFields: [
            {label: "user_no", propName: "user_id"}, 
            {propName: "direct_mang", label: "direct_manager"},
            "group_no",
            {label: "name", propName: "user_d_name"}
        ],
        searchFields: ["user_id"],
        urls: {
            add: "users",
            modify: "users",
            search: "users",
            pages: "users/pages",   
            page:  "users/page",
            lastPage: "users/lastPage",
            filter: "users/filteredPages",
            pageNo: "users/pageNo",
            delete: "users"
        },
        fks: ["direct_mang", "group_no", "copy_priv_from", "copy_priv_to"],
        fkListShow: null,
        fkList: {
            direct_mang: {
                mainFields:  [
                    {label: "user_no", propName: "user_id"}, 
                    {propName: "direct_mang", label: "direct_manager"},
                    "group_no",
                    {label: "name", propName: "user_d_name"}
                ],
                urls: {
            modify: "users",
            search: "users",
            pages: "users/pages",   
            page:  "users/page",
            lastPage: "users/lastPage",
            filter: "users/filteredPages",
            pageNo: "users/pageNo",
            delete: "users"
        },
            },
            copy_priv_from: {
                mainFields:  [
                    {label: "user_no", propName: "user_id"}, 
                    {propName: "direct_mang", label: "direct_manager"},
                    "group_no",
                    {label: "name", propName: "user_d_name"}
                ],
                urls: {
            modify: "users",
            search: "users",
            pages: "users/pages",   
            page:  "users/page",
            lastPage: "users/lastPage",
            filter: "users/filteredPages",
            pageNo: "users/pageNo",
            delete: "users"
        },
            },
            group_no: {
                mainFields:  [
                    "group_no",
                    {label: "name", propName: "group_d_name"}
                ],
                urls: {
            modify: "usersgroups",
            search: "usersgroups",
            pages: "usersgroups/pages",   
            page:  "usersgroups/page",
            lastPage: "usersgroups/lastPage",
            filter: "usersgroups/filteredPages",
            pageNo: "usersgroups/pageNo",
            delete: "usersgroups"
        },
            },
            copy_priv_to: {
                mainFields:  [
                    "group_no",
                    {label: "name", propName: "group_d_name"}
                ],
                urls: {
            modify: "usersgroups",
            search: "usersgroups",
            pages: "usersgroups/pages",   
            page:  "usersgroups/page",
            lastPage: "usersgroups/lastPage",
            filter: "usersgroups/filteredPages",
            pageNo: "usersgroups/pageNo",
            delete: "usersgroups"
        },
            }

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
        deleteConfirm: false,
        ShortCutsList: false,
        specialFields: [
            {
                key: "copy_priv_to",
                add: "close",
                header: true,
                headerName: "COPY-PRIVILEGES-TO-GROUP"
            },
            {
                key: "copy_priv_from",
                header: true,
                headerName: "COPY-FROM-USER-PRIVILEGES"
            },
            {
                key: "inactive_reason",
                add: "close",
            },
            {
                key: "inactive_user",
                add: "close",
            },
            {
                key: "inactive_date",
                add: "close",
            }
        ],
        langNo: null
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

    
    // LifeCycle methods *******************************************
    componentDidMount () {
        // getTree(this)
        setlastIndex(this)
        functionsListenrs(this, true)

        // // inputs handlers on Auto display
        autoNameDisplay(this, 'direct_mang', "users")
        autoNameDisplay(this, 'group_no', "usersgroups")
        autoNameDisplay(this, 'copy_priv_from', "users", "copy_priv_from_name")
        autoNameDisplay(this, 'copy_priv_to', "usersgroups", "copy_priv_to_name")
        checkPassConfirm(this)

        // special fields hanlde
        hanldeInactiveFields(this)

    }
    
    
    componentWillUnmount () {
        functionsListenrs(this, false)
        this.props.changeLangSelectAcivity(true)
    }
    
    static getDerivedStateFromProps(props, state){
        const fieldsClone = {...state.fields}
        let fieldsUpdate = fieldsClone
        let lang_no = state.langNo
        // this is the technique of active only one field without affect other things
        if(parseInt(props.lanState) !== parseInt(state.langNo)){
            lang_no = props.lanState
            fieldsUpdate = changePropName(props, fieldsClone, "group_no_name", "group_no", "group_no")
            fieldsUpdate =  changePropName(props, fieldsUpdate, 'direct_mang_name', "direct_mang", "direct_mang")
        }else{
            fieldsUpdate =  onlyActiveField(fieldsClone, "copy_priv_from", "copy_priv_to", state.mode)
        }
        let {tools} =  handleDrivedState (props, state)

        return {
            tools: tools,
            fields: fieldsUpdate,
            langNo: lang_no
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


export default connect(mapStateToProps, mapDispatchToProps)(Users);


const hanldeInactiveFields = (thisK) => {
    thisK.state.fields.inactive.changeHandler = (state) => {
        const fieldsClone = {...thisK.state.fields}
        const flag = !state.value
        if(flag){
            fieldsClone.inactive_reason.writability = true
            if(thisK.state.mode !== "add"){
                fieldsClone.inactive_reason.value = thisK.state.record["inactive_reason"]
                fieldsClone.inactive_user.value = thisK.state.record["inactive_user"]
                fieldsClone.inactive_date.value = formatDate( thisK.state.record["inactive_date"])
            }
        }else{
            fieldsClone.inactive_reason.writability = false
            if(thisK.state.mode !== "add"){
                fieldsClone.inactive_reason.value = ""
                fieldsClone.inactive_user.value = ""
                fieldsClone.inactive_date.value = ""
            }
        }
        thisK.setState({fields: fieldsClone})
    }
}
