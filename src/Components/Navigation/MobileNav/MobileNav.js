import React, { Component } from "react";
import LanSelect from "../../Navigation/LanSelect/LanSelect";
import style from "./MobileNav.module.scss";
import user from "../../../assests/user.jpeg";
import DropDown from "../../UI/DrobDown/DrobDown";

class MobileNav extends Component {
    state = {
        dateShow: false,
        notificationShow: false,
        messageShow: false,
        userShow: false
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
    componentDidUpdate(){
        // console.log("MobileNav Updated // optimized")
    }
    shouldComponentUpdate(nextProps, nextState){
        return nextProps.show !== this.props.show
    }
    render(){
        const year = new Date().getFullYear();
        const month = new Date().getMonth();
        const day =  new Date().getDate();
        const date = `${year} / ${month + 1} / ${day}`;
        return(
            <div className={style.navitems}>
                <div>
                    <div className={style.mobileNav}>
                        <img src={user} alt="user" ></img>
                        <div className={style.mobileNotification}>
                            <div>
                                <i onClick={this.notificationShowHandler} className="far fa-bell"></i>
                                <DropDown 
                                    show={this.state.notificationShow} 
                                    position={{top: "27%"}}
                                    close={this.notificationShowHandler} 
                                >Some notifictaion notifictaionnot ifictaionnoti fictaio nnoti fictaionnotifictaion</DropDown>
                            </div>

                            <div>
                                <i onClick={this.messageShowHandler} className="far fa-envelope"></i>
                                <DropDown 
                                    show={this.state.messageShow}
                                    position={{top: "27%"}}
                                    close={this.messageShowHandler} 
                                >some messages</DropDown>
                            </div>
                        </div>
                    </div>
                    <ul>
                        <li>user name: pedri</li>
                        <li>branch: barca</li>
                    </ul>
                </div>
                <span> <i className="fa fa-calendar-alt"></i><span> {date}</span></span>
                <LanSelect />
            </div>

        )
    }
} 
export default MobileNav; 