import { storeLocally, updateState } from "../../utilities/reducre";
import * as actionTypes from "../actions/actionTypes";


const initState = {
    lan: 2,
    langTables: [],
    langLoading: false
}


const changeLang = (state, action) => {
    storeLocally("lang_num", action.langValue);
    return (
        updateState(state, {
            lan: action.langValue
        })
    )
}
const getLangTable = (state, action) => {
    const langTable = [...state.langTables]
    const labels = Object.values(action.langTable);
    labels.forEach(ele => langTable.push(ele))
    return(
        updateState(state, {
            ...state,
            langTables: langTable,
            langLoading: true
        })
    )
}


const langRequestFail = (state, action) => {
    return(
        updateState(state, {
            ...state,
            langLoading: true
        })
    )
}

const storeMessageTable = (state, action) => {
    const langTable = [...state.langTables]
    const messages = Object.values(action.messages);
    messages.forEach(ele => langTable.push(ele))
    return(
        updateState(state, {
            ...state,
            langTables: langTable,
        })
    )
}



export const languageReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_LANGUAGE: return changeLang(state, action);
        case actionTypes.GET_LANG_TABLE: return getLangTable(state, action)
        case actionTypes.LANG_REQUEST_FAILURE: return langRequestFail(state, action);
        case actionTypes.STORE_MESSAGES: return storeMessageTable(state, action);
        default:
            return state
    }
}

