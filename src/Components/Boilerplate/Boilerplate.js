import React from "react";
import { connect } from "react-redux";
import Aux from "../../hoc/Aux";
import { t } from "../../utilities/lang";
import AuditTable from "../AuditTable/AuditTable";
import Tools from "../Tools/Tools";
import Spinner from "../UI/Spinner/Spinner";
import StatusBar from "../StatusBar/StatusBar";
import style from "./Boilerplate.module.scss";


const Boilerplate = props => {
    // console.log("Boilerplate render")
    const auditTable = (
        <div className={style.audit}>
            <AuditTable content={props.auditTable} lanNum={props.lanState} /> 
        </div>
    )
    
    let statusBarContent= null
    let statusBar = null
    if(props.statusBar){
         statusBarContent = props.statusBar.message ?
        t(props.statusBar.message, props.lanTable, props.lanState, "label") :
        <Spinner color=" #30475e" small={true} />;  
        statusBar =  (
            props.statusBar.show ? <StatusBar show={props.statusBar.show}>{statusBarContent}</StatusBar> : null
        )
        
    }
    

    return(
        <Aux>
            <div className={style.Boilerplate}>
            <div className={style.header}>
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
            {props.auditTable ? auditTable : null}  
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
