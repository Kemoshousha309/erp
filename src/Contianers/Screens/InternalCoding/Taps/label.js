import React, { Component } from 'react';
import Boilerplate from '../../../../Components/Boilerplate/Boilerplate';
import Aux from '../../../../hoc/Aux';
import {displayPattren, fillRow} from "../../../../utilities"
import Modal from "../../../../Components/UI/Modal/Modal"
import DisplayTable from "../../../../Components/DisplayTable/DisplayTable"
import Spinner from "../../../../Components/UI/Spinner/Spinner";
import axios from "../../../../axios";

class Label extends Component {
    state={
        fields:{
            label_code:{
                inputType: "input",
                label: "label_code",
                placeholder: "label_code",
                config: {
                    id: "label_code",
                    type:"text",
                    readOnly: true
                },
                value: ""
            },
            label_desc:{
                inputType: "input",
                label: "label_desc",
                placeholder: "label_desc",
                config: {
                    id: "label_desc",
                    type:"text",
                    readOnly: true
                },
                value: ""
            },
            lang_no:{
                inputType: "input",
                label: "lang_no",
                placeholder: "lang_no",
                config: {
                    id: "lang_no",
                    type:"number",
                    readOnly: true
                },
                value: ""
            },
            lang_no_name:{
                inputType: "input",
                label: "lang_no_name",
                placeholder: "lang_no_name",
                config: {
                    id: "lang_no_name",
                    type:"text",
                    readOnly: true
                },
                value: ""
            }
        },
        tools:[
            {name:"display", state: true},
            {name:"search", state: true},
            {name:"add", state: true},
            {name:"update", state: true},
            {name:"nextLeft", state: false},
            {name:"nextRight", state: false},
            {name:"forwardLeft", state: false},
            {name:"forwardRight", state: false}
        ],
        modalShow: false,
        labelContent: null,
        tapType: "label",
        popUpDisplayLoading: false,
        error: null,
        displayedIndex: null,
        auditTable: null 
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
            toolsStae[i].name === "forwardLeft" || toolsStae[i].name === "forwardRight" ){
                toolsStae[i].state = true
            }
        }
        return toolsStae
    }
    displayRow = (event, index) => {
        this.closeModalHandler()
        const labelContent = [...this.state.labelContent];
        const element = labelContent.find((ele, i) => i === index);
        const updatedFields = fillRow(this.state.fields, element);
        const updatedTools = this.activeMovesHandler(this.state.tools)
        this.setState({fields: updatedFields, displayedIndex: index, auditTable: element, tools: updatedTools})
    }
    update = () => {
        console.log("update()")
    }
    add = () => {
        console.log("add()")
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
            default:
                return null
        }
    }
    closeModalHandler = () => {
        this.setState({modalShow: false})
    }
    inputChangeHandler = (event, identifier) =>{
        const fields = {...this.state.fields};
        fields[identifier].value = event.target.value
        this.setState({fields: fields})
    }
    render(){
        const tapContent = displayPattren(this.state.fields, this.inputChangeHandler);
        return(
            <Aux>
                <Modal clicked={this.closeModalHandler} show={this.state.modalShow}>
                {
                    this.state.popUpDisplayLoading ? 
                    <Spinner /> : 
                    <DisplayTable 
                    closeModal={this.closeModalHandler} 
                    content={this.state.labelContent} 
                    tableType={this.state.tapType}
                    error={this.state.error}
                    rowClick={this.displayRow}
                     />
                }
            </Modal>
            <Boilerplate 
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

export default Label;