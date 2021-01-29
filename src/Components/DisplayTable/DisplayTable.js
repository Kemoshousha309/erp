import React, { Component } from "react";
import { connect } from "react-redux"
import { t } from "../../utilities";
import style from "./DisplayTable.module.scss"
class DisplayTable extends Component{
    state={
        table: null,
        codeSearchValue: "",
        descSearchValue: "",
        langSearchValue: ""
    }

    componentDidUpdate(){
        console.log("Navigation displayed tabel")
    }
    searchHandler = (event, identifier) => {
        let value = null;
        switch (identifier) {
            case "label_code":
                this.setState({codeSearchValue: event.target.value.toLowerCase()})
                value = {type: "label_code", value: event.target.value.toLowerCase()}
                break;
            case "label_desc":
                this.setState({descSearchValue: event.target.value.toLowerCase()})
                value = {type: "label_desc", value: event.target.value.toLowerCase()}
                break;
            case "lang_no":
                this.setState({langSearchValue: event.target.value})
                value = {type: "lang_no", value: event.target.value}
                break;
            default:
                break;
        }
        const result = this.state.completeTable.filter(ele => {
            switch (value.type) {
                case "label_code":
                    return(
                        ele.label_code.toLowerCase().includes(value.value) &&
                        ele.label_desc.toLowerCase().includes(this.state.descSearchValue) &&
                        ele.lang_no.toString().includes(this.state.langSearchValue)
                    )
                case "label_desc":
                    return(
                        ele.label_code.toLowerCase().includes(this.state.codeSearchValue) &&
                        ele.label_desc.toLowerCase().includes(value.value) &&
                        ele.lang_no.toString().includes(this.state.langSearchValue)
                    )
                case "lang_no":
                    return(
                        ele.label_code.toLowerCase().includes(this.state.codeSearchValue) &&
                        ele.label_desc.toLowerCase().includes(this.state.descSearchValue) &&
                        ele.lang_no.toString().includes(value.value)
                    )
                default:
                    break;
            }
        })
        this.setState({table: result})
    }
    static getDerivedStateFromProps(props, state){
        if(state.table){
            return null
        }else{
            return{
                table: props.content,
                completeTable: props.content
            }
        }   
    }
    render(){
        let headerLabels = null;
        switch (this.props.tableType) {
            case "label":
                headerLabels = [
                    t("label_code", this.props.lanTable, this.props.lanState),
                    t("label_desc", this.props.lanTable, this.props.lanState),
                    t("lang_no", this.props.lanTable, this.props.lanState)
                ]
                break;
        
            default:
                headerLabels = null;
                break;
        }

        const headers = headerLabels.map(head =>{
                return (
                    <th key={head}>{head}</th>
                )
            })

        let tableContent = null
        if(this.props.content){
            tableContent = this.state.table.map((ele, index) => {
                return(
                    <tr onClick={(event) => this.props.rowClick(event, index)} key={ele.label_code + ele.lang_no}>
                        <td>{ele.label_code}</td>
                        <td>{ele.label_desc}</td>
                        <td>{ele.lang_no}</td>
                    </tr>
                )
            })
        }
        const content = (
            <div className={style.tableContainer}>
                <div className="text-end">
                    <span onClick={this.props.closeModal}>&times;</span> 
                </div>                
                    <table  className="table table-dark head">
                        <thead>
                                <tr>
                                    {headers}
                                </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <input onChange={(event) => this.searchHandler(event, "label_code")} className="form-control"></input>
                                </td>
                                <td>
                                    <input onChange={(event) => this.searchHandler(event, "label_desc")} className="form-control"></input>
                                </td>
                                <td>
                                    <input onChange={(event) => this.searchHandler(event, "lang_no")}  className="form-control"></input>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                <div className={style.body}>
                    <table className="table table-hover table-dark table-bordered">
                        <tbody >
                            {tableContent}
                        </tbody>
                    </table>
                </div>
            </div>
        )
        return this.props.error ? this.props.error : content;
        }
}


const mapStateToProps = state => {
    return {
        lanState: state.lang.lan,
        lanTable: state.lang.langTables
    }
}

const mapDispatchToProps = dispatch => {
    return {
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DisplayTable);