import { storeLocally, updateState } from "../../utilities";
import * as actionTypes from "../actions/actionTypes";


const initState = {
    lan: 2,
    langTables: null,
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
    const languagesArr = Object.values(action.langTable);
    return(
        updateState(state, {
            ...state,
            langTables: languagesArr,
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



export const languageReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_LANGUAGE: return changeLang(state, action);
        case actionTypes.GET_LANG_TABLE: return getLangTable(state, action)
        case actionTypes.LANG_REQUEST_FAILURE: return langRequestFail(state, action);
        default:
            return state
    }
}

