import React from "react";
import Tool from "./Tool/Tool";
import style from "./Tools.module.scss"
import { connect } from "react-redux";
const Tools = props => {
    let tools = null;
    if(props.tools){
        tools = props.tools.map(tool => {
            return <Tool clicked={props.clicked} key={tool.name} state={tool.state} type={tool.name} />
        })
    }
    let transform  ={transform: "translateX(-20rem)"}
    if(parseInt(props.lanState) === 1){
        transform.transform = "translateX(20rem)"
    }
    return(
        <ul style={transform} className={[style.Tools].join(" ")}>
           {tools}
        </ul>
       
    )
}

const mapStateToProps = state => {
    return {
        lanState: state.lang.lan
    }
}

const mapDispatchToProps = dispatch => {
    return {
        
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Tools);