import React, { Component} from 'react';
import Boilerplate from '../../../../Components/Boilerplate/Boilerplate';
import { displayPattren } from "../../../../utilities/display";
import {connect} from "react-redux";
import { label } from '../../../../utilities/fields';
import { startMode, toolSelectHandler } from '../../../../utilities/tools';
import { handleMode, fields, fillRecord, setValidity, handleSaveRequest, handleDelete, handleSearch, checkValidity} from "../../../../utilities/processes";
import Modal from '../../../../Components/UI/Modal/Modal';
import Aux from '../../../../hoc/Aux';
import RecordDisply from '../../../../Components/RecordDisplay/RecordDisplay';
import axios from "../../../../axios"
import StatusBar from '../../../../Components/StatusBar/StatusBar';
import Spinner from '../../../../Components/UI/Spinner/Spinner';
import {handleMove, setlastIndex} from "../../../../utilities/tap/moves"
import AlertDialog from '../../../../Components/AlertDialog/AlertDialog';
import { decideLanguageName } from '../../../../utilities/lang';
import {t} from "../../../../utilities/lang"


class Label extends Component{
    state = {
        fields: label,
        tools: null,
        mode: "start",
        recordIndex: null,
        lastIndex: null,
        message: null,
        loading: false,
        list: {
            show: false
        },
        mainFields: ["label_code", "label_desc", "lang_no"],
        tapName: "labels",
        alertOpen: false,
        searchFields: ["label_code", 'lang_no']
    }

    // Tools Handle ****************************************************************
    toolsClickedHandler = identifier => {
        toolSelectHandler(identifier, this)
    }
    modify = () => {
        fields(this.state.fields, "open", false)
        this.setState({mode: "modify"})
    }
    add = () => {
        fields(this.state.fields, "open")
        this.setState({mode: "add", auditTable: null})
    }
    undo = () => {
        switch (this.state.mode) {
            case "modify":
                fields(this.state.fields, "close", false)
                this.setState({mode: "d_record"})
                break;
            case "copy":
                fields(this.state.fields, "close", false)
                this.setState({mode: "d_record"})
                break;
            default:
                 // undo to start mode
                fields(this.state.fields, "close")
                this.setState({mode: "start", auditTable: null})
                break;
        }
    }
    save = () => {
        const[valid, fieldsUpdate] = checkValidity(this) 
        if(valid){
            handleSaveRequest(this)            
        }else{
            this.setState({fields: fieldsUpdate})
        }
    }
    copy = () => {
        fields(this.state.fields, "open", false)
        this.setState({mode: "copy", auditTable: null})
    }
    list = () => {
        this.setState({list: {show: true}})
    }
    delete = () => {
        this.setState({alertOpen: true})
    }
    search = () => {
        handleSearch(this)
    }

    // Moves ************************************************************************
    previous = () => {
       handleMove("previous", this)
    }
    next = () => {
       handleMove("next", this)
    }
    first = () => {
        handleMove("first", this)
    }
    last = () => {
        handleMove("last", this)
    }


    // List & Record & values Handle ************************************************
    closeListHandler = () => {
        const currentState = this.state.list.show
        this.setState({list: {show: !currentState}})
    }
    recordClick = (record, i, targetRecord) =>{
        fillRecord(this.state.fields, record)
        this.setState({list: {show: false}, mode: "d_record", recordIndex: i, auditTable: targetRecord})
    }
    inputChangeHandler = (state, identifier) => {
        const fields = {...this.state.fields};
        if(!fields[identifier].readOnly){
            fields[identifier].value = state.value;
            fields[identifier].validity.touched = state.touched;
            fields[identifier].validity.valid = state.valid;
            fields[identifier].validity.message = state.invalidFeedBack;
        }
        this.setState({fields: fields})
    }
    handleClose = (res) => {
        if(res){
            handleDelete(this)
        }
        const currentState = this.state.alertOpen
        this.setState({alertOpen: !currentState})
    }
    // LifeCycle Hooks ***************************************************************
    componentDidMount () {
        add_lan_no_options(this)
        setlastIndex(this)
    }

    static getDerivedStateFromProps(props, state){
        const toolsMode = handleMode(state.mode, props.lanState)
        return {
            tools: toolsMode,
        }
    }
    render (){
        // console.log("[label] render")
        console.log(this.state.fields)
        const content = displayPattren(this.state.fields, this.inputChangeHandler)
        return  (
            <Aux>
                <Modal show={this.state.list.show} clicked={this.closeListHandler} > 
                {
                    this.state.list.show ? 
                    <RecordDisply 
                        modalClose={this.closeListHandler} 
                        tapRequest="labels"
                        recordClick={this.recordClick} 
                        TapFields={this.state.fields}
                        mainFields={this.state.mainFields} /> : null
                }
                </Modal>
                <Boilerplate
                dropDown={this.props.dropDown}
                toolsClicked={this.toolsClickedHandler}
                tools={this.state.tools}
                >
                    {content}
                </Boilerplate>
                {statusBar(this)}
                <AlertDialog open={this.state.alertOpen} handleClose={this.handleClose} >
                    You are going to delete a record. Are you sure?
                </AlertDialog>
            </Aux>
        )
    }
} 

const statusBar = thisK => {
   return (
       <Aux>
        { thisK.state.loading ? <Spinner position="statusPosition" small color="3F51B5" />: null }
        {
            thisK.state.message ? 
            <StatusBar show type={thisK.state.message.type} >{thisK.state.message.content}</StatusBar>  : null
        }
       </Aux>
   )
}

// const add_lan_no_options = (thisk) =>{
//     axios.get("public/language")
//     .then(res => {
//         const options = []
//         res.data.forEach(i => {
//             options.push(i.lang_no)
//         })
//         const fieldsClone = {...thisk.state.fields}
//         fieldsClone.lang_no.options = options
//         thisk.setState({fields: fieldsClone})
//     })
//     .catch(err => console.log(err))
// }
const add_lan_no_options = (thisk) =>{
    console.log(thisk.props.languages)
    const options = []
    thisk.props.languages.forEach(i => {
        options.push(i.lang_no)
    })
    const fieldsClone = {...thisk.state.fields}
    fieldsClone.lang_no.options = options
    thisk.setState({fields: fieldsClone})
}


const mapStateToProps = state => {
    return {
        lanState: state.lang.lan,
        lanTable: state.lang.langTables,
        token: state.auth.authData.token,
        languages: state.lang.langInfo
    }
}


export default connect(mapStateToProps, null)(Label);


