import { Component } from "react";
import { displayPattren } from "../../../../utilities/display";

import { connect } from "react-redux";

class UsersGroups extends Component {
    state={
        fields:{
            group_num:{
                inputType: "input",
                label: "Group number",
                config: {
                    id: "group_num",
                    type:"number",
                    placeholder: "Group Number"
                },
                value: ""
            },
            empty1:{inputType:"empty"},   
            group_name:{
                inputType: "input",
                label: "Group name",
                config: {
                    id: "group_name",
                    type:"text",
                    placeholder: "Group name"
                },
                value: ""
            },
            foriegn_name:{
                inputType: "input",
                label: "Foriegn name",
                config: {
                    id: "foriegn_name",
                    type:"text",
                    placeholder: "Foriegn name"
                },
                value: ""
            },  
            system_management:{
                inputType: "checkbox",
                label: "System management",
                config: {
                    id: "system_management",
                    type:"checkbox",
                },
                value: ""
            },
            
        }
    }
  
    render(){
        const tapContent = displayPattren(this.state.fields); 
        return tapContent;
    }
}

const mapStateToProps = state => {
    return {
        lanState: state.lan,
        lanTable: state.langTables
    }
}

const mapDispatchToProps = dispatch => {
    return {
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersGroups);

