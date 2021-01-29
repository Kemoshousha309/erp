import React, { Component } from "react";
import LanSelect from "./LanSelect/LanSelect";
import style from "./Navigation.module.scss";
import user from "../../assests/user.jpeg"
import DropDown from "../UI/DrobDown/DrobDown";
import Aux from "../../hoc/Aux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faBell, faEnvelope } from "@fortawesome/free-regular-svg-icons";
import {faBars, faEllipsisH} from "@fortawesome/free-solid-svg-icons";
import UserInfo from "../UserInfo/UserInfo";
class Navigation extends Component {
    state = {
        dateShow: false,
        notificationShow: false,
        messageShow: false,
        userShow: false
    }
    componentDidUpdate(){
        console.log("Navigation Updated")
    }
    shouldComponentUpdate(nextProps, nextState){
        return (
            this.state.dateShow !== nextState.dateShow ||
            this.state.notificationShow !== nextState.notificationShow ||
            this.state.messageShow !== nextState.messageShow ||
            this.state.userShow !== nextState.userShow
        )
    }
    dateShowHandler = () => {
        const current = this.state.dateShow;
        this.setState({
        dateShow: !current,
        notificationShow: false,
        messageShow: false
    })
    }
    userShowHandler = () => {
        const current = this.state.userShow;
        this.setState({
        userShow: !current,
        dateShow: false,
        notificationShow: false,
        messageShow: false
    })
    }
    notificationShowHandler = () =>{
        const current = this.state.notificationShow;
        this.setState({
        dateShow: false,
        notificationShow: !current,
        messageShow: false
    }) 
    }
    messageShowHandler = () =>{
        const current = this.state.messageShow;
        this.setState({
        dateShow: false,
        notificationShow: false,
        messageShow: !current
    }) 
    }
    render(){
        const year = new Date().getFullYear();
        const month = new Date().getMonth();
        const day =  new Date().getDate();
        const date = ` ${year} / ${month + 1} / ${day}`;
        return(
            <Aux>
            <nav className={[style.Nav].join(" ")}>
                <div>
                    
                    <i  className={style.sideBarIcon} >
                        <FontAwesomeIcon onClick={this.props.SideTreeMobViewHandler} icon={faBars} />
                    </i>
                </div>
                <i className={ style.ListIcon} onClick={this.props.listIconClicked} >
                    <FontAwesomeIcon icon={faEllipsisH} />
                </i>
                <div className={style.navitems}>

                    <div>
                    <span className={style.date}> 
                    <i>
                    <FontAwesomeIcon onClick={this.dateShowHandler} icon={faCalendarAlt} />
                    </i>      
                        {year}
                        <DropDown
                        show={this.state.dateShow}
                        close={this.dateShowHandler} 
                        position={{top:"100"}}
                        >{date}</DropDown> 
                    </span>
                    </div>
                    <div>
                        <i> <FontAwesomeIcon onClick={this.notificationShowHandler} icon={faBell} /></i>
                    <DropDown 
                        show={this.state.notificationShow} 
                        position={{top: "5%"}}
                        close={this.notificationShowHandler} 
                    >Some notifictaion</DropDown>
                    </div>

                    <div>
                    <i> <FontAwesomeIcon onClick={this.messageShowHandler} icon={faEnvelope} /></i>
                   
                    <DropDown 
                        show={this.state.messageShow}
                        position={{top: "5%"}}
                        close={this.messageShowHandler} 
                    >some messages</DropDown>
                    </div>

                    <div>
                    <img onClick={this.userShowHandler} alt="user" src={user}></img>
                    <DropDown 
                        show={this.state.userShow}
                        position={{top: "5%"}}
                        close={this.userShowHandler} 
                    >
                        <UserInfo />
                    </DropDown>
                    </div>
                    <LanSelect />
                </div>
            </nav>
            </Aux>
        )
    }
} 
export default Navigation; 