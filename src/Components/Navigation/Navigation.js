import React, { PureComponent } from "react";
import style from "./Navigation.module.scss";
import Aux from "../../hoc/wrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faEllipsisH,
  faSignInAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "@mui/material";
import { logout } from "../../store";
import { connect } from "react-redux";
import { t } from "../../utilities/lang";
import LangSelector from "./LangSelector/LangSelector";
import BreadcrumbConstructor from "./BreadcrumbConstructor/BreadcrumbConstructor";
import { withRouter } from "react-router";

class Navigation extends PureComponent {
  render() {
    const {
      listIconClicked,
      lanTable,
      lanState,
      location,
      SideTreeMobViewHandler,
      logout,
    } = this.props;
    return (
      <Aux>
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
          <div className={style.navitems}>
            <div className={style.langSelector}>
              <LangSelector />
            </div>

            <Tooltip enterDelay={800} title={t("logout", lanTable, lanState)}>
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
