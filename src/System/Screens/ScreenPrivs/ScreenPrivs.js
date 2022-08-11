import { connect } from "react-redux";
import axios from "../../../axios"
import _ from "lodash";
import { screenPrivInitState } from "./state";
import ScreenConstructor from "../../model/ScreenConstructor";
import { handleFields } from "../../model/screen/handlers/fields";
import { selectMessage, t } from "../../../Languages/languages";
import { timer } from "../../model/screen/handlers/utilities";
import { handleDerivedState } from "../../model/screen/handlers/handlers";
import { langChangeActivity } from "../../../Context/actions/lang";
import Hint from "../../../Components/UI/Hint/Hint"
import { RenderScreen } from "../../view/RenderScreen";
class ScreenPrivs extends ScreenConstructor {
  constructor() {
    super();
    this.state = {
      ...this.state,
      ..._.cloneDeep(screenPrivInitState)
    };
  }
  save = () => {
    // handle the priv save here (special)
    let url = "formprivileges";
    if (this.state.formPriv.flag_value) {
      url = "flagPriv";
    }
    this.setState({ loading: true });
    const formPriv = this.state.formPriv;
    axios({
      method: "put",
      url: url,
      data: formPriv,
    })
      .then((res) => {
        const user_formPrivs_clone = _.cloneDeep(this.state.user_formPrivs)
        if (res.status === 200) {
          const form_no = formPriv.form_no;
          user_formPrivs_clone.forEach((i, n) => {
            if (i.form_no === form_no) {
              user_formPrivs_clone[n] = formPriv;
            }
          });
        }
        handleFields(this.state.fields, "close", false);
        const message = {
          content: selectMessage(res.data.message),
          type: "success",
        };
        this.setState({
          mode: "d_record",
          loading: false,
          message: message,
          recordIndex: null,
          user_formPrivs: user_formPrivs_clone,
        });
            timer().then((res) => this.setState({ message: false }));
      })
      .catch((err) => {
        handleFields(this.state.fields, "open", false);
        const message = {
          content: selectMessage(
            err.response.data.message,

          ),
          type: "error",
        };
        if (err.response.data.error) {
          message.content = err.response.data.error;
        }
        this.setState({
          loading: false,
          message: message,
          recordIndex: null,
        });
            timer().then((res) => this.setState({ message: false }));
      });
  };
  treeNodeClick = (record) => {
    let key = record.form_no;
    if (!record.form_no) {
      // set the value of composite key
      key = record["flag_code"] + "_" + record["flag_value"];
    }
    this.setState({ currentForm: key, formPriv: null, currentNode: record });
  };
  static getDerivedStateFromProps(props, state) {
    let { tools } = handleDerivedState(props, state);
    const tools_clone = [...tools];
    tools_clone.forEach((i) => {
      if (i.name === "modify") {
        if (state.formPriv) {
          i.state = true;
        } else {
          i.state = false;
        }
      }
    });

    // get the state form the store when user is selected
    let tree = null;
    let treeLoading = (
      <Hint message={t("select_user")} />
    );
    if (state.record && state.user_formPrivs) {
      if (state.record.user_id !== props.logged_user_id) {
        tree = props.tree_f;
      } else {
        treeLoading = (
          <Hint
            message={t(
              "select_not_logged_user",
            )}
          />
        );
        tools_clone.forEach((i) => {
          if (i.name === "modify") {
            i.state = false;
          }
        });
      }
    }

    let recordClone = { ...state.record };
    if (state.mode === "start") {
      recordClone = null;
    }

    return {
      tools: tools_clone,
      tree: tree,
      treeLoading: treeLoading,
      record: recordClone,
    };
  }

  // methods related to screen privs
  setFormPriv = (formPriv) => {
    if (!this.state.formPriv) {
      this.setState({ formPriv: formPriv });
    } else if (this.state.formPriv.form_no !== formPriv.form_no) {
      this.setState({ formPriv: formPriv });
    }
  };

  privChangeHandler = (e, i) => {
    const value = e.target.checked;
    const formPriv_clone = { ...this.state.formPriv };
    formPriv_clone[i] = value;
    this.setState({ formPriv: formPriv_clone });
  };

  render() {
    // request privs
    if (this.state.record && !this.state.user_formPrivs) {
      privRequest(this);
    } else if (this.state.record && this.state.user_formPrivs) {
      if (this.state.record.user_id !== this.state.user_formPrivs[0].user_id) {
        this.setState({ user_formPrivs: null, formPriv: null });
        privRequest(this);
      }
    } else if (!this.state.record && this.state.user_formPrivs) {
      this.setState({
        user_formPrivs: null,
        currentForm: null,
        formPriv: null,
        currentNode: null,
      });
    }

    return <RenderScreen screen={this} />
  }
}

const mapStateToProps = (state) => {
  return {
    lanState: state.lang.lan,
    lanTable: state.lang.langTables,
    token: state.auth.authData.token,
    languages: state.lang.langInfo,
    main_tree: state.auth.authData.main_tree,
    rawTree_hash: state.auth.authData.raw_tree_hash,
    forms_privs_hash: state.auth.authData.forms_privs_hash,
    logged_user_id: state.auth.authData.user_id,
    tree_f: state.auth.authData.tree_f,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLangSelectActivity: (mode) => dispatch(langChangeActivity(mode)),
  };
};

const privRequest = (thisK) => {
  axios
    .get(`formprivileges/${thisK.state.record.user_id}`)
    .then((res) => {
      if (thisK.state.user_formPrivs) {
        const privs_up = [...thisK.state.user_formPrivs, ...res.data];
        thisK.setState({ user_formPrivs: privs_up });
      } else {
        thisK.setState({ user_formPrivs: res.data });
      }
    })
    .catch((err) => console.log(err));
  axios
    .get(`flagPriv/${thisK.state.record.user_id}`)
    .then((res) => {
      if (thisK.state.user_formPrivs) {
        const privs_up = [
          ...thisK.state.user_formPrivs,
          ...create_unique_key(res.data, "flag_code", "flag_value", "form_no"),
        ];
        thisK.setState({ user_formPrivs: privs_up });
      } else {
        thisK.setState({
          user_formPrivs: create_unique_key(
            res.data,
            "flag_code",
            "flag_value",
            "form_no"
          ),
        });
      }
    })
    .catch((err) => console.log(err));
};

const create_unique_key = (arr, key1, key2, propName) => {
  // this function take an array of objs and give every one a unique key
  arr.forEach((i) => {
    const key = i[key1] + "_" + i[key2];
    i[propName] = key;
  });
  return arr;
};

export default connect(mapStateToProps, mapDispatchToProps)(ScreenPrivs);
