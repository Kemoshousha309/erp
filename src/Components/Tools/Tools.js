import React, { memo } from "react";
import Tool from "./Tool/Tool";
import style from "./Tools.module.scss"
import { connect } from "react-redux";
const Tools = props => {
    // console.log("Tools render")
    let tools = null;
    if(props.tools){
        tools = props.tools.map(tool => {
            return <Tool clicked={props.clicked} key={tool.name} state={tool.state} type={tool.name} />
        })
    }
    // let transform  ={transform: "translateX(3rem)"}
    // if(parseInt(props.lanState) === 2){
    //     transform.transform = "translateX(-3rem)"
    // }
    return(
        <ul  className={[style.Tools].join(" ")}>
           {tools}
        </ul>
       
    )
}

const mapStateToProps = state => {
    return {
        lanState: state.lang.lan
    }
}

export default connect(mapStateToProps, null)(memo(Tools));