import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React from "react";
import style from "./StatusBar.module.scss";


const StatusBar = props => {
    // console.log("StatusBar render")
    const show = props.show ? style.show : style.hidden
    const classes = [style.statusContainer, style.success, show].join(' ');
    return(
        <Snackbar open={props.show} autoHideDuration={6000} >
            <Alert severity={props.type}>
                 {props.children}
            </Alert>
        </Snackbar>      
    )
}

export default StatusBar;

// lagcy status Bar
// <div className={classes}>
//       <div className={style.content}>
//             {props.children}
//         </div>
//         <div className={style.statusColor}></div>
//     </div>