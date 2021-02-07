import * as actionTypes from "./actionTypes";
import axios from "../../axios";
import {storeLocally, isExpire} from '../../utilities'


export const changeLnaguage = (langValue) => ({type: actionTypes.CHANGE_LANGUAGE, langValue: langValue}) 
export const storeLanguagesTable = (langTable) => ({type: actionTypes.GET_LANG_TABLE, langTable: langTable })
export const storeMessages = (messages) => ({type: actionTypes.STORE_MESSAGES, messages: messages })
export const langRequestFailure = () => ({type: actionTypes.LANG_REQUEST_FAILURE})

export const langRequest = () => {
    return dispatch => {
        axios.get("label")
        .then(res =>{
            storeLocally("labels", res.data);
            dispatch(storeLanguagesTable(res.data))
        }) 
        .catch(err => {
            dispatch(langRequestFailure())
        })
        axios.get("message")
        .then(res =>{
            storeLocally("messages", res.data);
            dispatch(storeMessages(res.data))
        }) 
        .catch(err => {
            dispatch(langRequestFailure())
        })
    }
}


const checkLabels = (dispatch) =>{
    const labels = localStorage.getItem("labels");
    if(labels){
        if(isExpire("labels", 3600 * 1000 * 24)){
            localStorage.removeItem("labels");
            localStorage.removeItem("labels_storeTime")
        }
        dispatch(storeLanguagesTable(JSON.parse(labels)))
    }else{
        dispatch(langRequest())
    }
}


const checkMessages = (dispatch) =>{
    const messages = localStorage.getItem("messages");
    if(messages){
        if(isExpire("messages", 3600 * 1000 * 24)){
            localStorage.removeItem("messages");
            localStorage.removeItem("messages_storeTime")
        }
        dispatch(storeMessages(JSON.parse(messages)))
    }else{
        dispatch(langRequest())
    }
}



const checkLang = (dispatch) =>{
    const lang_num = localStorage.getItem("lang_num");
    if(lang_num){
        if(isExpire("lang_num", 3600 * 1000 * 24)){
            localStorage.removeItem("lang_num");
            localStorage.removeItem("lang_num_storeTime")
        }
        dispatch(changeLnaguage(lang_num))
    }
}



export const checkLabelesLocalStorage = () => {
    return dispatch => {
        checkLabels(dispatch);
        checkLang(dispatch);
        checkMessages(dispatch)
    }
}