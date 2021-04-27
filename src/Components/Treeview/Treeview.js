import React, { Component } from "react";
import {connect} from "react-redux"
import style from "./Treeview.module.scss";
import {getRelatedIcon, iconMap, getRelatedRoute, routeMap } from "../../utilities/tree";
import { CircularProgress } from "@material-ui/core";
import TreeNode from "./TreeNode/TreeNode";


class Treeview extends Component {
 
    componentDidUpdate () {
    }
    render() {        
        let treeContent = <CircularProgress  className="m-5" /> 
        if(this.props.tree){
            const tree = this.props.tree.map(ele => {
                const icon = getRelatedIcon(ele.form_no, iconMap);
                const route = getRelatedRoute(ele.form_no, routeMap)
                if(ele.children && ele.children.length > 0){
                    return <TreeNode 
                    thisK={this.props.thisK}
                    {...this.props}
                    route={route}
                    lang={this.props.lanState}
                     sideNavClick={this.props.sideNavClick}
                     sideNavActivity={this.props.sideNavActivity} 
                     key={ele.form_no} 
                     icon={icon} 
                     config={ele} 
                     children={ele.children} />
                }
                return null
            })
            treeContent = (
                <ul className={style.tree}>
                    {tree}
                </ul>
            )
        }           
        
        return (
            <div className={style.treeContianer}>
                {treeContent}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        lanState: state.lang.lan,
        isAuthed: !(state.auth.authData == null),
    }
}


export default connect(mapStateToProps,null)(Treeview);


