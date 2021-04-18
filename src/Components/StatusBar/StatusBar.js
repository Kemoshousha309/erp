import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React from "react";
import { connect } from "react-redux";


const StatusBar = props => {
    const position = {
        position: "absolute",
        bottom: "3.5rem",
        right: "50%",
        transform: "translateX(-50%)",
        width: "fit-content"
    }
    if(parseInt(props.lanState) === 1){
        position.transform = "translateX(50%)"
    }
    return(
        <Snackbar open={props.show} style={position} autoHideDuration={6000} >
            <Alert severity={props.type}>
                 {props.children}
            </Alert>
        </Snackbar>      
    )
}

const mapStateToProps = state => {
    return {
        lanState: state.lang.lan,
        lanTable: state.lang.langTables,
        token: state.auth.authData.token,
        languages: state.lang.langInfo
    }
}

export default connect(mapStateToProps, null)(StatusBar);