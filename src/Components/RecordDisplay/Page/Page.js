import React from "react"
import { Component } from "react"
import { connect } from "react-redux"
import { t } from "../../../utilities/lang"
import style from "./Page.module.scss"


class Page extends Component {
    componentDidUpdate () {
        document.getElementById("pageContianer").scrollTo({
            top: 0, 
            behavior: "smooth"
        })
    }
    render(){
        // console.log("page render")
        const body =displayBody(this.props.page.pages, this.props.fields, this.props.recordClick)
        const noMatch = <div className={style.noMatch}>{t("no_match", this.props.lanTable, this.props.lanState)}</div>
        return (
            <div id="pageContianer" className={style.container}>
                <table className="table table-bordered text-center  table-hover">
                    <thead >
                        <tr>
                        <th scope="col">#</th>
                        {displayHead(this.props.fields, this.props)}
                        </tr>
                    </thead>
                    <tbody>
                        {body ? body : noMatch }
                    </tbody>
            </table>
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


export default connect(mapStateToProps, null)(Page);



const displayHead = (fields, props) => {
    const head = fields.map((fName, i) => {
        return( 
            <th key={i} scope="col">{t(fName, props.lanTable, props.lanState).toUpperCase()}</th>
        )
    })
    return head
}

const displayBody = (page, fields, recordClick) => {
    let body =  null
    if(page){
        body = page.map((ele, i) => {
            return(
                <tr key={i} onClick={(e) => recordClick(e, i, ele)}>
                    <th scope="row">{i + 1}</th>
                    {fields.map((f, i )=> {
                        return <td key={i} >{ele[f]}</td>
                    })}
                </tr>
            )
        })
    }
    return body
}
