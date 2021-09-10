import axios from "../../axios";
import { storeLocally, isExpire } from "../../utilities/reducre";
import { deepClone } from "../../utilities/tap/validation";
import { getTreeStructure } from "../../utilities/tree";
import { hash } from "../../utilities/utilities";
import * as actionTypes from "./actionTypes";



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
            // raw tree  => form_no
            res.data.raw_tree = deepClone(res.data.main_tree)
            res.data.raw_tree_hash = hash(deepClone(res.data.raw_tree), "form_no"); 

            // flag_detail_main_tree => flag_code
            res.data.flag_details_hash = hash(deepClone(res.data.flag_detail_main_tree), "label_code")

            // forms_privs => form_no
            res.data.forms_privs_hash = hash(deepClone(res.data.forms_privs), "form_no");
            // structure tree
            res.data.main_tree = getTreeStructure(res.data.main_tree);

            // flag tree
            const raw_tree_clone = deepClone(res.data.raw_tree)
            raw_tree_clone.forEach(k => {
                if(k.flag_code){
                    const flags = res.data.flag_detail_main_tree.filter(i => i.flag_code ===  k.flag_code)
                    k.children = []
                    k.children.push(...flags)
                }
            })
            res.data.tree_f = getTreeStructure(raw_tree_clone);

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
        axios.get("forms/mainTree")
        .then(res => {
            const structuredTree = getTreeStructure(res.data);
            dispatch(storeTree(structuredTree))
         }).catch(err => {
             //handle Error
            console.log(err.message)
        })
    }
}