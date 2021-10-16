
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


const ordereList = (list) => {
    if(list.length <= 1){
      return list
    }
    const pivot = list[list.length - 1]
    const leftArr = []
    const rightArr = []
    for(const el of list.slice(0, list.length -1)){
      el.form_order > pivot.form_order ? rightArr.push(el) : leftArr.push(el)
    }
    return [...ordereList(leftArr), pivot, ...ordereList(rightArr)]
  } 


const getChildren = (parent, WholetreeArr) => {
    parent.children = []
    WholetreeArr.forEach(ele => {
        if(ele.parent_form === parent.form_no){
            parent.children.push(ele)
        }
    })
    parent.children = ordereList(parent.children)
    parent.children.forEach(child => {
        if(child.main){
            getChildren(child, WholetreeArr)
        }
    })
}

export const getTreeStructure = (treeArr) => {
    let rootParents = []
        treeArr.forEach((ele) => {
            if(ele.parent_form === 0 && ele.main){
                rootParents.push(ele)
            }
        })
    rootParents = ordereList(rootParents)
    rootParents.forEach(parent => {
        getChildren(parent, treeArr)
    })
    return rootParents
    
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


export const treehandler = (event, sideNavActivity) => {
    if(sideNavActivity){
        sideNavActivity()
    }
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
        form_no: 2102,
        route: "financial-coding?no=2102"
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
        route: "internal-coding?no=9901"
    },
    {
        form_no: 9902,
        route: "system-commands?no=9902"
    },
    {
        form_no: 9903,
        route: ""
    },
    {
        form_no: 9904,
        route: ""
    },
    {
        form_no: 9905,
        route: ""
    },

    {
        form_no: 11,
        route: ""
    },
    {
        form_no: 1101,
        route: "users-groups?no=1101"
    },
    {
        form_no: 1102,
        route: "users-data?no=1102"
    },
    {
        form_no: 1109,
        route: "input-previlleges?no=1109"
    },
    {
        form_no: 1110,
        route: "screen-previlleges?no=1110"
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
    {
        form_no: 1301,
        route: "geographical-data?no=1301"
    },
    {
        form_no: 1302,
        route: "companies-barnches?no=1302"
    },
    {
        form_no: 1304,
        route: "currency?no=1304"
    },
]


