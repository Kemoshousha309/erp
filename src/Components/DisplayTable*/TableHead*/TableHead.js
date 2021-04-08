import React from "react";
import {connect} from "react-redux";
import {t} from "../../../utilities/lang"

const TableHead = props => {
    // console.log("TableHead render")
    const headers = props.headers.map(ele =>{
        const head = t(ele.code , props.lanTable, props.lanState);
                return (
                    <th key={head}>{head}</th>
                )
        })
    const search =(
        <tbody>
            <tr>
            {props.headers.map(ele => {
                return (
                    <td key={ele.name}><input className="form-control" onChange={(event) => props.onSearch(event , ele.name)} /></td>
                )
            })}
            </tr>
        </tbody>
    )

    return(
        <table className="table table-dark table-bordered">
            <thead>
                <tr>
                {headers}
                </tr>
            </thead>
           {search}

        </table>
    )
}

const mapStateToProps = state => {
    return {
        lanState: state.lang.lan,
        lanTable: state.lang.langTables
    }
}

export default connect(mapStateToProps, null)(TableHead);