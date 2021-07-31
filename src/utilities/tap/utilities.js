import { hash_back, hash } from "../utilities";



let lastTimer = null
export const timer = (thisK) => {
    var timerId = setTimeout(() => {
        thisK.setState({message: false})
    }, 3000);

    if(!(lastTimer === timerId)){
        if(lastTimer){
            clearTimeout(lastTimer)
        }   
    }
    lastTimer = timerId
}

export  const trigerEnterButton = (id, func) => {
    const input = document.getElementById(id);
    input.addEventListener("keyup", event => {
        if (event.keyCode === 13) {
            event.preventDefault();
            input.blur()
            func()
        }
    });
}

export const toolsPriv = (formPrivs, tools) => {
    const tools_hash = hash(tools, "name")
    for(let key in formPrivs) {
        if(key === "add_priv" && !formPrivs[key]){
            delete tools_hash["add"];
            delete tools_hash["copy"];
        }
        if(key === "modify_priv" && !formPrivs[key]){delete tools_hash["modify"];}
        if(key === "view_priv" && !formPrivs[key]){delete tools_hash["list"];}
        if(key === "delete_priv" && !formPrivs[key]){delete tools_hash["delete"];}
    }
    return hash_back(tools_hash);
}


