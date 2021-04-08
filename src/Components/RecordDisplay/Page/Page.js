import React from "react"
import style from "./Page.module.scss"

const Page = props => {
    // console.log("page render")
    return (
        <div className={style.container}>
            <table className="table table-bordered text-center  table-hover">
            <caption>Page number: {props.page.page_no}</caption>
                <thead >
                    <tr>
                    <th scope="col">#</th>
                    {displayHead(props.fields)}
                    </tr>
                </thead>
                <tbody>
                {displayBody(props.page.pages, props.fields, props.recordClick)}
                </tbody>
        </table>
        </div>
    )
}

export default Page


const displayHead = (fields) => {
    const head = fields.map((fName, i) => {
        return( 
            <th key={i} scope="col">{fName}</th>
        )
    })
    return head
}

const displayBody = (page, fields, recordClick) => {
    let body;
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
    }else{
        body = <h1>No Matches</h1>
    }
    return body
}
