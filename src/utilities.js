import Input from "./Components/UI/Input/Input";
import React from "react";
import Aux from "./hoc/Aux";
import {
    faWindowRestore,
    faMoneyBillWave,
    faWarehouse,
    faMoneyCheckAlt,
    faHandHoldingUsd,
    faUserCog,
    faUserShield,
    faRetweet,
    faCogs,
    faTags,
    faCommentAlt,
    faCubes,
    faLanguage,
    faUsers,
    faDatabase,
    faShieldAlt,
    faAtlas,
    faFolderPlus,
    faHandshake,
    faFlag,
    faFileInvoice,
    faFile

} from "@fortawesome/free-solid-svg-icons"
import {
    faWpforms
} from "@fortawesome/free-brands-svg-icons"

export const t = (label_code, langTables, lang_no, placeholder) => {
    let description;
    langTables.forEach(element => {
        if(element.label_code  === label_code  && parseInt(element.lang_no)  === parseInt(lang_no)){
            description = element.label_desc
        }
    });
    if(placeholder){
        langTables.forEach(element => {
            if(element.message_code  === label_code  && parseInt(element.lang_no)  === parseInt(lang_no)){
                description = element.message_desc
            }
        });
        let holder;
        langTables.forEach(element => {
            if(element.label_code  === placeholder  && parseInt(element.lang_no)  === parseInt(lang_no)){
                holder = element.label_desc
            }
        });

        description = description.replace(/#[1-9]/g, holder)
    }
    return description; 
}

export const storeLocally = (itemName,value) => {
    if(typeof(value) === "object"){
        localStorage.setItem(itemName, JSON.stringify(value));
    }else{
        localStorage.setItem(itemName, value);
    }
    const storeTime = new Date().getTime();
    localStorage.setItem(`${itemName}_storeTime`, storeTime);
    return storeTime;
}  

export const isExpire = (itemName, expireTime) => {
    const currentTime = new Date().getTime();
    const storeTime = parseInt(localStorage.getItem(`${itemName}_storeTime`))
    const remainTime = currentTime - storeTime;
    return remainTime >= expireTime
}

export const updateState = (oldState, updateObject) => {
    return {
        ...oldState,
        ...updateObject
    }
}

export const doubleItems = (array) =>{
    let finalArr = [];
    if(array.length % 2 === 0){
        for(let i = 0; i < array.length; i=i+2){
            const doubleArr = [array[i] , array[i+1]];
            finalArr.push(doubleArr)
        }
    }else{
        for(let i = 0; i < array.length; i=i+2){
            const doubleArr = [array[i] , array[i+1]];
            finalArr.push(doubleArr)
        }
        const lastItem = finalArr[finalArr.length-1]
        lastItem.pop()
    }
    return finalArr;
}




export const displayPattren = (fields, changeHandler, iconClick) => {
    let fieldsArr = [];
        for(let key in fields){
            let fieldobj = {
                id: key,
                ...fields[key]
            }
            fieldsArr.push(fieldobj);
        }

        const doubleArr = doubleItems(fieldsArr);

        const tapContent = doubleArr.map(ele => {
            const item1 =ele[0];
            const item2 = ele[1];
            let content = null;
        if(item2){
            content = (
                <Aux>
                    <div className="col-md-6">
                    <Input
                        placeholder={item1.placeholder}
                        value={item1.value}
                        inputType={item1.inputType}
                        label={item1.label}
                        config={item1.config}
                        options={item1.options}
                        changed={(event) => changeHandler(event, item1.config.id)}
                        readOnly={item1.readOnly}
                        validitiy={item1.valid}
                        touched={item1.touched}
                        button={item1.button}
                        iconClick={event => iconClick(event, item1.config.id)}
                    />
                </div>
                <div className="col-md-6">
                <Input
                        placeholder={item2.placeholder}
                        value={item2.value}
                        inputType={item2.inputType}
                        label={item2.label}
                        config={item2.config}
                        options={item2.options}
                        changed={(event) => changeHandler(event, item2.config.id)}
                        readOnly={item2.readOnly}
                        validitiy={item2.valid}
                        touched={item2.touched}
                        button={item2.button}
                        iconClick={event => iconClick(event, item2.config.id)}
                    />
                </div>
            </Aux>
            )
        }else{
            content = (
                <Aux>
                    <div className="col-md-6">
                        <Input 
                            placeholder={item1.placeholder}
                            value={item1.value}
                            inputType={item1.inputType}
                            label={item1.label}
                            config={item1.config}
                            options={item1.options}
                            changed={(event) => changeHandler(event, item1.config.id)}
                            readOnly={item1.readOnly}
                            validitiy={item1.valid}
                            touched={item1.touched}
                            button={item1.button}
                            iconClick={event => iconClick(event, item1.config.id)}

                        />
                    </div>
                    <div className="col-md-6"></div>
                </Aux>
            )
        }

            return (
                <div key={item1.id} className="row">
                    { content}
                </div>
            )
        })
        return tapContent;
}

export const getTreeStructure = (treeArr) => {
    const ordereList = (list) => {
        const listColne = [...list]
        if(!listColne.length > 0){
            return listColne
        }else{
            let  orderedList = []
            let isOrdered = false;
            while(!isOrdered){
                let smallest = listColne[0];
                listColne.forEach(ele => {
                    if(smallest.form_order > ele.form_order){
                        smallest = ele
                    }
                })
                orderedList.push(smallest);
                if(listColne.length > 1) {
                    listColne.splice(listColne.indexOf(smallest),1)
                }else{
                    isOrdered = true
                }
            }
            return orderedList;
        }
    }
    const getChildren = (parentId, WholetreeArr) => {
        let children = []
        WholetreeArr.forEach(ele => {
            if(ele.parent_form === parentId){
                children.push(ele)
            }
        })
        return ordereList(children);
    }

    let rootArr = []
    treeArr.forEach((ele) => {
        if(ele.parent_form === 0 && ele.main){
            rootArr.push(ele)
        }
    })
    rootArr = ordereList(rootArr)
    let updateParentArr = []
    rootArr.forEach(ele => { 
        if(ele.main){
            ele.children = getChildren(ele.form_no, treeArr)
            updateParentArr.push(ele)
        }
    })


    let hasChildren = true

    updateParentArr.forEach(ele => {
        ele.children.forEach(element => {
            if(element.main){
                element.children = getChildren(element.form_no, treeArr) 
            }else{
                hasChildren = false
            }
        })
    })
  

    if(hasChildren){
        updateParentArr.forEach(ele => {
            ele.children.forEach(element => {
                element.children.forEach(element1 => {
                    if(element1.main){
                        element1.children = getChildren(element1.form_no, treeArr) 
                    }else{
                        hasChildren = false
                    }
                })
            })
        })
    }


    if(hasChildren){
        updateParentArr.forEach(ele => {
            ele.children.forEach(element => {
                element.children.forEach(element1 => {
                    element1.children.forEach(element2 => {
                        if(element2.main){
                            element2.children = getChildren(element2.form_no, treeArr) 
                        }else{
                            hasChildren = false
                        }
                    })
                })
            })
        })
    }

    return updateParentArr;
}

export const iconMap = [
    {
        form_no: 1,
        icon: faWindowRestore
    },
    {
        form_no: 2,
        icon: faMoneyBillWave
    },
    {
        form_no: 21,
        icon: faUserCog
    },
    {
        form_no: 2101,
        icon: faFileInvoice
    },
    {
        form_no: 22,
        icon: faFolderPlus
    },
    {
        form_no: 23,
        icon: faHandshake
    },
    {
        form_no: 24,
        icon: faFlag
    },
    {
        form_no: 3,
        icon: faWarehouse
    },
    {
        form_no: 31,
        icon: faUserCog
    },{
        form_no: 32,
        icon: faFolderPlus
    },{
        form_no: 33,
        icon: faHandshake
    },{
        form_no: 34,
        icon: faFlag
    },
    {
        form_no: 4,
        icon: faMoneyCheckAlt
    },{
        form_no: 41,
        icon: faUserCog
    },{
        form_no: 42,
        icon: faFolderPlus
    },{
        form_no: 43,
        icon: faHandshake
    },{
        form_no: 44,
        icon: faFlag
    },
    {
        form_no: 5,
        icon: faHandHoldingUsd
    },{
        form_no: 51,
        icon: faUserCog
    },{
        form_no: 52,
        icon: faFolderPlus
    },{
        form_no: 53,
        icon: faHandshake
    },{
        form_no: 54,
        icon: faFlag
    },
    {
        form_no: 99,
        icon: faUserCog
    },
    {
        form_no: 9901,
        icon: faTags
    },
    {
        form_no: 9902,
        icon: faCommentAlt
    },
    {
        form_no: 9903,
        icon: faWpforms
    },
    {
        form_no: 9904,
        icon: faCubes
    },
    {
        form_no: 9905,
        icon: faLanguage
    },

    {
        form_no: 11,
        icon: faUserShield
    },
    {
        form_no: 1101,
        icon: faUsers
    },
    {
        form_no: 1102,
        icon: faDatabase
    },
    {
        form_no: 1110,
        icon: faShieldAlt
    },
    {
        form_no: 12,
        icon: faRetweet
    },
    {
        form_no: 13,
        icon: faCogs
    },
    {
        form_no: 131,
        icon: faAtlas
    },
]

export const getRelatedIcon = (form_no, iconMap) => {
    let relatedIcon = faFile;
    iconMap.forEach(ele => {
        if(ele.form_no  === form_no){
            relatedIcon = ele.icon
        }
    })
    return relatedIcon;
}

export const getRelatedRoute = (form_no, routeMap) => {
    let relatedRoute = null;
    routeMap.forEach(ele => {
        if(ele.form_no  === form_no){
            relatedRoute = ele.route
        }
    })
    if(relatedRoute === ""){
        return null;
    }else{
        return relatedRoute;
    }
}


export const treehandler = (event) => {
    let Element = null;
    event.nativeEvent.path.forEach(ele => {
        if(ele.tagName === "LI"){
            Element = ele;
        }
    })
    const children = Element.nextElementSibling;
    if(children){
        if(children.classList.contains("d-none")){
            children.classList.remove("d-none")
            children.classList.add("d-block")
        }else if(children.classList.contains("d-block")){
            children.classList.remove("d-block")
            children.classList.add("d-none")
        }
    }
}

export const routeMap = [
    {
        form_no: 1,
        route: ""
    },
    {
        form_no: 2,
        route: ""
    },
    {
        form_no: 21,
        route: ""
    },
    {
        form_no: 2101,
        route: ""
    },
    {
        form_no: 22,
        route: ""
    },
    {
        form_no: 23,
        route: ""
    },
    {
        form_no: 24,
        route: ""
    },
    {
        form_no: 3,
        route: ""
    },
    {
        form_no: 31,
        route: ""
    },{
        form_no: 32,
        route: ""
    },{
        form_no: 33,
        route: ""
    },{
        form_no: 34,
        route: ""
    },
    {
        form_no: 4,
        route: ""
    },{
        form_no: 41,
        route: ""
    },{
        form_no: 42,
        route: ""
    },{
        form_no: 43,
        route: ""
    },{
        form_no: 44,
        route: ""
    },
    {
        form_no: 5,
        route: ""
    },{
        form_no: 51,
        route: ""
    },{
        form_no: 52,
        route: ""
    },{
        form_no: 53,
        route: ""
    },{
        form_no: 54,
        route: ""
    },
    {
        form_no: 99,
        route: ""
    },
    {
        form_no: 9901,
        route: "internal-coding?key=label"
    },
    {
        form_no: 9902,
        route: "internal-coding?key=message"
    },
    {
        form_no: 9903,
        route: "internal-coding?key=forms"
    },
    {
        form_no: 9904,
        route: "internal-coding?key=modules"
    },
    {
        form_no: 9905,
        route: "internal-coding?key=language"
    },

    {
        form_no: 11,
        route: ""
    },
    {
        form_no: 1101,
        route: ""
    },
    {
        form_no: 1102,
        route: ""
    },
    {
        form_no: 1110,
        route: ""
    },
    {
        form_no: 12,
        route: ""
    },
    {
        form_no: 13,
        route: ""
    },
    {
        form_no: 131,
        route: ""
    },
]

export const getParam = (searchParam) => {
    const string = searchParam.replace("?key=", "");
    return string
}

export const fillRow = (fields, row) => { 
    const fieldsClone = {...fields};
    if(row === ""){
        for(let i in fieldsClone){
            fieldsClone[i].value = ""
        }
    }else{
        for(let i in fieldsClone){
            fieldsClone[i].value = row[i]
        }
    }
    return fieldsClone;
}

export const openFields = (fields, mode, except) =>{
    const fieldsClone = {...fields};
    if(mode){
        for(let i in fieldsClone){
            fieldsClone[i].readOnly = false
        }
        if(except){
            fieldsClone[except].readOnly = true
        } 
    }else{
        for(let i in fieldsClone){
            fieldsClone[i].readOnly = true
        }
    }   

    return fieldsClone;
}

export const closeRow = (fields) =>{
    const fieldsClone = {...fields};
    for(let i in fieldsClone){
        fieldsClone[i].value = ""
        fieldsClone[i].readOnly = true
    }
    return fieldsClone;
}


export const validityCheck = (value, rule) => {
    let isValid = true
    if(rule.requiered){
        isValid = value.trim() !== "" && isValid; 
    }
    if(rule.length){
        isValid = parseInt( value.length) <=  parseInt(rule.length) && isValid;
    }
    return isValid
}

export const decideLanguageName = (languages, input)=> {
    let name = "" 
    languages.forEach(lan => {
        if(parseInt(input) === parseInt(lan.lang_no)){
            name = lan.lang_name
        }
    })
    return name
}

export const resetValidation = (fields) => {
    const fieldsClone = {...fields};
     for(let i in fieldsClone){
        fieldsClone[i].valid = false
        fieldsClone[i].touched = false
    }
    return fieldsClone
}