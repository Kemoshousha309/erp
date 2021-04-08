import React, { Component} from 'react';
import Boilerplate from '../../../../Components/Boilerplate/Boilerplate';
import { displayPattren } from "../../../../utilities/display";
import {connect} from "react-redux";
import { label } from '../../../../utilities/fields';
import { startMode, toolSelectHandler } from '../../../../utilities/tools';
import { handleMode, fields, fillRecord, setValidity, handleSaveRequest, handleDelete, handleSearch} from "../../../../utilities/processes";
import Modal from '../../../../Components/UI/Modal/Modal';
import Aux from '../../../../hoc/Aux';
import RecordDisply from '../../../../Components/RecordDisplay/RecordDisplay';
import axios from "../../../../axios"
import StatusBar from '../../../../Components/StatusBar/StatusBar';
import Spinner from '../../../../Components/UI/Spinner/Spinner';
import {handleMove, setlastIndex} from "../../../../utilities/tap/moves"
import AlertDialog from '../../../../Components/AlertDialog/AlertDialog';



class Label extends Component{
    state = {
        fields: label,
        tools: startMode,
        mode: "start",
        recordIndex: null,
        lastIndex: null,
        message: false,
        loading: false,
        list: {
            show: false
        },
        mainFields: ["label_code", "label_desc", "lang_no"],
        tapName: "labels",
        alertOpen: false
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
        this.setState({mode: "add"})
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
                this.setState({mode: "start"})
                break;
        }
        // if(this.state.mode === "modify" || this.state.mode === "copy"){
        //     // undo one step back
        //     fields(this.state.fields, "close", false)
        //     this.setState({mode: "d_record"})
        // }else{
        //     // undo to start mode
        //     fields(this.state.fields, "close")
        //     this.setState({mode: "start"})
        // }
    }
    save = () => {
        const [fieldsUpdate, valid] = setValidity(this.state.fields)
        if(valid){
            handleSaveRequest(this)            
        }else{
            this.setState({fields: fieldsUpdate})
        }
    }
    copy = () => {
        fields(this.state.fields, "open", false)
        this.setState({mode: "copy"})
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
    recordClick = (record, i) =>{
        fillRecord(this.state.fields, record)
        this.setState({list: {show: false}, mode: "d_record", recordIndex: i})
    }
    inputChangeHandler = (value, identifier) => {
        const fields = {...this.state.fields};
        fields[identifier].value = value;
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
        const toolsMode = handleMode(state.mode)
        return {
            tools: toolsMode
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
        {
            thisK.state.loading ?
            <StatusBar show><Spinner small color="3F51B5" /></StatusBar>: null 
        }
        {
            thisK.state.message ? 
            <StatusBar show>{thisK.state.message}</StatusBar>  : null
        }
       </Aux>
   )
}

const add_lan_no_options = (thisk) =>{
    axios.get("public/language")
    .then(res => {
        const options = []
        res.data.forEach(i => {
            options.push(i.lang_no)
        })
        const fieldsClone = {...thisk.state.fields}
        fieldsClone.lang_no.options = options
        thisk.setState({fields: fieldsClone})
    })
    .catch(err => console.log(err))
}
    


const mapStateToProps = state => {
    return {
        lanState: state.lang.lan,
        lanTable: state.lang.langTables,
        token: state.auth.authData.token
    }
}


export default connect(mapStateToProps, null)(Label);


