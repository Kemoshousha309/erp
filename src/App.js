import style from "./App.module.scss";
import Layout from "./Pages/Layout/Layout";
import { connect } from "react-redux";
import { Component } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import Login from "./Pages/Login/Login";
import { checkLabelesLocalStorage } from "./store";
import { Redirect } from "react-router";
import Modal from "./Components/UI/Modal/Modal";
import * as actionsTypes from "./store/actions/actionTypes";
import NetworkError from "./Error/NetworkError/NetworkError";
import { ThemeProvider } from "@mui/system";
import { getCssVar } from "./Helpers/styles";
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import { createTheme } from "@mui/material";

// Create rtl cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

function RTL(app) {
  return <CacheProvider value={cacheRtl}>{app}</CacheProvider>;
}

class App extends Component {
  componentDidMount = () => {
    this.props.onLoadApp();
  };
  render() {
    let dir = "ltr";
    let appLangState;
    if (parseInt(this.props.lanState) === 1) {
      dir = "rtl";
      appLangState = style.rtl;
    } else {
      appLangState = style.ltr;
    } 

    const theme = createTheme({
      direction: dir,
      palette: {
        primary: {
          main: getCssVar("--primaryColor")
        },
      },
      typography: {
        // 1 unit => .7px
        fontSize: 22, 
      },
    });

    const app = (
      <div className={appLangState} dir={dir} >
        
        {this.props.networkError ? (
          <Modal
            clicked={() => this.props.close_networkError()}
            show={this.props.networkError}
          >
            <NetworkError />
          </Modal>
        ) : null}
        <Switch>
          <Route path="/erp" component={Layout} />
          <Route path="/login" exact component={Login} />
          <Redirect from="/" exact to="erp" />
        </Switch>
      </div>
    );
    return (
      <HashRouter>
        <ThemeProvider theme={theme}>
          {dir === "rtl" ?  RTL(app): app}
        </ThemeProvider>
      </HashRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lanState: state.lang.lan,
    networkError: state.auth.network_error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLoadApp: () => dispatch(checkLabelesLocalStorage()),
    close_networkError: () =>
      dispatch({ type: actionsTypes.CLOSE_NETWORK_ERROR }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
