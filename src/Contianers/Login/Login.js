import React, { Component } from "react";
import style from "./Login.module.scss";
import companyLogo from "../../assests/campanyLogoPlaceholder.png";
import LanSelect from "../../Components/Navigation/LanSelect/LanSelect"
import { connect } from "react-redux";
import Spinner from "../../Components/UI/Spinner/Spinner";
import { authRequest, langRequestFailure, storeLanguagesTable } from "../../store";
import {t} from "../../utilities/lang"
import Aux from "../../hoc/wrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faExclamationCircle} from "@fortawesome/free-solid-svg-icons"
import { Button, TextField } from "@material-ui/core";


class Login extends Component {
    state={
        user_no: "",
        password: ""
    }
    componentDidUpdate(){
        // console.log("Login Updated")
    }
    onChanageHandler = (event, identifier) => {
        const value = event.target.value;
        this.setState({[identifier]: value})
    }
    redirect = () => {
        if(this.props.isAuthed){
            this.props.history.push("/")
        }
    }
    onLoginClickHandler = (event) => {
        event.preventDefault()
        const authData = {
            user_id: this.state.user_no,
            password: this.state.password
        }
        this.props.onLoginClick(authData, this.redirect);
    }
    
    render() {
        
        const lagSelectStyle={
            margin: "0",
            width: "100%"
        }
        let errorMessage = null
        if(this.props.authError){
            if(parseInt(this.props.lanState) === 1){
                errorMessage = this.props.authError.ar
            }else{
                errorMessage = this.props.authError.en
            }
            if(this.props.authError === 503){
                errorMessage = "There is no network connection, please check out and try agian"
                if(parseInt(this.props.lanState) === 1){
                    errorMessage = "لا يوجد اتصال بالشبكه, الرجاء التحقق من الاتصال و المحاوله من جديد"
                }
                
            }
        }
        
        const errorNotify = (
            <Aux>
                <FontAwesomeIcon icon={faExclamationCircle} /> 
                <span>  {errorMessage}</span>
            </Aux>
        )
        let login;
        if(this.props.langLoading){
            if(this.props.langTable){
                login = (
                    <div className={style.loginFrom}>
                    <div className={style.side}>
                        <p >Experts Vision</p>-
                    </div>
                    <div className={style.formContent}>
                        <div >
                      
                        <img className={style.companyLogo} src={companyLogo} alt="customer logo" ></img>
                        </div>
                        <form onSubmit={this.onLoginClickHandler}>
                        <p style={{color: "red", fontSize: "1.9rem"}}> {errorMessage ? errorNotify : null}</p>
                            <div className="mb-4">
                                 <TextField 
                                    value={this.state.user_no}
                                    onChange={(event) => this.onChanageHandler(event,"user_no")}
                                    variant="standard" fullWidth 
                                    label={t("user_no", this.props.langTable, this.props.lanState)} />
                            </div>
                            <div className="mb-5">
                                 <TextField
                                    type="password"
                                    value={this.state.password}
                                    onChange={(event) => this.onChanageHandler( event,"password")}
                                    variant="standard" fullWidth 
                                    label={t("password", this.props.langTable, this.props.lanState)} />
                            </div>
                            <LanSelect style={lagSelectStyle} />
                            <Button 
                            type="submit"
                            variant="contained" 
                            color="primary"
                            style={
                                parseInt(this.props.lanState) === 1 ?
                                {left: "2rem"} : {right: "2rem"}
                            }
                            >{t("login",this.props.langTable, this.props.lanState )}</Button>
                        </form>
                    </div>
                </div>
                    )
            }else{
                login = <h1>Something went wrong, please check out you network connection and try agian . . .</h1>
            }
        }else{
            login = <div className={style.center}><Spinner color=" #3F51B5" /></div>;
        }
        if(this.props.authloading){
            login = <div className={style.center}><Spinner color=" #3F51B5" /></div>;
        }
        
        return(
            <div className={style.loginContainer}>
               {login}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        lanState: state.lang.lan,
        langTable: state.lang.langTables,
        langLoading: state.lang.langLoading,
        authloading: state.auth.authloading,
        authError: state.auth.autherror,
        isAuthed: !(state.auth.authData == null)
    }
  }
  
const mapDispatchToProps = dispatch => {
    return {
       storeLanguagesTable: (langTable) => dispatch(storeLanguagesTable(langTable)),
       onLangRequestFailure: () => dispatch(langRequestFailure()),
       onLoginClick: (authData, redirect) => dispatch(authRequest(authData, redirect)),
    }
  }
  

export default connect(mapStateToProps,mapDispatchToProps)(Login);