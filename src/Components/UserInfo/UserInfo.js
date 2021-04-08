import React from "react";
import style from "./UserInfo.module.scss";
import {connect} from "react-redux"
import Aux from "../../hoc/Aux";

const UserInfo = props => {
    // console.log("UserInfo render")
    let userId = (
        <Aux>
            <span>User Id :</span> {props.authData.user_id}
        </Aux>
    )
    let userName = (
        <Aux>
            <span>User Name :</span> {
                props.authData.user_f_name == null ? props.authData.user_d_name : props.authData.user_f_name
            }
        </Aux>
    )    
    if(parseInt(props.lanState) === 1){
         userId = (
            <Aux>
                <span>رقم المستخدم:</span> {props.authData.user_id}
            </Aux>
        )
         userName = (
            <Aux>
                <span>اسم المسيخدم:</span> {props.authData.user_d_name}
            </Aux>
        )
    }
    return(
        <div className={style.userInfo}>
            <ul className="list-group">
                 <li className="list-group-item">{userId}</li>
                <li className="list-group-item">{userName}</li>
            </ul>
        </div>
    )
}


const mapStateToProps = state => {
    return {
        lanState: state.lang.lan,
        authData: state.auth.authData
    }
  }

export default connect(mapStateToProps)(UserInfo);