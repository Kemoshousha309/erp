import React from "react";
import style from "./SideTreeMobView.module.scss";
import logo from "../../../assests/logo.png"
import Backdrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../hoc/Aux";
import Tree from "../Tree/Tree";


const SideTreeMobView = props => {
    let display;
    display = props.SideTreeMobView ? "block" : "none";
    return(
        <Aux>
            <Backdrop show={props.SideTreeMobView} click={props.clicked} />
        <div style={{display: display}} className={style.SideTreeMobView}>
            <div >
                <span>
                    <img className={style.sideImgLogo} alt='logo' src={logo}></img>
                    Experts Vision
                </span> 
                <Tree sideNavActivity={props.SideTreeMobView} />
            </div>
        </div>
        </Aux>
    )
}

export default SideTreeMobView;