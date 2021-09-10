import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React from "react";
import { connect } from "react-redux";
import style from "./StatusBar.module.scss";


const StatusBar = props => {
    return(
            <Snackbar open={props.show} className={style.StatusBar} autoHideDuration={6000} >
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