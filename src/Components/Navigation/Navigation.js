import React, { PureComponent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faEllipsisH,
  faSignInAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "@mui/material";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import style from "./Navigation.module.scss";
import { logout } from "../../Context";
import LangSelector from "./LangSelector/LangSelector";
import BreadcrumbConstructor from "./BreadcrumbConstructor/BreadcrumbConstructor";
import { t } from "../../Languages/languages";

class Navigation extends PureComponent {
  render() {
    const { listIconClicked, location, SideTreeMobViewHandler, logout } =
      this.props;
    return (
      <nav className={[style.Nav].join(" ")}>
        <div className="d-flex ">
          <i className={style.sideBarIcon}>
            <FontAwesomeIcon onClick={SideTreeMobViewHandler} icon={faBars} />
          </i>
          <BreadcrumbConstructor location={location} />
        </div>

        <i className={style.ListIcon} onClick={listIconClicked}>
          <FontAwesomeIcon icon={faEllipsisH} />
        </i>
        <div className={style.navItems}>
          <div className={style.langSelector}>
            <LangSelector />
          </div>

          <Tooltip enterDelay={800} title={t("logout")}>
            <div>
              {" "}
              <i>
                {" "}
                <FontAwesomeIcon onClick={logout} icon={faSignInAlt} />
              </i>
            </div>
          </Tooltip>
        </div>
      </nav>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
});

export default connect(null, mapDispatchToProps)(withRouter(Navigation));
