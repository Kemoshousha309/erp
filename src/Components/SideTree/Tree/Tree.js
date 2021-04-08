import React, { Component } from "react";
import {connect} from "react-redux"
import style from "./Tree.module.scss";
import {getRelatedIcon, iconMap, getRelatedRoute, routeMap } from "../../../utilities/tree";
import ParentNode from "./ParentNode/ParentNonde";
import { treeRequest } from "../../../store";
import Spinner from "../../UI/Spinner/Spinner";



class Tree extends Component {
    componentDidMount() {
        this.props.getTree();
    }
    
    componentDidUpdate(){
        // console.log("Tree Update")
    }
    render() {        
        const padding = this.props.sideNavActivity ? {padding: "2rem"} : {padding: "1rem"};
        let treeContent = this.props.sideNavActivity ? <Spinner color="wheat" /> : null
        if(this.props.tree){
            const tree = this.props.tree.map(ele => {
                const icon = getRelatedIcon(ele.form_no, iconMap);
                const route = getRelatedRoute(ele.form_no, routeMap)
                if(ele.children && ele.children.length > 1){
                    return <ParentNode 
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
                <ul style={padding} className={style.tree}>
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
        tree: state.auth.tree
    }
}
  
const mapDispatchToProps = dispatch => {
    return {
        getTree: () => dispatch(treeRequest())
    }
  }


export default connect(mapStateToProps,mapDispatchToProps)(Tree);


