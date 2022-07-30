import React, { PureComponent } from "react";
import style from "./Login.module.scss";
import companyLogo from "../../Assets/campanyLogoPlaceholder.png";
import { connect } from "react-redux";
import {
  authRequest,
  langRequestFailure,
  storeLanguagesTable,
} from "../../store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { Button, CircularProgress, TextField } from "@mui/material";
import LangSelector from "../../Components/Navigation/LangSelector/LangSelector";
import { t } from "../../Languages/languages";

class Login extends PureComponent {
  state = {
    user_no: "",
    password: "",
  };

  onChanageHandler = (event, identifier) => {
    const value = event.target.value;
    this.setState({ [identifier]: value });
  };
  redirect = () => {
    if (this.props.isAuthed) {
      this.props.history.push("/");
    }
  };
  onLoginClickHandler = (event) => {
    event.preventDefault();
    const authData = {
      user_id: this.state.user_no,
      password: this.state.password,
    };
    this.props.onLoginClick(authData, this.redirect);
  };

  render() {
    let errorMessage = null;
    if (this.props.authError) {
      if (parseInt(this.props.lanState) === 1) {
        errorMessage = this.props.authError.ar;
      } else {
        errorMessage = this.props.authError.en;
      }
      if (this.props.authError === 503) {
        errorMessage =
          "There is no network connection, please check out and try agian";
        if (parseInt(this.props.lanState) === 1) {
          errorMessage =
            "لا يوجد اتصال بالشبكه, الرجاء التحقق من الاتصال و المحاوله من جديد";
        }
      }
    }

    const errorNotify = (
      <>
        <FontAwesomeIcon icon={faExclamationCircle} />
        <span> {errorMessage}</span>
      </>
    );
    let login;
    if (this.props.langLoading && this.props.langTable) {
      if (this.props.langTable) {
        login = (
          <div className={style.loginFrom}>
            <div className={style.side}>
              <p>Experts Vision</p>
            </div>
            <div className={style.formContent}>
              <img
                className={style.companyLogo}
                src={companyLogo}
                alt="customer logo"
              ></img>
              <form onSubmit={this.onLoginClickHandler}>
                <p style={{ color: "red", fontSize: "1.9rem" }}>
                  {" "}
                  {errorMessage ? errorNotify : null}
                </p>
                <div className="mb-4">
                  <TextField
                    value={this.state.user_no}
                    onChange={(event) =>
                      this.onChanageHandler(event, "user_no")
                    }
                    variant="standard"
                    fullWidth
                    label={t(
                      "user_no",
                    )}
                  />
                </div>
                <div className="mb-5">
                  <TextField
                    type="password"
                    value={this.state.password}
                    onChange={(event) =>
                      this.onChanageHandler(event, "password")
                    }
                    variant="standard"
                    fullWidth
                    label={t(
                      "password",
                    )}
                  />
                </div>
                <div className={style.lowerForm}>
                  <div className={style.langSelector}>
                    <LangSelector />
                  </div>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={style.loginBtn}
                  >
                    {t("login")}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        );
      } else {
        login = (
          <p>
            Something went wrong, please check out you network connection and
            try agian . . .
          </p>
        );
      }
    } else {
      login = (
        <div className={style.spinner}>
          <CircularProgress />
        </div>
      );
    }
    if (this.props.authloading) {
      login = (
        <div className={style.spinner}>
          <CircularProgress />
        </div>
      );
    }

    return <div className={style.loginContainer}>{login}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    lanState: state.lang.lan,
    langTable: state.lang.langTables,
    langLoading: state.lang.langLoading,
    authloading: state.auth.authloading,
    authError: state.auth.autherror,
    isAuthed: !(state.auth.authData == null),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    storeLanguagesTable: (langTable) =>
      dispatch(storeLanguagesTable(langTable)),
    onLangRequestFailure: () => dispatch(langRequestFailure()),
    onLoginClick: (authData, redirect) =>
      dispatch(authRequest(authData, redirect)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
