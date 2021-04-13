import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React from "react";


const StatusBar = props => {

    return(
        <Snackbar open={props.show} autoHideDuration={6000} >
            <Alert severity={props.type}>
                 {props.children}
            </Alert>
        </Snackbar>      
    )
}

export default StatusBar;

