import React from "react";
import style from "./TreeNode.module.scss"
import {getRelatedIcon, iconMap, treehandler, getRelatedRoute, routeMap} from "../../../utilities/tree"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Aux from "../../../hoc/Aux";



const TreeNode = props => {
    // console.log("ParentNode render")
    let children= null
    if(props.children){
         children = props.children.map(ele => {
            const icon = getRelatedIcon(ele.form_no, iconMap);
            const route = getRelatedRoute(ele.form_no, routeMap)
            if(ele.children && ele.children.length > 0 ){
                return <TreeNode 
                thisK={props.thisK}
                history={props.history}
                route={route}
                lang={props.lang}
                sideNavClick={props.sideNavClick}
                sideNavActivity={props.sideNavActivity} 
                key={ele.form_no}  
                icon={icon}  
                config={ele} 
                children={ele.children}/>
            }else{
                return <TreeNode 
                thisK={props.thisK}
                history={props.history}
                route={route}
                lang={props.lang}
                sideNavClick={props.sideNavClick}
                sideNavActivity={props.sideNavActivity} 
                key={ele.form_no} 
                icon={icon} 
                config={ele} />
            }
        })
    }

    const output = parseInt(props.lang) === 1 ?  props.config.form_d_name : props.config.form_f_name;    
    const itemContent= <i><FontAwesomeIcon icon={props.icon} />  {output} </i> 
    const itemClick = (e) => {
        props.thisK.recordClick(props.config, null)
        treehandler(e)
    }
    return(
        <Aux>
             <li className={style.itemNode} onClick={itemClick}>
                 {itemContent}
            </li>
             <ul className='d-none'>
              {children}
             </ul>
        </Aux>
    )
}




export default TreeNode;