import React from "react";
import style from "./Logo.module.scss";
import logo from "../../assests/logo.png";
import Aux from "../../hoc/Aux"

const Logo = props => {
    // console.log("Logo render")
    return(
        <Aux>
            <div className={style.Logo}>
                <img src={logo} alt="logo"></img> 
                <p>Experts Vision</p>
            </div>
            
        </Aux>
    )
}

export default Logo;
