import React, { PureComponent } from "react";
import Navigation from "../../Components/Navigation/Navigation";
import SideTree from "../../Components/SideTree/SideTree";
import MainScreen from "../MainScreen/MainScreen";
import { connect } from "react-redux";
import Spinner from "../../Components/UI/Spinner/Spinner";
import style from "./Layout.module.scss";
import SideTreeMobView from "../../Components/SideTree/SideTreeMobView/SideTreeMobView";
import { checkAuthLocalStorage } from "../../Context";
import LogoutPage from "../../Components/UI/LogoutPage/LogoutPage";
import ErrorBoundary from "../../Error/ErrorBoundary";

class Layout extends PureComponent {
  state = {
    sideNavActivity: false,
    mobileNav: false, // to handle the responsive design
    SideTreeMobView: false,
  };
  sideNavHandler = () => {
    const current = this.state.sideNavActivity;
    this.setState({ sideNavActivity: !current });
  };

  mobileNavHandler = () => {
    const current = this.state.mobileNav;
    this.setState({ mobileNav: !current });
  };
  SideTreeMobViewHandler = () => {
    const current = this.state.SideTreeMobView;
    this.setState({ SideTreeMobView: !current });
  };
  componentDidMount() {
    this.props.checkAuth();
  }

  render() {
    let layout;
    if (this.props.langLoading && this.props.languages) {
      if (this.props.langTable) {
        layout = (
          <>
            <div className={style.container}>
              {this.state.SideTreeMobView ? (
                <SideTreeMobView
                  SideTreeMobView={this.state.SideTreeMobView}
                  clicked={this.SideTreeMobViewHandler}
                />
              ) : null}
              {!this.state.SideTreeMobView ? (
                <SideTree
                  {...this.props}
                  sideNavActivity={this.state.sideNavActivity}
                  sideNavClick={this.sideNavHandler}
                  SideTreeMobViewHandler={this.SideTreeMobViewHandler}
                />
              ) : null}
              <div className={style.right}>
                <div className={style.navContainer}>
                  <Navigation
                    sideNavClick={this.sideNavHandler}
                    listIconClicked={this.mobileNavHandler}
                    SideTreeMobViewHandler={this.SideTreeMobViewHandler}
                  />
                </div>
                <div className={style.screenContainer}>
                  <ErrorBoundary>
                    <MainScreen {...this.props} />
                  </ErrorBoundary>
                </div>
              </div>
            </div>
          </>
        );
      } else {
        layout = (
          <h1>
            Something went wrong, please check out you network connection and
            try again . . .
          </h1>
        );
      }
    } else {
      layout = (
        <div className={style.center}>
          <Spinner color=" #222831" />
        </div>
      );
    }
    if (!this.props.isAuthed) {
      layout = <LogoutPage {...this.props} />;
    }
    return layout;
  }
}

const mapStateToProps = (state) => {
  return {
    lanState: state.lang.lan,
    langTable: state.lang.langTables,
    langLoading: state.lang.langLoading,
    isAuthed: !(state.auth.authData == null),
    languages: state.lang.langInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkAuth: () => dispatch(checkAuthLocalStorage()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
