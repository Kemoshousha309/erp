import { Component } from "react";
import style from "./SystemCommands.module.scss";
import { connect } from "react-redux";
import axios from "../../../axios";
import Spinner from "../../../Components/UI/Spinner/Spinner";
import StatusBar from "../../../Components/StatusBar/StatusBar";
import { logout } from "../../../Context";
import { store } from "../../..";
import ReloadServerCache from "./Commands/ReloadServerCache/ReloadServerCache";
import GenUngenPriv from "./Commands/GenUngenPriv/GenUngenPriv";
import { TextField } from "@mui/material";
import ReloadClientCache from "./Commands/ReloadClientCache/ReloadClientCache";
import { clearLangData } from "../../../Context/actions/lang";
import { timer } from "../../ScreenConstructor/screen/utilities";
import { selectMessage, t } from "../../../Languages/languages";

class SystemCommands extends Component {
  state = {
    statusLoading: false,
    message: null,
    genUngenPriv: "false",
    displayedCommands: [],
    allCommands: ["ReloadServerCache", "GenUngenPriv", "ReloadClientCache"],
  };
  reloadServerCache = () => {
    request(this, "/systemcommands/server/reloadServerCache", "post");
  };
  reloadClientCache = () => {
    this.props.clearBrowserData();
  };
  genUngenPrivRadioHandler = (e) => {
    this.setState({ genUngenPriv: e.target.value });
  };
  genUngenPrivExcuteHandler = () => {
    request(
      this,
      `/systemcommands/privileges/generateUngeneratedPrivileges/${this.state.genUngenPriv}`,
      "post"
    );
  };
  filterCommands = (e) => {
    const input = e.target.value.toLowerCase();
    const commands = {
      ReloadServerCache: "reload_server_cash",
      ReloadClientCache: "reload_client_cache",
      GenUngenPriv: "generate_ungenerated_priv",
    };
    Object.keys(commands).forEach((key) => {
      commands[key] = t(commands[key]);
    });
    const displayedCommands = [];
    for (const key in commands) {
      const item = commands[key].toLowerCase();
      if (item.includes(input)) {
        displayedCommands.push(key);
      }
    }
    this.setState({ displayedCommands: displayedCommands });
  };
  componentDidMount() {
    const displayedCommands = [];
    this.state.allCommands.forEach((i) => displayedCommands.push(i));
    this.setState({ displayedCommands: displayedCommands });
  }
  render() {
    const {
      state: { statusLoading, message, genUngenPriv, displayedCommands },
      reloadServerCache,
      genUngenPrivRadioHandler,
      genUngenPrivExcuteHandler,
      filterCommands,
      reloadClientCache,
    } = this;

    const statusBar = (
      <>
        {statusLoading ? <Spinner small color="3F51B5" /> : null}
        {message ? (
          <StatusBar show type={message.type}>
            {message.content}
          </StatusBar>
        ) : null}
      </>
    );

    const commandsComponents = {
      ReloadServerCache: (
        <ReloadServerCache reloadServerCache={reloadServerCache} />
      ),
      GenUngenPriv: (
        <GenUngenPriv
          genUngenPrivExcuteHandler={genUngenPrivExcuteHandler}
          genUngenPrivRadioHandler={genUngenPrivRadioHandler}
          value={genUngenPriv}
        />
      ),
      ReloadClientCache: (
        <ReloadClientCache reloadClientCache={reloadClientCache} />
      ),
    };

    return (
      <div className={style.container}>
        <div className={style.header}>
          <h1>{t("system_commands")}</h1>
          <div className={style.filter}>
            <TextField
              type="text"
              autoComplete="off"
              variant="standard"
              fullWidth
              label={t("find_command")}
              onChange={filterCommands}
            />
          </div>
        </div>
        {displayedCommands.map((i) => (
          <div key={i}>{commandsComponents[i]}</div>
        ))}
        <div className={style.statusBar}>{statusBar}</div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    clearBrowserData: () => dispatch(clearLangData()),
  };
};

export default connect(null, mapDispatchToProps)(SystemCommands);

// this function is related only to this commpont and would be unexpect in other components....
const request = (thisK, url, method) => {
  thisK.setState({ statusLoading: true });
  axios({
    url: url,
    method: method,
  })
    .then((res) => {
      const {
        data: { message },
      } = res;

      const messageContent = {
        content: selectMessage(message),
        type: "success",
      };
      thisK.setState({
        statusLoading: false,
        message: messageContent,
      });
      timer().then((res) => thisK.setState({ message: false }));
    })
    .catch((err) => {
      let message = null;
      if (err.response) {
        if (err.response.status === 401) {
          store.dispatch(logout());
        }
        message = {
          content: selectMessage(err.response.data.message),
          type: "error",
        };
        if (err.response.data.error) {
          message.content = err.response.data.error;
        }
      }
      thisK.setState({
        statusLoading: false,
        message: message,
      });
      timer().then((res) => thisK.setState({ message: false }));
    });
};
