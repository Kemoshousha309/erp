import React from "react";
import { connect } from "react-redux";
import AuditTable from "../AuditTable/AuditTable";
import Tools from "../Tools/Tools";
import style from "./Boilerplate.module.scss";


const Boilerplate = props => {
   
    return(
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
            <div className={style.audit}>
                    {props.auditTable ? <AuditTable content={props.auditTable} lanNum={props.lanState} /> : null}
                </div>
            <div className={style.newsBar}>
                {/* <NewsBar></NewsBar> */}
            </div>
        </div>
        
    )
}

const mapStateToProps = state => {
    return {
        lanState: state.lan
    }
}

export default connect(mapStateToProps, null)(Boilerplate)
;