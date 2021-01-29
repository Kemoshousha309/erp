import { Component } from "react";
import { displayPattren } from "../../../../utilities";
import { connect } from "react-redux";

class Users extends Component {
    state={
        fields:{
            user_num:{
                inputType: "input",
                label: "User number",
                config: {
                    id: "user_num",
                    type:"text",
                    placeholder: "User Number"
                },
                value: ""
            },
            empty1:{inputType:"empty"},
            user_name:{
                inputType: "input",
                label: "User name",
                config: {
                    id: "user_name",
                    type:"text",
                    placeholder: "User Name"
                },
                value: ""
            },
            foriegn_name:{
                inputType: "input",
                label: "Foriegn Name",
                config: {
                    id: "foriegn_name",
                    type:"text",
                    placeholder: "Foriegn Name"
                },
                value: ""
            },
            manger:{
                inputType: "input",
                label: "Manger",
                config: {
                    id: "manager",
                    type:"text",
                    placeholder: "Manager"
                },
                value: ""
            },
            group_num:{
                inputType: "input",
                label: "Group Number",
                config: {
                    id: "group_num",
                    type: "number",
                    placeholder: "Group Number"
                }
            },
            password:{
                inputType: "input",
                label: "Password",
                config: {
                    id: "password",
                    type: "password",
                    placeholder: "Enter password"
                }
            },
            passwordEnsure:{
                inputType: "input",
                label: "Confirm Password",
                config: {
                    id: "confirmpassword",
                    type: "password",
                    placeholder: "Enter password"
                }
            },
            copyPrivilegesUser:{
                inputType: "input",
                label: "copy privileges for user",
                config: {
                    id: "copyPrivilegesUser",
                    type: "number",
                    placeholder: "copy privileges for user"
                }
            },
            copyPrivilegesGroup:{
                inputType: "input",
                label: "copy privileges for groub",
                config: {
                    id: "copyPrivilegesGroup",
                    type: "number",
                    placeholder: "copy privileges for groub"
                }
            },
            empty2:{
                inputType: "empty"
            },
            empty3:{
                inputType: "empty"
            },
            empty4:{
                inputType: "empty"
            },
            empty5:{
                inputType: "empty"
            },
            empty6:{
                inputType: "empty"
            },
            empty7:{
                inputType: "empty"
            },
            empty8:{
                inputType: "empty"
            },
            inactive:{
                inputType: "checkbox",
                label: "inactive",
                config:{
                    id:"inactive",
                    type:"checkbox"
                }
            },
            empty9:{
                inputType: "empty"
            },
            inactiveDate:{
                inputType: "input",
                label: "inactive date",
                config: {
                    id:"inactiveDate"
                }
            },
            user:{
                inputType:"input",
                label: "user",
                config:{
                    id:"user"
                }
            },
            inactiveReason:{
                inputType: "textarea",
                label:"inactiveReason",
                config:{
                    id:"inactiveReason",
                }
            }
            
            
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

export default connect(mapStateToProps, mapDispatchToProps)(Users);

