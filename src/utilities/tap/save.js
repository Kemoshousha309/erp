import { getValues, fields, timer, checkValidity } from "./utilities"
import { selectMessage } from "../lang"
import axios from "../../axios"

// save processes ***************************************************
export const handleSave = (thisK) => {
    const[valid, fieldsUpdate] = checkValidity(thisK) 
        if(valid){
            handleSaveRequest(thisK)            
        }else{
            thisK.setState({fields: fieldsUpdate})
        }
} 

const handleSaveRequest = (thisK) => {
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
        data: getValues(thisK.state.fields)
        })
        .then(res => {
            fields(thisK.state.fields, 'close', false)
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
            fields(thisK.state.fields, 'close', true)
            const message = {
                content: selectMessage(err.response.data.message, thisK.props.lanState),
                type: "error"
            }
            thisK.setState({
                mode: "start",
                loading: false, 
                message: message,
                recordIndex: null,
                
            })
            timer(thisK)
            console.log(err.response)
        }) 
}
