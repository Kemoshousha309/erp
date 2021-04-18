import React, { Component} from 'react';
import Boilerplate from '../../../../Components/Boilerplate/Boilerplate';
import { displayPattren } from "../../../../utilities/display";
import {connect} from "react-redux";
import { toolSelectHandler } from '../../../../utilities/tools';
import {handleDelete, handleDeleteConfirmation} from "../../../../utilities/tap/delete"
import {handleSearch} from "../../../../utilities/tap/search"
import {handleSave} from "../../../../utilities/tap/save"
import {add_lan_no_options} from '../../../../utilities/tap/utilities'
import RecordDisply from '../../../../Components/RecordDisplay/RecordDisplay';
import {handleMove, setlastIndex} from "../../../../utilities/tap/moves"
import AlertDialog from '../../../../Components/AlertDialog/AlertDialog';
import {handleMode} from "../../../../utilities/tap/mode"
import {functionsListenrs} from "../../../../utilities/tap/listeners"
import 
{handleAdd, handleModify, handleList, handleCopy, handleUndo, handleCloseList, handleRecordClick, handleInputChange, handleCloseShortCuts} 
from "../../../../utilities/tap/handlers"
import { t } from '../../../../utilities/lang';
import ShortCutsList from '../../../../Components/ShortCutsList/ShortCutsList';

class Label extends Component{
    state = {
        fields: {
            label_code:{
                fieldType: "input",
                type: "text",
                label: "label_code",
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
                pk: true
            },
            label_desc:{
                fieldType: "input",
                type: "text",
                label: "label_desc",
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
                fieldType: "select",
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
                writability: false,
                value: "",
            },
            lang_no_name:{
                fieldType: "input",
                type: "text",
                label: "name",
                validation: {
                    requiered: false
                },
                writability: false,     
                readOnly: true,           
                value: ""
            }
},
        tools: null,
        mode: "start",
        // we handle prevMode in list show only ....
        prevMode: null,
        recordIndex: null,
        lastIndex: null,
        message: null,
        loading: false,
        listShow: false,
        mainFields: ["label_code", "label_desc", "lang_no"],
        tapName: "labels",
        deleteConfirm: false,
        searchFields: ["label_code", 'lang_no'],
        ShortCutsList: false
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

    // LifeCycle methods *******************************************
    componentDidMount () {
        add_lan_no_options(this)
        setlastIndex(this)
        functionsListenrs(this, true)
    }
    componentWillUnmount () {
        functionsListenrs(this, false)
    }
    static getDerivedStateFromProps(props, state){
        return { tools: handleMode(state.mode, props.lanState, props.languages) }
    }

    render (){
        // console.log("[label] render")
        const content = displayPattren(this.state.fields, this.inputChange)
        return  (
            <div id="tap">
                {this.state.listShow ?
                <RecordDisply 
                    modalClose={this.closeList} 
                    tapRequest="labels"
                    recordClick={this.recordClick} 
                    TapFields={this.state.fields}
                    mainFields={this.state.mainFields} /> : null}
                <Boilerplate
                dropDown={this.props.dropDown}
                toolsClicked={this.toolsClickedHandler}
                tools={this.state.tools}
                loading={this.state.loading}
                message={this.state.message}>
                    {content}
                </Boilerplate>
                <AlertDialog open={this.state.deleteConfirm} handleClose={this.deleteConfirmation} >
                    {t("delete_confirm", this.props.lanTable, this.props.lanState)}
                </AlertDialog>
                {this.state.ShortCutsList ? <ShortCutsList close={this.ShortCutsListCloseHandler} /> : null}
            </div>
        )
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

export default connect(mapStateToProps, null)(Label);


