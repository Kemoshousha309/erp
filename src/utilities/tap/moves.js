import { timer, extractRcordData, fillRecord, getPk, getValues} from "../processes"
import axios from "../../axios"
import { t } from "../lang"


// moves processes ***********************************************


const handleUrlMove_ = (moveType, index, thisK) => {
    let url = null
    let newIndex = null
    switch (moveType) {
        case "next":
            newIndex =index+1
            url = `public/${thisK.state.tapName}/page/${newIndex}`
            break;
        case "previous":
            newIndex =index-1
            url = `public/${thisK.state.tapName}/page/${newIndex}`
            break;
        case "first":
            newIndex = 1
            url = `public/${thisK.state.tapName}/page/${newIndex}`
            break;
        case "last":
            newIndex = "lastIndex"
            url = `public/${thisK.state.tapName}/lastPage`
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
            url = `public/${thisK.state.tapName}/page/${newIndex}`
            break;
        case "previous":
            newIndex = thisK.state.recordIndex-1
            url = `public/${thisK.state.tapName}/page/${newIndex}`
            break;
        case "first":
            newIndex = 1
            url = `public/${thisK.state.tapName}/page/${newIndex}`
            break;
        case "last":
            newIndex = "lastIndex"
            url = `public/${thisK.state.tapName}/lastPage`
            break;
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
        const record = extractRcordData(thisK.state.mainFields, res.data.page)
        fillRecord(thisK.state.fields, record)
        thisK.setState({recordIndex: newIndex, mode: "d_record"})
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
    const pk = getPk(thisK.state.fields)
    const recordData = getValues(thisK.state.fields)
    axios.get(`/public/${thisK.state.tapName}/pageNo/${recordData[pk]}/${recordData.lang_no}`)
    .then(res => {
        index = res.data.page_no
        const [url, newIndex] = handleUrlMove_(moveType, index, thisK)
        axios.get(url)
        .then(res => handleRes(thisK, res, newIndex))
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
    return index
}

export const setlastIndex = (thisK) => {
    axios.get(`public/${thisK.state.tapName}/lastPage`)
        .then(res => {
            thisK.setState({lastIndex: res.data.pages_count})
        })
        .catch(err => console.log(err))
}


export const handleMove = (type, thisK) => {
    const [url, newIndex] = handleUrlMove(type, thisK)
    thisK.setState({message: false, loading: true})
    if(!newIndex){
        // you should get index first
        console.log('you should get index first')
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
        .catch(err => console.log(err))
    }
}
