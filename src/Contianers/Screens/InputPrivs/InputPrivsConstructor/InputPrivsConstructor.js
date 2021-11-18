import axios from "../../../../axios";
import { store } from "../../../..";
import { logout } from "../../../../store";
import { functionsListenrs } from "../../../ScreenConstructor/screen/listeners";
import ScreenConstructor from "../../../ScreenConstructor/ScreenConstructor";
import { handleDrivedState } from "../../../ScreenConstructor/screen/handlers";
import { selectMessage } from "../../../../utilities/lang";
import { timer } from "../../../ScreenConstructor/screen/utilities";

class InputPrivsConstructor extends ScreenConstructor {
  constructor() {
    super();
    this.state = {
      ...this.state,
      tapTools: [
        "list",
        "delete",
        "add",
        "copy",
        "search",
        "next",
        "previous",
        "last",
        "first",
      ],
    };
  }
  componentDidMount() {
    functionsListenrs(this, true);
  }

  save = () => {
    const { input_privs, url, propsNames } = this.state;
    const body = [];
    Object.keys(input_privs).forEach((key) => {
      const item = input_privs[key];
      if (item.edited) {
        body.push(pickProps(propsNames, item));
      }
    });
    
    this.setState({ loading: true });
    axios({
      method: "put",
      url: `masterdataprivileges/${url}`,
      data: body,
    })
      .then((res) => {
        const message = {
          content: selectMessage(res.data.message, this.props.lanState),
          type: "success",
        };
        this.setState({
          mode: "d_record",
          loading: false,
          message: message,
          recordIndex: null,
        });
        timer(this);
      })
      .catch((err) => {
        let message = null;
        if (err.response) {
          // update the previlliges
          if (err.response.status === 401) {
            store.dispatch(logout());
          }
          message = {
            content: selectMessage(
              err.response.data.message,
              this.props.lanState
            ),
            type: "error",
          };
          if (err.response.data.error) {
            message.content = err.response.data.error;
          }
        }
        this.setState({
          loading: false,
          message: message,
          recordIndex: null,
        });
        timer(this);
      });
  };

  viewInputPrivs = () => {
    const {
      state: { fields, url },
    } = this;
    const body = {};
    Object.keys(fields).forEach((key) => {
      body[key] = fields[key].value;
    });
    this.setState({ loading: true });
    axios({
      url: `masterdataprivileges/${url}`,
      method: "post",
      data: body,
    })
      .then((res) => {
        this.setState({
          input_privs: res.data,
          loading: false,
          mode: "d_record",
        });
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
              this.props.lanState
            ),
            type: "error",
          };
          if (err.response.data.error) {
            message.content = err.response.data.error;
          }
          this.setState({
            statusLoading: false,
            message: message,
            loading: false,
          });
          timer(this);
        }
      });
  };

  privChangeHandler = (e, record) => {
    const value = e.target.checked;
    const id = e.target.id;
    const {
      state: { input_privs, identifiers: pks },
    } = this;
    Object.keys(input_privs).forEach((i) => {
      const item = input_privs[i];
      if (item[pks[0]] === record[pks[0]] && item[pks[1]] === record[pks[1]]) {
        item[id] = value;
        item.edited = true;
      }
    });
    this.setState({ input_privs: input_privs });
  };

  privControlIpnputHandler = (e, type, identifier) => {
    const value = e.target.checked;
    const {
      state: {
        input_privs,
        content: { header },
      },
    } = this;
    const controls = [];
    header.forEach((i) =>
      typeof i === "object" ? controls.push(i.control) : null
    );
    if (type === "COLUMN") {
      Object.keys(input_privs).forEach((i) => {
        const item = input_privs[i];
        if (
          item.can_change_add_priv &&
          item.can_change_view_priv &&
          !item.admin_group
        ) {
          item[identifier] = value;
          item.edited = true;
        }
      });
    } else if (type === "ROW") {
      controls.forEach((i) => {
        if (
          input_privs[identifier].can_change_add_priv &&
          input_privs[identifier].can_change_view_priv &&
          !input_privs[identifier].admin_group
        ) {
          input_privs[identifier][i] = value;
          input_privs[identifier].edited = true;
        }
      });
    } else if (type === "ALL") {
      Object.keys(input_privs).forEach((i) => {
        const item = input_privs[i];
        if (
          item.can_change_add_priv &&
          item.can_change_view_priv &&
          !item.admin_group
        ) {
          controls.forEach((i) => {
            item[i] = value
            item.edited = true
          });
        }
      });
    }
    this.setState({ input_privs: input_privs });
  };

  static getDerivedStateFromProps(props, state) {
    let { mode, input_privs } = state;
    if (mode === "start") {
      input_privs = null;
    }
    const { tools } = handleDrivedState(props, state);
    return {
      tools: tools,
      input_privs: input_privs,
    };
  }
  render() {
    return false;
  }
}

const pickProps = (propsList, obj) => {
  const newObj = {};
  propsList.forEach((prop) => {
    newObj[prop] = obj[prop];
  });
  return newObj;
};

export default InputPrivsConstructor;
