import React, { Component } from "react";
import { connect } from "react-redux"
import { t } from "../../utilities/lang";
import TableHead from "./TableHead*/TableHead";
import style from "./DisplayTable.module.scss"
class DisplayTable extends Component{
    state={
        table: null,
    }   

    componentDidUpdate(){
        // console.log("DisplayedTabel Updated")
    }
    shouldComponentUpdate(nextProps, nextState){ 
        if(this.state.identifiers){
            const [SV_arr, ident_arr] = this.setArrs();
            let valid = true;
            for(let i in ident_arr){
           valid = nextState[SV_arr[i]] !== this.state[SV_arr[i]] || valid
        }
            return (nextProps.show !== this.props.show || valid)
        }else{
            return (nextProps.show !== this.props.show)
        }
    }
    
    setArrs = () => {
        let SV_arr = []
        let ident_arr = []
            this.state.identifiers.forEach(ele => {
                const SV = `${ele.name}S_V`;
                const id = ele.name;
                SV_arr.push(SV)
                ident_arr.push(id)
            })

        return [SV_arr, ident_arr]
    }

    searchHandler = (event, identifier) => {
        let value = null;
        const [SV_arr, ident_arr] = this.setArrs();
        for(let i in ident_arr){
            if(identifier === ident_arr[i]){
                this.setState({[SV_arr[i]]: event.target.value.toLowerCase()})
                value = {type: ident_arr[i], value: event.target.value.toLowerCase()}
            }
        }
        const result = this.state.completeTable.filter(ele => {
            let filterValue = true;
            for(let i in ident_arr){
                if(value.type === ident_arr[i]){
                    if(typeof(ele[ident_arr[i]]) === "number"){
                        filterValue = (ele[ident_arr[i]]).toString().includes(value.value) && filterValue
                    }else{
                        filterValue = (ele[ident_arr[i]]).toLowerCase().includes(value.value) && filterValue
                    }
                    const rest_id_arr = [...ident_arr];
                    const rest_SV_arr = [...SV_arr];
                    rest_id_arr.splice(i,1)
                    rest_SV_arr.splice(i,1)
                    console.log(rest_SV_arr, rest_id_arr)

                    for(let n in rest_id_arr){
                        console.log(ele[rest_id_arr[n]])
                        if(typeof(ele[rest_id_arr[n]]) === "number"){
                            filterValue =  (ele[rest_id_arr[n]]).toString().includes(this.state[rest_SV_arr[n]]) && filterValue
                        }else{
                            filterValue =  (ele[rest_id_arr[n]]).toLowerCase().includes(this.state[rest_SV_arr[n]]) && filterValue
                        }
                    }
                    
                }
            }

            return filterValue;

        })
        this.setState({table: result})
    }

    static getDerivedStateFromProps(props, state){
        
        let identifiers = null;
        switch (props.tableType) {
            case "label":
                identifiers = [{name:"label_code", code: "label_code"}, {name:"label_desc", code: "label_desc"},
                 {name:"lang_no", code: "lang_no"}]
                break;
            case "language":
                identifiers = [{name: "lang_name", code: "name"}, {name: "lang_no", code: "lang_no"}]
                break;
            default:
                identifiers = null;
                break;
        } 
        if(state.table){
            return null
        }else{
            if(identifiers){
                const identSV={}
                identifiers.forEach(ele =>{
                    identSV[`${ele.name}S_V`] = ""
                })
                return{
                    table: props.content,
                    completeTable: props.content,
                    identifiers: identifiers,
                    ...identSV
                }
            }else{
                return{
                    table: props.content,
                    completeTable: props.content,
                }
            }   
        }   
    }
    render(){
        let tableContent = null
        if(this.props.content){
            tableContent = this.state.table.map((ele, index) => {
                return(
                    <tr onClick={(event) => this.props.rowClick(event, ele, this.props.rowIdentifier)} key={index}>
                        {this.state.identifiers.map((identifier , i)=> {
                          return  <td key={i}>{ele[identifier.name]}</td>
                        })}
                    </tr>
                )
            })
        }

        let header = null;
        let saerchHader = null
        if(this.props.search){
            saerchHader = (
                <TableHead 
                headers={this.state.identifiers}
                onSearch={this.searchHandler} />
            )
        }else{
            header = this.state.identifiers.map(ele =>{
                const head = t(ele.code , this.props.lanTable, this.props.lanState);
                            return (
                            <th key={head}>{head}</th>
                        )
                })
        }

        const content = (
            <div className={style.tableContainer}>
                <div style={{textAlign: "end"}}>
                    <span onClick={this.props.closeModal}>&times;</span> 
                </div>                
                {saerchHader}
                <div className={style.body}>
                    <table className="table table-hover table-dark table-bordered">
                        <thead>
                            <tr>
                                 {header}
                            </tr>
                        </thead>
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


export default connect(mapStateToProps, null)(DisplayTable);

