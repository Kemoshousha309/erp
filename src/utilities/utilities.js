import { decideName } from "./lang";
import { extractName } from "./tap/handlers";

export const getParam = (searchParam) => {
    const string = searchParam.replace("?key=", "");
    return string
}

export const getF = (f, mode=null, lang_no) => {
    const outPut =  typeof(f) === "object" ? f[mode] : f
    if(mode === "propName" && scanNameLang(outPut)){
        const nakeName = extractName(outPut)
        return decideName(nakeName, lang_no)
    }else{
        if(outPut === "name"){
            return parseInt(lang_no) === 1 ? "name" : "foreign_name"
        }
    }
    return outPut
}

const scanNameLang = (string) => {
    let isFound = false
    isFound = string.includes("d_name") || string.includes("f_name")
    return isFound
} 

// export const addPropertyListener = (targetObject,  propertyName, callBackFunc) => {
//     const handler = {
//         set: (target, property, value) => { 
//             target[property] = value
//             console.log(`${property} is updated to  => ${value}`)
//         }
//     }
//     const stateProxy = new Proxy(targetObject, handler)
//     callBackFunc()
//     return stateProxy
// }
