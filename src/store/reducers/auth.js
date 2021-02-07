import { updateState } from "../../utilities"
import * as actionTypes from "../actions/actionTypes"

const initState = {
    autherror: null,
    authData: null,
    authloading: false,
    tree: null
}

const authSuccess = (state, action) => {
    return (
        updateState(state, {
            authData: action.authData,
            authloading: false,
            autherror: null 
        })
    )
}

const authStart = (state, action) => {
    return (
        updateState(state, {
            authloading: true,
            autherror: null 
        })
    )
}

const authFail = (state, action) => {
    return (
        updateState(state, {
            autherror: action.error,
            authloading: false 
        })
    )
}   

const storeTree = (state, action) => {
    return (
        updateState(state, {
           tree: action.tree
        })
    )
}   

const logout = (state, action) => {
    localStorage.removeItem("authData");
    localStorage.removeItem("authData_storeTime")
    return (
        updateState(state, {
            authData: null,
            tree: null
        })
    )
}


export const authReducer = (state=initState, action) => {
    switch(action.type){
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.STORE_TREE: return storeTree(state, action);
        case actionTypes.LOGOUT: return logout(state, action);
        default:
            return state
    }
}

