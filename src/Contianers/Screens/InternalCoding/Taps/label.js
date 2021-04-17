import React, { Component} from 'react';
import Boilerplate from '../../../../Components/Boilerplate/Boilerplate';
import { displayPattren } from "../../../../utilities/display";
import {connect} from "react-redux";
import { label } from '../../../../utilities/fields';
import { toolSelectHandler } from '../../../../utilities/tools';
import { handleMode, fields, fillRecord, handleSaveRequest, handleDelete, handleSearch, checkValidity, addFunctionsListenrs} from "../../../../utilities/processes";
import Modal from '../../../../Components/UI/Modal/Modal';
import Aux from '../../../../hoc/Aux';
import RecordDisply from '../../../../Components/RecordDisplay/RecordDisplay';
import {handleMove, setlastIndex} from "../../../../utilities/tap/moves"
import AlertDialog from '../../../../Components/AlertDialog/AlertDialog';


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
        searchFields: ["label_code", 'lang_no'],
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
        addFunctionsListenrs(this)
    }

    static getDerivedStateFromProps(props, state){
        const toolsMode = handleMode(state.mode, props.lanState, props.languages)
        return {
            tools: toolsMode,
        }
    }
    render (){
        // console.log("[label] render")
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
                loading={this.state.loading}
                message={this.state.message}
                >
                    {content}
                </Boilerplate>
                <AlertDialog open={this.state.alertOpen} handleClose={this.handleClose} >
                    You are going to delete a record. Are you sure?
                </AlertDialog>
            </Aux>
        )
    }
} 


const add_lan_no_options = (thisk) =>{
    const options = []
    thisk.props.languages.forEach(i => {
        const itemTemp = `${i.lang_no} (${i.lang_name})`
        options.push({value: i.lang_no, template: itemTemp})
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


