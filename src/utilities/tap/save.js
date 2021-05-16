import { timer } from "./utilities"
import {  getValues, fields, getHeaders } from "./fields"
import { checkValidity } from "./validation"
import { selectMessage } from "../lang"
import axios from "../../axios"

// save processes ***************************************************
export const handleSave = (thisK, func) => {
    const[valid, fieldsUpdate] = checkValidity(thisK) 
        if(valid){
            handleSaveRequest(thisK, func)            
        }else{
            thisK.setState({fields: fieldsUpdate})
        }
} 

const handleSaveRequest = (thisK, func) => {
    let method = null
    let url = null
    if(thisK.state.mode === "modify"){
        method = "put"
        url = thisK.state.urls.modify
    }else{
        method = "post"
        url = thisK.state.urls.add
    }
        thisK.setState({loading: true})
    axios({
        method: method,
        url: url,
        data: getValues(thisK.state.fields),
        headers: getHeaders(thisK)
        })
        .then(res => {
            fields(thisK.state.fields, 'close', false)
            if(func){
                 func(thisK)
            }
            const message = {
                content: selectMessage(res.data.message, thisK.props.lanState),
                type: "success"
            }
            thisK.setState({
                mode: "d_record",
                loading: false, 
                message: message,
                recordIndex: null,
            })
            timer(thisK)
        })
        .catch(err => {
            fields(thisK.state.fields, 'open', false)
            if(func){
                 func(thisK)
            }
            const message = {
                content: selectMessage(err.response.data.message, thisK.props.lanState),
                type: "error"
            }
            if(err.response.data.error){
                message.content = err.response.data.error
            }
            thisK.setState({
                loading: false, 
                message: message,
                recordIndex: null,
                
            })
            timer(thisK)
        }) 
}

