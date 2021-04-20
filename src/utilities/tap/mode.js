import { deepClone } from "./utilities"
import { getSelectLangDir } from "../lang"
import { startMode, toolsNameMap } from "../tools"

// mode processes *******************************************************
export const handleMode = (mode, lang_no, langs, tools) => {
    let activeList = null
    const lang_dir = getSelectLangDir(langs, lang_no)
    const toolsName = toolsNameMap(lang_dir)
    switch (mode) {
        case "start":
            return startMode(lang_dir, tools)
        case "add":
            return activate([toolsName.undo.name, toolsName.save.name], null, lang_dir, tools)
        case "copy":
            return activate([toolsName.undo.name, toolsName.save.name], null, lang_dir, tools)
        case "d_record":
            activeList = [
                toolsName.add.name, toolsName.list.name, 
                toolsName.modify.name, toolsName.first.name, toolsName.last.name,
                toolsName.next.name, toolsName.previous.name, toolsName.first.name,
                toolsName.search.name, toolsName.delete.name, toolsName.copy.name,
                toolsName.undo.name
            ]
            return activate(activeList, null, lang_dir, tools)
        case "modify":
            activeList = [toolsName.save.name, toolsName.undo.name]
            return activate(activeList, null, lang_dir, tools)
        case "search":
            activeList = [toolsName.search.name, toolsName.undo.name]
            return activate(activeList, "search", lang_dir, tools)
        case "list":
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
