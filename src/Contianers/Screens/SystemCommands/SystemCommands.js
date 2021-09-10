import { Component } from "react";
import style from "./SystemCommands.module.scss";
import { selectMessage, t } from "../../../utilities/lang";
import { connect } from "react-redux";
import axios from "../../../axios";
import Aux from "../../../hoc/wrap";
import Spinner from "../../../Components/UI/Spinner/Spinner";
import StatusBar from "../../../Components/StatusBar/StatusBar";
import { timer } from "../../../utilities/tap/utilities";
import { logout } from "../../../store";
import { store } from "../../..";
import ReloadServerCache from "./Commands/ReloadServerCache/ReloadServerCache";
import GenUngenPriv from "./Commands/GenUngenPriv/GenUngenPriv";
import { TextField } from "@material-ui/core";

const arCommands = {
  ReloadServerCache: "اعادة تحميل البيانتات المخزنة فى الخادم",
  GenUngenPriv: "انشاء الصلاحيات الغير منشأه",
};
const enCommands = {
  ReloadServerCache: "Reload Server Cache",
  GenUngenPriv: "Generate Ungenerated Privileges",
};

class SystemCommands extends Component {
  state = {
    statusLoading: false,
    message: null,
    genUngenPriv: "false",
    displayedCommands: [],
    allCommands: ["ReloadServerCache", "GenUngenPriv"]
  };
  reloadServerCache = () => {
    request(this, "/systemcommands/server/reloadServerCache", "post");
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
    const input = (e.target.value).toLowerCase()
    const {
      props: {lanState},
    } = this;
    let commands = enCommands;
    if(parseInt(lanState) === 1){
      commands = arCommands
    }
    const displayedCommands = [];
    for(const key in commands){
      const item = commands[key].toLowerCase();
      if(item.includes(input)){
        displayedCommands.push(key)
      }
    }
    this.setState({displayedCommands: displayedCommands})
  };
  componentDidMount () {
    const displayedCommands = []
    this.state.allCommands.forEach(i => displayedCommands.push(i))
    this.setState({displayedCommands: displayedCommands})
  }
  render() {
    const {
      state: { statusLoading, message, genUngenPriv, displayedCommands },
      props: { lanState, lanTable },
      reloadServerCache,
      genUngenPrivRadioHandler,
      genUngenPrivExcuteHandler,
      filterCommands,
    } = this;

    const statusBar = (
      <Aux>
        {statusLoading ? <Spinner small color="3F51B5" /> : null}
        {message ? (
          <StatusBar show type={message.type}>
            {message.content}
          </StatusBar>
        ) : null}
      </Aux>
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
    };

    return (
      <div className={style.container}>
        <div className={style.header}>
          <h1>{t("system_commands", lanTable, lanState)}</h1>
          <div className={style.filter}>
            <TextField
              type="text"
              autoComplete="off"
              variant="standard"
              fullWidth
              label="Find Command"
              onChange={filterCommands}
            />
          </div>
        </div>  
        {displayedCommands.map(i => <Aux key={i}>{commandsComponents[i]}</Aux>)}
        <div className={style.statusBar}>{statusBar}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lanState: state.lang.lan,
    lanTable: state.lang.langTables,
  };
};

export default connect(mapStateToProps, null)(SystemCommands);

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
      const {
        props: { lanState },
      } = thisK;

      const messageContent = {
        content: selectMessage(message, lanState),
        type: "success",
      };
      thisK.setState({
        statusLoading: false,
        message: messageContent,
      });
      timer(thisK);
    })
    .catch((err) => {
      let message = null;
      if (err.response) {
        if (err.response.status === 401) {
          store.dispatch(logout());
        }
        message = {
          content: selectMessage(
            err.response.data.message,
            thisK.props.lanState
          ),
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
      timer(thisK);
    });
};
