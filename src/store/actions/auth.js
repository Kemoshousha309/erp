import axios from "../../axios";
import { storeLocally, isExpire } from "../../utilities/reducre";
import { getTreeStructure } from "../../utilities/tree";
import * as actionTypes from "./actionTypes"

const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    }
}

const authSuccessStart = () => ({type: actionTypes.AUTH_START});

const authFail = (err) => ({type: actionTypes.AUTH_FAIL, error: err});

export const logout = () => ({type: actionTypes.LOGOUT})



export const authRequest = (authData, redirect) => {
    return dispatch => {
        dispatch(authSuccessStart())
        axios.post("/public/login",authData)
        .then(res => {
            dispatch(authSuccess(res.data))
            storeLocally("authData", res.data)
            redirect()
        }).catch(err => {
            if(err.message === "Network Error"){
                // 503 for network error
                dispatch(authFail(503))
            }else{
                console.log(err);
                if(err.response){
                    dispatch(authFail(err.response.data.message))
                }
            }
        })
    }
}



const checkAuth = (dispatch) =>{
    const authData = JSON.parse(localStorage.getItem("authData"));
    if(authData){
        if(isExpire("authData", 3600 * 1000 * 24)){
            dispatch(logout())
        }else{
            dispatch(authSuccess(authData))
        }
    }
}

export const checkAuthLocalStorage = () => {
    return dispatch => {
       checkAuth(dispatch)
    }
}



const storeTree = (structuredTree) => ({type: actionTypes.STORE_TREE, tree: structuredTree})


export const treeRequest = () => {
    return (dispatch, getState) => {
        const token = getState().auth.authData.token;
        axios.get("forms/mainTree", {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            const structuredTree = getTreeStructure(res.data);
            dispatch(storeTree(structuredTree))
         }).catch(err => {
             //handle Error
            console.log(err.message)
        })
    }
}