import { getSelectLangDir } from "../lang"

// function listners *******************************************
const getToolState = (tools, name) => {
    let state = null
    tools.forEach(t => {
        if(t.name === name){
            state = t.state
        }
    })
    return state
}

const handleListenrClick = (event, tools, name, func) => {
    const state = getToolState(tools, name)
    if(name === "next" || name === "previous"){
        // no blur
    }else{
        const inputs = document.getElementById("tap").querySelectorAll("input, select")
        inputs.forEach(ele => ele.blur())
    }
    if(state){
        event.preventDefault()
        func()
    }
}


const setListenrs = (event, thisK) => {
    const dir = getSelectLangDir(thisK.props.languages, thisK.props.lanState)
        const tools = thisK.state.tools
        switch (event.key) {
            case "Delete": handleListenrClick(event, tools, "delete", thisK.delete); break;
            case "F12": handleListenrClick(event, tools, "delete", thisK.delete); break;
            case "F2": handleListenrClick(event, tools, "add", thisK.add); break;
            case "Insert": handleListenrClick(event, tools, "add", thisK.add); break;
            case "F3": handleListenrClick(event, tools, "copy", thisK.copy); break;
            case "F5": handleListenrClick(event, tools, "search", thisK.search); break;
            case "F4": handleListenrClick(event, tools, "list", thisK.list); break;
            case "F7": handleListenrClick(event, tools, "modify", thisK.modify); break;
            case "Home": handleListenrClick(event, tools, "first", thisK.first); break;
            case "End": handleListenrClick(event, tools, "last", thisK.last); break;
            case "Escape": handleListenrClick(event, tools, "undo", thisK.undo); break;
            case "F10": handleListenrClick(event, tools, "save", thisK.save); break;
            case "ArrowRight": 
                if(parseInt(dir) === 2){
                    handleListenrClick(event, tools, "next", thisK.next);
                }else{
                    handleListenrClick(event, tools, "previous", thisK.previous);
                }
                break;
            case "ArrowLeft": 
                if(parseInt(dir) === 2){
                    handleListenrClick(event, tools, "previous", thisK.previous);
                }else{
                    handleListenrClick(event, tools, "next", thisK.next);
                }
                break;
            case "F8":  // should be f1 
                event.preventDefault()
                thisK.ShortCutsListCloseHandler()
                break;
            default: break;
        }
}


export const functionsListenrs = (thisK, mode) => {
    if(mode){
        document.onkeydown = (e) => setListenrs(e, thisK)
    }else{
        document.onkeydown = null
    }
}
        