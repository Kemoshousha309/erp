import React, { Component} from 'react';
import Boilerplate from '../../../../Components/Boilerplate/Boilerplate';
import { displayPattren } from "../../../../utilities/display";
import {connect} from "react-redux";
import { toolSelectHandler } from '../../../../utilities/tools';
import {handleDelete, handleDeleteConfirmation} from "../../../../utilities/tap/delete"
import {handleSearch} from "../../../../utilities/tap/search"
import {handleSave} from "../../../../utilities/tap/save"
import {add_lan_dir_options} from '../../../../utilities/tap/utilities'
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

class Language extends Component{
    state = {
        fields: {
            lang_no:{
                fieldType: "input",
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
            lang_name:{
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
            lang_dir:{
                fieldType: "select",
                type: "number",
                label: "lang_dir",
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
            report_ext:{
                fieldType: "input",
                type: "text",
                label: "report_ext",
                validation: {
                    requiered: true,
                    length: 10
                },
                validity: {
                    valid: true,
                    touched: false,
                    message: null
                },
                writability: false,
                value: ""
            },
            lang_ext:{
                fieldType: "input",
                type: "text",
                label: "lang_ext",
                validation: {
                    requiered: true,
                    length: 10
                },
                validity: {
                    valid: true,
                    touched: false,
                    message: null
                },
                writability: false,
                value: ""
            },
            lang_dfl:{
                fieldType: "checkbox",
                type: "checkbox",
                label: "lang_dfl",
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
        pks: ["lang_no"],
        tapTools: ["delete"], // to be deleted and view the others
        tools: null,
        mode: "start",
        // we handle prevMode in list show only ....
        prevMode: null,
        recordIndex: null,
        lastIndex: null,
        message: null,
        loading: false,
        listShow: false,
        mainFields: ["lang_no", "lang_name", "lang_dir"],
        tapName: "language",
        deleteConfirm: false,
        searchFields: ['lang_no'],
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
        // add_lan_no_options(this)
        add_lan_dir_options(this)
        setlastIndex(this)
        functionsListenrs(this, true)
    }
    componentWillUnmount () {
        functionsListenrs(this, false)
    }
    static getDerivedStateFromProps(props, state){
        return { tools: handleMode(state.mode, props.lanState, props.languages, state.tapTools) }
    }

    render (){
        // console.log("[label] render")
        const content = displayPattren(this.state.fields, this.inputChange)
        return  (
            <div id="tap">
                {this.state.listShow ?
                <RecordDisply 
                    modalClose={this.closeList} 
                    tapRequest={this.state.tapName}
                    recordClick={this.recordClick} 
                    pks={this.state.pks}
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

export default connect(mapStateToProps, null)(Language);


