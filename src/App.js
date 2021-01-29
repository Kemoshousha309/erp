import style from "./App.module.scss";
import Layout from "./Contianers/Layout/Layout";
import {connect} from "react-redux";
import { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./Contianers/Login/Login";
import { checkLabelesLocalStorage} from "./store";
import {Redirect} from "react-router"

class App extends Component  {
  componentDidMount = () => {
    this.props.onLoadApp()
}
  render() {
    let appLangState;
    if(parseInt(this.props.lanState) === 1){
      appLangState = style.rtl
    }else if(parseInt(this.props.lanState) === 2){
      appLangState = style.ltr
    }
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
        {app}
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
      lanState: state.lang.lan,
      langTable: state.lang.langTables,
      langLoading: state.lang.langLoading
  }
}

const mapDispatchToProps = dispatch => {
  return {
     onLoadApp: () => dispatch(checkLabelesLocalStorage())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
