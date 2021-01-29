import React from 'react';
import Aux from '../../../hoc/Aux';
import Backdrop from '../Backdrop/Backdrop';
import style from "./DrobDown.module.scss";
import {connect} from "react-redux"

const DropDown = props => {
    let transformStyle = {
        transform: "translateX(-5rem)"
    }
    if(parseInt(props.lanState) === 1){
        transformStyle.transform = "translateX(5rem)"
    }
    let dropStyle= {
        opacity: "0",
        visibility: "hidden",
        ...transformStyle,
        ...props.position,
        display: 'none'
    }
    if(props.show){
        dropStyle.opacity = "1"
       dropStyle.visibility = "visible"
       dropStyle.display = "block"
    }
    return(
        <Aux>
            <Backdrop show={props.show} click={props.close} opacity="0"/>
            <div style={dropStyle} className={style.DrobDown}>
                {props.children}
            </div>
        </Aux>
    )
}

const mapStateToProps = state => {
    return {
        lanState: state.lang.lan,
    }
  }
  

export default connect(mapStateToProps)(DropDown);