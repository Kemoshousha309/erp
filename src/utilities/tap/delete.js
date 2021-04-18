import { getPk, getValues, fields, timer } from "./utilities"
import { selectMessage } from "../lang"
import axios from "../../axios"



// delete ******************************************************

export const handleDelete = (thisK) => {
    thisK.setState({deleteConfirm: true})
}

export const handleDeleteConfirmation = (thisK, res) => {
    if(res){
        handleDeleteRequest(thisK)
    }
    const currentState = thisK.state.deleteConfirm
    thisK.setState({deleteConfirm: !currentState})
}

const handleDeleteRequest = (thisK) => {
    const record = getValues(thisK.state.fields)
    const pk = getPk(thisK.state.fields)
    const url = `/public/${thisK.state.tapName}/${record[pk]}/${record.lang_no}`
    thisK.setState({loading: true})
    axios({
            method: 'delete',
            url: url,
            headers:{Authorization: `Bearer ${thisK.props.token}`}, 
        })
    .then(res => {
        fields(thisK.state.fields, 'close', true)
        const message = {
                content: selectMessage(res.data.message, thisK.props.lanState),
                type: "success"
            }
        thisK.setState({
            mode: "start",
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
    })
}
