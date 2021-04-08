import style from "./App.module.scss";
import Layout from "./Contianers/Layout/Layout";
import {connect} from "react-redux";
import { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./Contianers/Login/Login";
import { checkLabelesLocalStorage} from "./store";
import {Redirect} from "react-router";
import { createMuiTheme, ThemeProvider, jssPreset, StylesProvider } from '@material-ui/core/styles';
import { create } from 'jss';
import rtl from 'jss-rtl';

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });



  

class App extends Component  {
  componentDidMount = () => {
    this.props.onLoadApp()
}
  render() {
     
    let dir = "ltr";
    let appLangState;
    if(parseInt(this.props.lanState) === 1){
      dir = "rtl"
      appLangState = style.rtl
    }else{
      appLangState = style.ltr
    }

    const theme = createMuiTheme({
      direction: dir,
      typography: {
      fontSize:  28,
    },
    });

    const app = (
      <div  className={appLangState}>
        <Switch>
          <Route path="/erp"  component={Layout} />
          <Route path="/login" exact  component={Login} />
          <Redirect from="/" exact to="erp" />
        </Switch>
        </div>
    )
    return (  
      <BrowserRouter>
      <ThemeProvider theme={theme}>
        <StylesProvider jss={jss}>
        {app}
        </StylesProvider>
        </ThemeProvider>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
      lanState: state.lang.lan,
  }
}

const mapDispatchToProps = dispatch => {
  return {
     onLoadApp: () => dispatch(checkLabelesLocalStorage())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
