import style  from "./NetworkError.module.scss";
import React from "react";
import warning from "../../../assests/warning.png"
import { connect } from "react-redux";
import { t } from "../../../utilities/lang";


const lang2 = {
    "1" : "You are not conneted to the internet.",
    "2" : "please check your internet connection and try agian.",
  
}


const lang1 = {
    "1" : "انت غير متصل بالشبكه.",
    "2" : "من فضلك تاكد من الاتصال بالشبكه و حاول مره اخرى.",
}


const NetworkError = props => {
    let lables = lang1;
    if(parseInt(props.lanState )=== 2){
        lables = lang2
    }
    return (
        <div className={style.container}>
            <img src={warning} alt="warning" ></img>
            <div className={style.info}>
                <h1>{t("network_error", props.lanTable, props.lanState)}</h1>
                <p>
                    {lables["1"]}<br></br>
                    {lables["2"]} <br></br>
                </p>
                <a target="blank" href="https://buildingconnected.zendesk.com/hc/en-us/articles/360022590413-What-is-a-Network-Error-and-how-do-I-resolve-it-">
                    {t("learn_more", props.lanTable, props.lanState)}
                </a>
            </div>
        </div>
        )
}


const mapStateToProps = state => {
    return {
        lanState: state.lang.lan,
        lanTable: state.lang.langTables,
    }   
}


export default connect(mapStateToProps, null)(NetworkError);