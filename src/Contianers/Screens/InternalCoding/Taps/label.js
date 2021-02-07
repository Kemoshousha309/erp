import React, { Component } from 'react';
import Boilerplate from '../../../../Components/Boilerplate/Boilerplate';
import Aux from '../../../../hoc/Aux';
import {closeRow, displayPattren, fillRow, openFields, validityCheck, decideLanguageName, resetValidation, t} from "../../../../utilities"
import Modal from "../../../../Components/UI/Modal/Modal"
import DisplayTable from "../../../../Components/DisplayTable/DisplayTable"
import Spinner from "../../../../Components/UI/Spinner/Spinner";
import axios from "../../../../axios";
import {connect} from "react-redux";
import { timers } from 'jquery';


class Label extends Component {
    state={
        fields:{
            label_code:{
                inputType: "input",
                label: "label_code",
                placeholder: "label_code",
                config: {
                    id: "label_code",
                    type:"text"
                },
                validationRules: {
                    requiered: true,
                    length: 30
                },
                valid: false,
                touched: false,
                readOnly: true,
                value: "",
                button: "async"
            },
            label_desc:{
                inputType: "input",
                label: "label_desc",
                placeholder: "label_desc",
                config: {
                    id: "label_desc",
                    type:"text"
                },
                validationRules: {
                    requiered: true,
                    length: 200
                },
                valid: false,
                touched: false,
                readOnly: true,
                value: ""
            },
            lang_no:{
                inputType: "input",
                label: "lang_no",
                placeholder: "lang_no",
                config: {
                    id: "lang_no",
                    type:"number"
                },
                validationRules: {
                    requiered: true
                },
                valid: false,
                touched: false,
                readOnly: true,
                value: "",
                button: "loading"
            },
            lang_no_name:{
                inputType: "input",
                label: "name",
                placeholder: "name",
                config: {
                    id: "lang_no_name",
                    type:"text"
                },
                validationRules: {
                    requiered: true
                },
                valid: true,
                touched: false,
                readOnly: true,                
                value: ""
            }
        },
        tools:[
            {name:"display", state: true},
            {name:"search", state: true},
            {name:"add", state: true},
            {name:"update", state: false},
            {name:"nextLeft", state: false},
            {name:"nextRight", state: false},
            {name:"forwardLeft", state: false},
            {name:"forwardRight", state: false},
            {name: "save", state: false}
        ],
        modalShow: false,
        labelContent: null,
        languages:{
            languages: null,
            show: false,
            tableType: "language"
        },
        tapType: "label",
        popUpDisplayLoading: false,
        error: null,
        displayedIndex: null,
        auditTable: null,
        addMode: false,
        updateMode: false,
        displayMode: false,
        statusBar: {
            show: false,
            message: null
        },
        saveValidation: false,
        saveAbility: false
    }
    componentDidUpdate(){
        console.log("Label Updated")
    }
    display = () => {
        this.setState({popUpDisplayLoading: true, modalShow: true})
        axios.get(this.state.tapType)
        .then(res => {
            this.setState({popUpDisplayLoading: false, labelContent: res.data})
        })
        .catch(err => {
            // handle error
            this.setState({popUpDisplayLoading: false, error: err.message})
            console.log(err)
        })
    }
    activeMovesHandler = (tools) =>{
        const toolsStae = [...tools];
        for(let i in toolsStae){
            if(toolsStae[i].name === "nextLeft" || toolsStae[i].name === "nextRight" || 
            toolsStae[i].name === "forwardLeft" || toolsStae[i].name === "forwardRight" 
            || toolsStae[i].name === "update" ){
                toolsStae[i].state = true
            }
        }
        return toolsStae
    }
    displayLabelRow = (ele) =>  {
        const labelContent = [...this.state.labelContent];
        let updatedFields = fillRow(this.state.fields, ele);
            updatedFields = openFields(updatedFields, false)
        const index = labelContent.findIndex(e => e.label_code === ele.label_code) 
        const updatedTools = this.activeMovesHandler(this.state.tools);
        updatedFields = resetValidation(this.state.fields);
        this.setState({
            ields: updatedFields,
             displayedIndex: index, 
             auditTable: ele, 
             tools: updatedTools, 
             displayMode: true,

            })
    }
    displayLangRow = (ele) => {
        const fieldsClone = {...this.state.fields};
        fieldsClone.lang_no.value = ele.lang_no;
        fieldsClone.lang_no_name.value = decideLanguageName(this.state.languages.languages, ele.lang_no);
        this.setState({fields: fieldsClone})
    }
    displayRow = (event, ele, rowIdentifier) => {
        this.closeModalHandler()
        switch (rowIdentifier) {
            case "labelRow":
                this.displayLabelRow(ele)
                break;
            case "langRow": 
                this.displayLangRow(ele)
                break;
            default:
                break;
        }
    }
    update = () => {
        const currentUpdateMode = this.state.updateMode 
        let updatedFields = null;
        if(this.state.displayMode){
            if(currentUpdateMode){
                updatedFields = openFields(this.state.fields, false, "label_code");
            }else{
                updatedFields = openFields(this.state.fields, true, "label_code");
            }
        }  
        updatedFields.lang_no_name.readOnly = true;
        this.setState({fields: updatedFields, updateMode: !currentUpdateMode})
    }
    add = () => {
        //empty fields and write mode
        const currentAddMode = this.state.addMode
        let updatedFields = null
        if(!currentAddMode){
            updatedFields = fillRow(this.state.fields, "");
            updatedFields = openFields(this.state.fields, true)
            updatedFields.lang_no_name.readOnly = true;
        }else{
            updatedFields = closeRow(this.state.fields)
            updatedFields = resetValidation(this.state.fields)
            updatedFields["lang_no_name"].valid = false
        }
        this.setState({fields: updatedFields, addMode: !currentAddMode, displayMode: false, auditTable: null})
    }
    search = () => {
        console.log("search()")
    }
    nextLeft = () => {
        let index = this.state.displayedIndex - 1;
        if(this.state.displayedIndex === 0){
            index = 0
        }
        const updatedFields = fillRow(this.state.fields, this.state.labelContent[index]);
        this.setState({fields: updatedFields,displayedIndex: index})
    }
    nextRight = () => {
        let index = this.state.displayedIndex + 1;
        if(index >= this.state.labelContent.length){
            index = [...this.state.labelContent].length - 1
        }
        const updatedFields = fillRow(this.state.fields, this.state.labelContent[index]);
        this.setState({fields: updatedFields,displayedIndex: index})
    }
    forwardRight = () => {
        const index = [...this.state.labelContent].length - 1
        const updatedFields = fillRow(this.state.fields, this.state.labelContent[index]);
        this.setState({fields: updatedFields,displayedIndex: index})
    }
    forwardLeft = () => {
        const updatedFields = fillRow(this.state.fields, this.state.labelContent[0]);
        this.setState({fields: updatedFields,displayedIndex: 0})
    }
    save = () => {
        const fields = {...this.state.fields};
        for(let i in fields){
            console.log(fields[i].value)
        }

    }
    toolsclickedHandler = idintifier => {
        switch (idintifier) {
            case "display":
                this.display()
                break;
            case "search":
                this.search()
                break;
            case "update":
                this.update()
                break;
            case "add":
                this.add()
                break;
            case "nextLeft":
                this.nextLeft()
                break;
            case "nextRight":
                this.nextRight()
                break;
            case "forwardLeft":
                this.forwardLeft()
                break;
            case "forwardRight":
                this.forwardRight()
                break;
            case "save":
                this.save()
                break;
            default:
                return null
        }
    }
    closeModalHandler = () => {
        const languagesClone = {...this.state.languages}
        languagesClone.show = false
        this.setState({modalShow: false, languages: languagesClone})
    }
    inputChangeHandler = (event, identifier) =>{
        const fields = {...this.state.fields};
        fields[identifier].value = event.target.value;
        if(fields[identifier].config.id === "lang_no"){
            fields["lang_no_name"].value = decideLanguageName(this.state.languages.languages, event.target.value);
            if(decideLanguageName(this.state.languages.languages, event.target.value) === ""){
                fields["lang_no_name"].value = t("not_exist", this.props.lanTable, this.props.lanState, "language");
            }
        }
        fields[identifier].valid = validityCheck(event.target.value, fields[identifier].validationRules);
        fields[identifier].touched = true; 

        for(let i in fields){
            if(!(fields[i].value.toString() === "" ) ){
                console.log("adddo")
                fields[i].valid = validityCheck(event.target.value, fields[i].validationRules);
                fields[i].touched = true
            }
        }
        let saveValid = true;
        if(fields["lang_no"].valid === true){
            fields["lang_no_name"].valid = true
        }
        if(this.state.updateMode){
            fields["label_code"].valid = true;
        }
        for(let i in fields){
            console.log(i, fields[i].valid)
            saveValid = fields[i].valid && saveValid;
        }

        this.setState({fields: fields, saveValidation: saveValid})
    }

    refresh = () => {
        this.setState({statusBar: {show: true, message: null}});
        axios.get(this.state.tapType)
        .then(res => {
            this.setState({labelContent: res.data, statusBar: {show: true, message: "updated"}})
            setTimeout(() => {
                this.setState({statusBar: {show: false, message: null}});
            }, 5000)
        })
        .catch(err => {
            // handle error
            this.setState({ error: err.message, statusBar: {show: true, message: "Error, The content is not saved"}})
            console.log(err)
            setTimeout(() => {
                this.setState({statusBar: {show: false, message: null}});
            }, 5000)
        });
    }
    displayLangTable = () => {
        const languagesClone = {...this.state.languages};
        languagesClone.show = true;
       this.setState({languages: languagesClone});
       console.log(this.state.languages.languages)
    }

    iconClick = (event, identifier) => {
        switch (identifier) {
            case "label_code":
                this.refresh()
                break;
            case "lang_no":
                this.displayLangTable()
                break;    
            default:
                return null;
        }
    }
    componentDidMount () {
        axios.get("language")
        .then(res => {
            const fieldsClone = {...this.state.fields};
            fieldsClone.lang_no.button = "display"
            this.setState({languages: {languages: res.data}, fields: fieldsClone})
        })
        .catch(err => console.log(err))
    }
    closeLangPopperHandler = () => {
        const languagesClone = {...this.state.languages};
        const current = this.state.languages.show;
        languagesClone.show = !current;
        this.setState({languages: languagesClone});
    }
    static getDerivedStateFromProps(props, state){
        const toolsState = [...state. tools];
        let updateMode = state.updateMode;
        let addMode = state.addMode;
        if(!state.displayMode){
            for(let i in toolsState){
                if(toolsState[i].name === "nextLeft" || toolsState[i].name === "nextRight" || 
                toolsState[i].name === "forwardLeft" || toolsState[i].name === "forwardRight" 
                || toolsState[i].name === "update"){
                    toolsState[i].state = false
                }
            }
        }else{
            updateMode = false;
            addMode = false;
        }
        const modeAbility = state.updateMode || state.addMode;
        const validationAbility = state.saveValidation;
        console.log(validationAbility)
        let saveAbility = false;
        if(modeAbility && validationAbility){
            saveAbility = true
        }
        if(saveAbility){
            for(let i in toolsState){
                if(toolsState[i].name === "save"){
                    toolsState[i].state = true
                }
            }
        }else{
            for(let i in toolsState){
                if(toolsState[i].name === "save"){
                    toolsState[i].state = false
                }
            }
        }
        return{
            tools: toolsState,
            saveAbility: saveAbility
        }
    }
    render(){
        const tapContent = displayPattren(this.state.fields, this.inputChangeHandler, this.iconClick);
        return(
            <Aux> 
                <Modal show={this.state.languages.show} clicked={this.closeLangPopperHandler} > 
                <DisplayTable 
                   show={this.state.languages.show}
                   rowIdentifier='langRow'
                    closeModal={this.closeLangPopperHandler} 
                    content={this.state.languages.languages} 
                    tableType={this.state.languages.tableType}
                    rowClick={this.displayRow}
                     />
                </Modal>
                <Modal clicked={this.closeModalHandler} show={this.state.modalShow}>
                {
                    this.state.popUpDisplayLoading ? 
                    <Spinner /> : 
                    <DisplayTable 
                    search 
                    rowIdentifier='labelRow'
                    show={this.state.modalShow}
                    closeModal={this.closeModalHandler} 
                    content={this.state.labelContent} 
                    tableType={this.state.tapType}
                    error={this.state.error}
                    rowClick={this.displayRow}
                     />
                }
            </Modal>
            <Boilerplate 
            statusBar={this.state.statusBar}
            tools={this.state.tools}
            toolsClicked={this.toolsclickedHandler}
            auditTable={this.state.auditTable}
            dropDown={this.props.dropDown}>
                {tapContent}
            </Boilerplate>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        lanState: state.lang.lan,
        lanTable: state.lang.langTables
    }
}


export default connect(mapStateToProps, null)(Label);