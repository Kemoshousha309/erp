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
    handleInputChange,
    handleCloseShortCuts,
    handleDrivedState
} from "../../../utilities/tap/handlers"
import { displayContent } from '../../../utilities/tap/displayContent';
import { langChangeActivity } from '../../../store/actions/lang';
import axios from '../../../axios';
import PrivDisplay from './PrivDisplay';
import Hint from '../../../Components/UI/Hint/Hint';
import { selectMessage, t } from '../../../utilities/lang';
import { fields } from '../../../utilities/tap/fields';
import { timer } from '../../../utilities/tap/utilities';



class ScreenPrivs extends Component{
    state = {
        fields: {
            user_id:{
                fieldType: "input",
                type: "number",
                label: "user_no",
                validation: {
                    requiered: false,
                    length: 30
                },
                validity: {
                    valid: true,
                    touched: false,
                    message: null
                },
                writability: false,
                value: "",
            }
        },
        pks: ["user_id"],
        tapTools: ["delete", "add", "copy", "modify"],
        tools: null,
        mode: "start",
        // we handle prevMode in list show only ....
        prevMode: null,
        recordIndex: null,
        lastIndex: null,
        message: null,
        loading: false,
        listShow: false,
        mainFields: [
            {label: "user_no", propName: "user_id"}, 
            {propName: "direct_mang", label: "direct_manager"},
            "group_no",
            {label: "name", propName: "user_d_name"}
        ],
        tapName: "screenPriv", 
        deleteConfirm: false,
        searchFields: ["user_id"],
        ShortCutsList: false,
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
        record: null,
        treeLoading: "wait",
        user_formPrivs: null,
        currentForm: null,
        formPriv: null
    }

    // Tools Handle *********************************************
    toolsClickedHandler = identifier => toolSelectHandler(identifier, this)
    modify = () => handleModify(this)
    add = () => handleAdd(this)
    undo = () => handleUndo(this)
    save = () => {
        // handle the priv save here (special)
        this.setState({loading: true})
        console.log(this.state.formPriv)
        axios({
            method: "put",
            url: "formprivileges",
            data: this.state.formPriv,
            })  
            .then(res => {
                fields(this.state.fields, 'close', false)
                const message = {
                    content: selectMessage(res.data.message, this.props.lanState),
                    type: "success"
                }
                this.setState({
                    mode: "d_record",
                    loading: false, 
                    message: message,
                    recordIndex: null,
                })
                timer(this)
            })
            .catch(err => {
                fields(this.state.fields, 'open', false)
                const message = {
                    content: selectMessage(err.response.data.message, this.props.lanState),
                    type: "error"
                }
                if(err.response.data.error){
                    message.content = err.response.data.error
                }
                this.setState({
                    loading: false, 
                    message: message,
                    recordIndex: null,
                    
                })
                timer(this)
            }) 
    }
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
    recordClick = (record, i) =>  handleRecordClick(this, record, i)
    treeNodeClick = (record) => {

        let key = record.form_no;
        if(!record.form_no){
            // set the value of composite key
            key = record['flag_code'] + "_" + record["flag_value"]
        }
        this.setState({currentForm: key, formPriv: null, currentNode: record})
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
    static getDerivedStateFromProps(props, state){
        let {tools} =  handleDrivedState (props, state)
        const tools_clone = [...tools];
        if(state.formPriv){
            tools_clone.forEach(i => {
                if(i.name === "save"){
                    i.state = true
                }
            })
        }
        // get the state form the store when user is selected
        let tree = null
        let treeLoading = <Hint message={t("select_user", props.lanTable, props.lanState)}/>
        if(state.record && state.user_formPrivs){
            if(state.record.user_id !== props.logged_user_id){
                tree = props.tree_f
            }else{
                treeLoading = <Hint message={t("select_not_logged_user", props.lanTable, props.lanState)} />
                tools_clone.forEach(i => {
                    if(i.name === "save"){
                        i.state = false
                    }
                })
            }
        }

        return {
            tools: tools_clone,
            tree: tree,
            treeLoading: treeLoading
        }
    }

    // methods related to screen privs
    setFormPriv = (formPriv) => {
        if(!this.state.formPriv){
            this.setState({formPriv: formPriv})
        }else if(this.state.formPriv.form_no !== formPriv.form_no){
            this.setState({formPriv: formPriv})
        }
    }

    privChangeHandler = (e, i) => {
        const value = e.target.checked;
        const formPriv_clone = {...this.state.formPriv}
        formPriv_clone[i] = value
        this.setState({formPriv: formPriv_clone})
    }
    

    render (){
        // request privs
        if(this.state.record && !this.state.user_formPrivs){
            privRequest(this)   
        }else if (this.state.record && this.state.user_formPrivs){
            if(this.state.record.user_id !== this.state.user_formPrivs[0].user_id){
                this.setState({user_formPrivs: null, formPriv: null})
                privRequest(this)
            }
        }else if(!this.state.record && this.state.user_formPrivs){
            this.setState({user_formPrivs: null, currentForm : null, formPriv: null, currentNode: null})
        }
        
        return displayContent(this, this.props.location, PrivDisplay(this))
    }
}

const mapStateToProps = state => {
    return {
        lanState: state.lang.lan,
        lanTable: state.lang.langTables,
        token: state.auth.authData.token,
        languages: state.lang.langInfo,
        main_tree: state.auth.authData.main_tree,
        rawTree_hash: state.auth.authData.raw_tree_hash,
        forms_privs_hash: state.auth.authData.forms_privs_hash,
        logged_user_id: state.auth.authData.user_id,
        tree_f: state.auth.authData.tree_f
    }   
}   

const mapDispatchToProps = dispatch => {
    return {
        changeLangSelectAcivity: (mode) => dispatch(langChangeActivity(mode))
    }
}

const privRequest = thisK => {
    axios.get(`formprivileges/${thisK.state.record.user_id}`)
            .then(res => {
                if(thisK.state.user_formPrivs){
                    const privs_up = [...thisK.state.user_formPrivs, ...res.data]
                    thisK.setState({user_formPrivs: privs_up})
                }else {
                    thisK.setState({user_formPrivs: res.data})
                }
            }).catch(err => console.log(err))
            axios.get(`flagPriv/${thisK.state.record.user_id}`)
            .then(res => {
                if(thisK.state.user_formPrivs){
                    const privs_up = [...thisK.state.user_formPrivs, ...creat_unique_key(res.data, "flag_code", "flag_value", "form_no")]
                    thisK.setState({user_formPrivs: privs_up})
                }else {
                    thisK.setState({user_formPrivs: creat_unique_key(res.data, "flag_code", "flag_value", "form_no")})
                }
            }).catch(err => console.log(err)) 
}

const creat_unique_key = (arr, key1, key2, propName) => {
    // this function take an array of objs and give every one a unique key
    arr.forEach(i => {
        const key = i[key1] + "_" +i[key2]
        i[propName] = key
    })
    return arr
}


export default connect(mapStateToProps, mapDispatchToProps)(ScreenPrivs);

