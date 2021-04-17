import React from "react";
import { connect } from "react-redux";
import Aux from "../../hoc/Aux";
import Tools from "../Tools/Tools";
import Spinner from "../UI/Spinner/Spinner";
import StatusBar from "../StatusBar/StatusBar";
import style from "./Boilerplate.module.scss";


const Boilerplate = props => {
    // console.log("Boilerplate render")
    const statusBar = (
        <Aux>
        { props.loading ? <Spinner position="statusPosition" small color="3F51B5" />: null }
        {
            props.message ? 
            <StatusBar show type={props.message.type} >{props.message.content}</StatusBar>  : null
        }
       </Aux>
    )
    
    let transform  = style.headerLtr
    if(parseInt(props.lanState) === 2){
        transform = style.haederRtl
    }
    return(
        <Aux>
            <div className={style.Boilerplate}>
                <div className={[style.header, transform].join(" ")}>
                    {props.dropDown}
                    <Tools clicked={props.toolsClicked} tools={props.tools} />
                </div>
                <div  className={style.container}>
                    <div className={style.tap}>
                        <div className={style.content}>
                            {props.children}
                            <span></span>
                        </div>
                    </div>
                </div>
                {statusBar}
            </div>
    
        </Aux>
        
    )
}



const mapStateToProps = state => {
    return {
        lanState: state.lang.lan,
        lanTable: state.lang.langTables
    }
}

export default connect(mapStateToProps, null)(Boilerplate);
