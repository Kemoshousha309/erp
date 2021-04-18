import { getPk, getValues, fields, timer, checkValidity, extractRcordData, fillRecord } from "./utilities"
import { selectMessage } from "../lang"
import axios from "../../axios"

// Handle search ******************************************************
export const  handleSearch = (thisK) => {
    if(thisK.state.mode === "search"){
        const values = getValues(thisK.state.fields)
        const pk = getPk(thisK.state.fields)
        // if(values[pk] === "" ){
        //     const message = {
        //         content: t("you_must_enter", thisK.props.lanTable, thisK.props.lanState, pk),
        //         type: "warning"
        //     }
        //     thisK.setState({message: message})
        //     timer(thisK)
        // }else if(values.lang_no === ""){
        //     const message = {
        //         content: t("you_must_enter", thisK.props.lanTable, thisK.props.lanState, "lang_no"),
        //         type: "warning"
        //     }
        //     thisK.setState({message: message})
        //     timer(thisK)
        // }
        const[valid, fieldsUpdate] = checkValidity(thisK) 
        if(valid){
            searchRequest(thisK, pk, values)           
        }else{
            thisK.setState({fields: fieldsUpdate})
        }
    }else{
        fields(thisK.state.fields, "open", true, thisK.state.searchFields)
        thisK.setState({mode: "search"})
    }
} 

const searchRequest = (thisK, pk, values) => {
    thisK.setState({loading: true})
    axios.get(`/public/${thisK.state.tapName}/${values[pk]}/${values.lang_no}`)
    .then(res => {
        const record = extractRcordData(thisK.state.mainFields, res.data)
        fillRecord(thisK.state.fields, record)
        fields(thisK.state.fields, 'close', false)
        thisK.setState({
            mode: "d_record",
            loading: false, 
            recordIndex: null
        })
        timer(thisK)
    })
    .catch(err => {
        fields(thisK.state.fields, 'open', false, thisK.state.searchFields)
        const message = {
            content: selectMessage(err.response.data.message, thisK.props.lanState),
            type: "error"
        }
        thisK.setState({
            loading: false, 
            message: message,
            recordIndex: null
        })
        timer(thisK)
    })
}
