import {
    faClipboard,
    faPlusCircle,
    faSearch,
    faEdit,
    faArrowCircleLeft,
    faArrowCircleRight,
    faAngleDoubleLeft,
    faAngleDoubleRight,
    faSave, 
    faCopy, 
    faUndo,
    faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { t } from "./lang";



export const toolsNameMap = (lang_dir) => {
    const toolsName = {
        add: {name: "add", icon: faPlusCircle},
        copy: {name: "copy", icon: faCopy},
        search: {name: "search", icon: faSearch},
        list: {name: "list", icon: faClipboard},
        previous: {name: "previous", icon: faArrowCircleLeft},
        next: {name: "next", icon: faArrowCircleRight},
        first: {name: "first", icon: faAngleDoubleLeft},
        last: {name: "last", icon: faAngleDoubleRight},
        modify: {name: "modify", icon: faEdit},
        save: {name: "save", icon: faSave},
        delete: {name: "delete", icon: faTrashAlt},
        undo: {name: "undo", icon: faUndo}
    }
    if(parseInt(lang_dir) === 1){
        toolsName.previous.icon = faArrowCircleRight
        toolsName.next.icon = faArrowCircleLeft
        toolsName.first.icon = faAngleDoubleRight
        toolsName.last.icon = faAngleDoubleLeft
    }
    return toolsName
} 



export const startMode = (langDir) => {
    const toolsName = toolsNameMap(langDir)
    let mode = [
        {name: toolsName.add.name, state: true},
        {name:  toolsName.copy.name, state: false},
        {name: toolsName.search.name, state: true, onMode: false},
        {name: toolsName.list.name, state: true},
        {name: toolsName.previous.name, state: false},
        {name: toolsName.next.name, state: false},
        {name: toolsName.first.name, state: true},
        {name: toolsName.last.name, state: true},
        {name: toolsName.modify.name, state: false},
        {name:  toolsName.save.name, state: false},
        {name:  toolsName.delete.name, state: false},
        {name:  toolsName.undo.name, state: false},
    ]
    return mode
}



export const getRelatedIcon = (name, lanTable, lanState, langDir) => {
    const toolsName = toolsNameMap(langDir)
    return [toolsName[name].icon, t(name, lanTable, lanState) ? t(name, lanTable, lanState) : "placeHolder"]
}

export const toolSelectHandler = (identifier, thisKey) =>{
    const toolmap = {
        list: thisKey.list,
        search: thisKey.search,
        modify: thisKey.modify,
        add: thisKey.add,
        previous: thisKey.previous,
        next: thisKey.next,
        first: thisKey.first,
        last: thisKey.last,
        save: thisKey.save,
        undo: thisKey.undo,
        copy: thisKey.copy,
        delete: thisKey.delete
    }
    toolmap[identifier]()
}