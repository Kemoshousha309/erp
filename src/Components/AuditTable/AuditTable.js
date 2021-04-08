import React from "react";
import DisplayBlock from "../UI/DisplayBlock/DisplayBlock";
import style from "./AuditTable.module.scss";
import {connect } from "react-redux"
import { t } from "../../utilities/lang";



const AuditTable = props => {
    // console.log("AuditTable render")
    const selectlang = (f_name, d_name, langNum) =>{
        let output= null;
        if(parseInt(langNum) === 1) {
            output = d_name ? d_name : f_name;
        }else{
            output = f_name
        }
        return output ? output :"-----";
    }
    const handleDate = (date) => {
        const recordDate = new Date(date);
        const year = recordDate.getFullYear();
        const month = recordDate.getMonth() + 1;
        const day = recordDate.getDate();
        const hour = recordDate.getHours();
        const min = recordDate.getMinutes();
        const sec = recordDate.getSeconds();
        return `${year}/${month}/${day} -- ${hour} : ${min} : ${sec}`
    }
    return(
        <div className="table-responsive-lg">
            <table className={["table table-bordered ", style.AuditTable].join(' ')}>
                <thead>
                    <tr>
                        <td>{t("created_by", props.lanTable, props.lanState)}</td>
                        <td>
                            <DisplayBlock>
                                {props.content.add_user}-
                                {selectlang(props.content.add_user_f_name, props.content.add_user_d_name, props.lanNum)}
                            </DisplayBlock>
                        </td>
                        <td>{t("created_at", props.lanTable, props.lanState)}</td>
                        <td>
                            <DisplayBlock>
                                {handleDate(props.content.add_date)}
                            </DisplayBlock>
                            </td>
                        <td>{t("edited_by", props.lanTable, props.lanState)}</td>
                        <td>
                            <DisplayBlock>
                                {selectlang(props.content.modify_user_f_name, props.content.modify_user_d_name, props.lanNum)}
                            </DisplayBlock>
                        </td>
                        <td>{t("edited_at", props.lanTable, props.lanState)}</td>
                        <td>
                            <DisplayBlock>
                                {props.content.modify_date ? handleDate(props.content.modify_date) : "-----"}
                            </DisplayBlock>
                        </td>
                    </tr>
                </thead>
             </table>
        </div>
    )
} 

const mapStateToProps = state => {
    return {
        lanState: state.lang.lan,
        lanTable: state.lang.langTables,
    }
}


export default connect(mapStateToProps, null)(AuditTable);