import { getSelectLangDir } from "../../../utilities/lang"
import { startMode, toolsNameMap } from "../../../utilities/tools"
import { deepClone } from "./validation"

// mode processes *******************************************************
export const handleMode = (mode, lang_no, langs, tools, changeLangSelectAcivity) => {
    let activeList = null
    const lang_dir = getSelectLangDir(langs, lang_no)
    const toolsName = toolsNameMap(lang_dir)
    switch (mode) {
        case "start":
            changeLangSelectAcivity(true)
            return startMode(lang_dir, tools)
        case "add":
            changeLangSelectAcivity(false)
            return activate([toolsName.undo.name, toolsName.save.name], null, lang_dir, tools)
        case "copy":
            changeLangSelectAcivity(false)
            return activate([toolsName.undo.name, toolsName.save.name], null, lang_dir, tools)
        case "d_record":
            changeLangSelectAcivity(false)
            activeList = [
                toolsName.add.name, toolsName.list.name, 
                toolsName.modify.name, toolsName.first.name, toolsName.last.name,
                toolsName.next.name, toolsName.previous.name, toolsName.first.name,
                toolsName.search.name, toolsName.delete.name, toolsName.copy.name,
                toolsName.undo.name
            ]
            return activate(activeList, null, lang_dir, tools)
        case "modify":
            changeLangSelectAcivity(false)
            activeList = [toolsName.save.name, toolsName.undo.name]
            return activate(activeList, null, lang_dir, tools)
        case "search":
            changeLangSelectAcivity(false)
            activeList = [toolsName.search.name, toolsName.undo.name]
            return activate(activeList, "search", lang_dir, tools)
        case "list":
            changeLangSelectAcivity(true)
            activeList = []
            return activate(activeList, null, lang_dir, tools)
        default: 
            break;
    } 
}

const activate = (activeList, mode=null, lang_dir, tools) => {
    const modeClone = deepClone(startMode(lang_dir, tools))
    modeClone.forEach(tool => tool.state = false)
    activeList.forEach(toolName => {
        modeClone.forEach(tool =>{
            if(toolName === tool.name){
                tool.state = true
            }
        })
    })
    if(mode){
        modeClone.forEach(tool => {
            if(tool.name === mode){
                tool.onMode = true
            }
        })
    }
    return modeClone
}
