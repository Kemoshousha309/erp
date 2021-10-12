import { timer } from "../utilities"
import {  getValues, fillRecord, getPkUrl } from "../fields"
import axios from "../../../axios"
import { t } from "../../lang"
import { logout } from "../../../store"
import {store} from "../../../index"


// moves processes ***********************************************


const handleUrlMove_ = (moveType, index, thisK) => {
    let url = null
    let newIndex = null
    switch (moveType) {
        case "next":
            newIndex =index+1
            url = `${thisK.state.urls.page}/${newIndex}`
            break;
        case "previous":
            newIndex =index-1
            url = `${thisK.state.urls.page}/${newIndex}`
            break;
        case "first":
            newIndex = 1
            url = `${thisK.state.urls.page}/${newIndex}`
            break;
        case "last":
            newIndex = "lastIndex"
            url = thisK.state.urls.lastPage
            break;
        default:
            break;
    }
    return [url, newIndex]
}

const handleUrlMove = (moveType, thisK) =>{
    let url = null
    let newIndex = null
    switch (moveType) {
        case "next":
            newIndex = thisK.state.recordIndex+1
            url = `${thisK.state.urls.page}/${newIndex}`
            break;
        case "previous":
            newIndex = thisK.state.recordIndex-1
            url = `${thisK.state.urls.page}/${newIndex}`
            break;
        case "first":
            newIndex = 1
            url = `${thisK.state.urls.page}/${newIndex}`
            return [url, newIndex]
        case "last":
            newIndex = "lastIndex"
            url = thisK.state.urls.lastPage
            return [url, newIndex]
        default:
            break;
    }
    if(!thisK.state.recordIndex){
        newIndex = null
        url = null
    }
    return [url, newIndex]
}

const handleRes = (thisK, res, newIndex) =>{
    if(res.data.page){
        const record = res.data.page
        fillRecord(thisK.state.fields, record)
        thisK.setState({recordIndex: newIndex, record:res.data.page, mode: "d_record"})
    }
    let index = !newIndex ? 1 : newIndex
    if(newIndex > thisK.state.lastIndex){
        index = "last index"
    }
    const message = {
        content: t("record_no", thisK.props.lanTable, thisK.props.lanState, index),
        type: "info"
    }
    thisK.setState({
        loading: false,
        mode: "d_record",
        message: message
    })
    timer(thisK)
}


const handleIndex = (thisK, moveType) => {
    let index = null
    const recordData = getValues(thisK.state.fields)
    const pkurl = getPkUrl(thisK.state.pks, recordData)
    const url = `${thisK.state.urls.pageNo}${pkurl}`
    axios.get(url)
    .then(res => {
        index = res.data.page_no
        const [url, newIndex] = handleUrlMove_(moveType, index, thisK)
        axios.get(url)
        .then(res => handleRes(thisK, res, newIndex))
        .catch(err => {
            console.log(err)
             // update the previlliges
          if(err.response.status === 401){
            store.dispatch(logout())
        }
        })
    })
    .catch(err => {
         // update the previlliges
         if(err.response.status === 401){
            store.dispatch(logout())
        }
    })
    return index
}

export const setlastIndex = (thisK) => {
    axios.get(thisK.state.urls.lastPage)
        .then(res => {
            thisK.setState({lastIndex: res.data.pages_count})
        })
        .catch(err => {
        })
}


export const handleMove = (type, thisK) => {
    const [url, newIndex] = handleUrlMove(type, thisK)
    thisK.setState({message: false, loading: true})
    if(!newIndex){
        handleIndex(thisK, type)
    }else{
        axios.get(url)
        .then(res => {
            if(newIndex === 'lastIndex'){
                handleRes(thisK, res, res.data.pages_count) 
            }else{
                handleRes(thisK, res, newIndex)
            }
        })
        .catch(err => {
            // update the previlliges
            if(err.response){
                if(err.response.status === 401){
                    store.dispatch(logout())
                }
            }else{
                thisK.setState({message: false, loading: false})
            }
        })
    }
}
