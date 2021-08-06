import style from "./LogoutPage.module.scss";
import React, { useState } from "react";
import secure_login from '../../../assests/secure_login.png'
import { connect } from "react-redux";



const lang2 = {
    "1" : "You are not logged in, please login to continue",
    "2" : "Go login page",
    "3" : "You are directed to this page because one of the following reasons:",
    "4" : "You log out of the system.",
    "5" : "Your privileges are updated and you need to log in.",
    "6" : "Your login session ends.",
    "7" : "Read more"
}


const lang1 = {
    "1" : "انت لم تسجل دخولك, الرجاء تسجيل الدخول للاستمرار",
    "2" : "الذهاب لصفحة تسجيل الدخول",
    "3" : "لقد تم تحويلك لهذه الصفحه لاحد الاسباب التاليه: ",
    "4" : "سجلت خوجك من النظام",
    "5" : "تم تحديث صلاحياتك وتحتاج الى اعادة تسجيل الدخول",
    "6" : "فترة تسجيلك لدخول انتهت",
    "7" : "اقرأ المزيد"
}


const LogoutPage = props => {
    let lables = lang1;
    if(parseInt(props.lanState )=== 2){
        lables = lang2
    }

    const [state, setState] = useState({boxShow: false})

    return (
        <div className={[style.container, "container-fluid"].join(" ")}>
            <div className="row">
            <div className={[style.colomn, "col-md-6 p-4"].join(" ")}>
                <img src={secure_login} className="img-fluid " alt="warning" />
            </div>
            <div className={[style.infoColumn, "col-md-6"].join(" ")}>
                <div>
                    <h1 className="">{lables["1"]}</h1>
                        <button
                            onClick={()=> props.history.push("/login")} 
                            style={{fontSize: "2rem"}}
                            className="btn btn-outline-primary " >{lables["2"]}</button><br></br>


                    <button  style={{fontSize: "2rem"}} onClick={() => setState({boxShow: !state.boxShow})} className="btn btn-outline-secondary">{lables["7"]}</button>

                    <div className={[style.collapseBox, (state.boxShow ? style.show : style.hidden)].join(" ")}>
                    <p>
                        {lables["3"]} <br></br>
                        1-  {lables["4"]}<br></br>
                        2-  {lables["5"]} <br></br>
                        3-  {lables["6"]}
                    </p>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}


const mapStateToProps = state => {
    return {
        lanState: state.lang.lan,
        langTable: state.lang.langTables,
    }
  }
  


export default connect(mapStateToProps, null)(LogoutPage);