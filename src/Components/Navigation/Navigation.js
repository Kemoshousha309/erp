import React, { PureComponent } from "react";
import style from "./Navigation.module.scss";
import user from "../../assests/user.jpeg";
import DropDown from "../UI/DrobDown/DrobDown";
import Aux from "../../hoc/wrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faBell,
  faEnvelope,
} from "@fortawesome/free-regular-svg-icons";
import {
  faBars,
  faEllipsisH,
  faSignInAlt,
} from "@fortawesome/free-solid-svg-icons";
import UserInfo from "../UserInfo/UserInfo";
import Avatar from "@material-ui/core/Avatar";
import { Tooltip } from "@material-ui/core";
import { logout } from "../../store";
import { connect } from "react-redux";
import { t } from "../../utilities/lang";
import { date } from "../../utilities/date";
import LangSelector from "./LangSelector/LangSelector";
import BreadcrumbConstructor from "./BreadcrumbConstructor/BreadcrumbConstructor";
import { withRouter } from "react-router";

class Navigation extends PureComponent {
  state = {
    dateShow: false,
    notificationShow: false,
    messageShow: false,
    userShow: false,
  };

  dateShowHandler = () => {
    const current = this.state.dateShow;
    this.setState({
      dateShow: !current,
      notificationShow: false,
      messageShow: false,
    });
  };
  userShowHandler = () => {
    const current = this.state.userShow;
    this.setState({
      userShow: !current,
      dateShow: false,
      notificationShow: false,
      messageShow: false,
    });
  };
  notificationShowHandler = () => {
    const current = this.state.notificationShow;
    this.setState({
      dateShow: false,
      notificationShow: !current,
      messageShow: false,
    });
  };
  messageShowHandler = () => {
    const current = this.state.messageShow;
    this.setState({
      dateShow: false,
      notificationShow: false,
      messageShow: !current,
    });
  };

  render() {
    const { listIconClicked, lanTable, lanState, location, SideTreeMobViewHandler, logout } = this.props;
    const { dateShow, notificationShow, messageShow, userShow } = this.state;
    const [d, y] = date();
    return (
      <Aux>
        <nav className={[style.Nav].join(" ")}>
          <div className="d-flex ">
            <i className={style.sideBarIcon}>
              <FontAwesomeIcon
                onClick={SideTreeMobViewHandler}
                icon={faBars}   
              />
            </i>
            <BreadcrumbConstructor location={location} />
          </div>

          <i className={style.ListIcon} onClick={listIconClicked}>
            <FontAwesomeIcon icon={faEllipsisH} />
          </i>
          <div className={style.navitems}>
            <div>
              <span className={style.date}>
                <i>
                  <FontAwesomeIcon
                    onClick={this.dateShowHandler}
                    icon={faCalendarAlt}
                  />
                </i>
                {y}

                <DropDown
                  show={dateShow}
                  close={this.dateShowHandler}
                  position={{ top: "100" }}
                >
                  {d}
                </DropDown>
              </span>
            </div>

            <div>
              <i>
                {" "}
                <FontAwesomeIcon
                  onClick={this.notificationShowHandler}
                  icon={faBell}
                />
              </i>
              <DropDown
                show={notificationShow}
                position={{ top: "5%" }}
                close={this.notificationShowHandler}
              >
                Some notifictaion
              </DropDown>
            </div>

            <div>
              <i>
                {" "}
                <FontAwesomeIcon
                  onClick={this.messageShowHandler}
                  icon={faEnvelope}
                />
              </i>
              <DropDown
                show={messageShow}
                position={{ top: "5%" }}
                close={this.messageShowHandler}
              >
                some messages
              </DropDown>
            </div>

            <div>
              <Avatar
                onClick={this.userShowHandler}
                alt="user"
                src={user}
              ></Avatar>
              <DropDown
                show={userShow}
                position={{ top: "5%" }}
                close={this.userShowHandler}
              >
                <UserInfo />
              </DropDown>
            </div>

            <LangSelector />

            <Tooltip enterDelay={800} title={t("logout", lanTable, lanState)}>
              <div>
                {" "}
                <i >
                  {" "}
                  <FontAwesomeIcon onClick={logout} icon={faSignInAlt} />
                </i>
              </div>
            </Tooltip>
          </div>
        </nav>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lanState: state.lang.lan,
    lanTable: state.lang.langTables,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Navigation));
