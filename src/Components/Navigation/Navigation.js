import React, { Component } from "react";
import LanSelect from "./LanSelect/LanSelect";
import style from "./Navigation.module.scss";
import user from "../../assests/user.jpeg"
import DropDown from "../UI/DrobDown/DrobDown";
import Aux from "../../hoc/Aux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faBell, faEnvelope } from "@fortawesome/free-regular-svg-icons";
import {faBars, faEllipsisH, faSignInAlt} from "@fortawesome/free-solid-svg-icons";
import UserInfo from "../UserInfo/UserInfo";
import Avatar from '@material-ui/core/Avatar';
import { Tooltip } from "@material-ui/core";
import { logout } from "../../store";
import {connect} from "react-redux"
import {t} from "../../utilities"
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
                    <Tooltip enterDelay={800} title="placeholder">
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
                    </Tooltip>

                    <Tooltip enterDelay={800} title="placeholder">
                        <div>
                            <i> <FontAwesomeIcon onClick={this.notificationShowHandler} icon={faBell} /></i>
                                <DropDown 
                                    show={this.state.notificationShow} 
                                    position={{top: "5%"}}
                                    close={this.notificationShowHandler} 
                                >Some notifictaion</DropDown>
                        </div>
                    </Tooltip>

                    <Tooltip enterDelay={800} title="placeholder">
                        <div>
                            <i> <FontAwesomeIcon onClick={this.messageShowHandler} icon={faEnvelope} /></i>
                                <DropDown 
                                    show={this.state.messageShow}
                                    position={{top: "5%"}}
                                    close={this.messageShowHandler} 
                                >some messages</DropDown>
                        </div>
                    </Tooltip>

                    <Tooltip enterDelay={800} title="placeholder">
                        <div>
                        <Avatar onClick={this.userShowHandler} alt="user" src={user}></Avatar>
                            <DropDown 
                                show={this.state.userShow}
                                position={{top: "5%"}}
                                close={this.userShowHandler} 
                            >
                                <UserInfo />
                            </DropDown>
                        </div>
                    </Tooltip>

                    <LanSelect />

                    <Tooltip enterDelay={800} title={t("logout", this.props.lanTable, this.props.lanState)}>
                        <div> <i> <FontAwesomeIcon onClick={this.props.logout} icon={faSignInAlt} /></i></div>
                    </Tooltip>
                </div>
            </nav>
            </Aux>
        )
    }
} 

const mapStateToProps = state => {
    return {
        lanState: state.lang.lan,
        lanTable: state.lang.langTables
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout())
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(Navigation); 