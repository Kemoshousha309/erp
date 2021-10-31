import { connect } from "react-redux";
import { Button } from "@material-ui/core";
import axios from "../../../../axios";
import { store } from "../../../..";
import { logout } from "../../../../store";
import InputPrivsTable from "./InputPrivsTable/InputPrivsTable";
import { setlastIndex } from "../../../ScreenConstructor/screen/functions/moves";
import { functionsListenrs } from "../../../ScreenConstructor/screen/listeners";
import ScreenConstructor from "../../../ScreenConstructor/ScreenConstructor";
import {
  autoDisplay,
  changePropName
} from "../../../ScreenConstructor/screen/inputsHandlers"
import { handleDrivedState } from "../../../ScreenConstructor/screen/handlers";
import { displayContent } from "../../../ScreenConstructor/screen/displayContent";
import { langChangeActivity } from "../../../../store/actions/lang";
import { selectMessage, t } from "../../../../utilities/lang";
import { timer } from "../../../ScreenConstructor/screen/utilities";


class Branches extends ScreenConstructor {
  constructor() {
    super();
    this.state = {
      ...this.state,
      fields: {
        from_branch_no: {
          fieldType: "input",
          type: "number",
          label: "from_branch_no",
          validation: {
            length: 30,
          },
          validity: {
            valid: true,
            touched: false,
            message: null,
          },
          writability: true,
          controlField: true,
          value: "",
          fillFields: [
            { recordName: "branch_no", stateName: "from_branch_no" },
            { recordName: "branch_f_name", stateName: "from_branch_no_f_name" },
            { recordName: "branch_d_name", stateName: "from_branch_no_d_name" },
          ],
        },
        from_branch_no_name: {
          fieldType: "input",
          label: "name",
          readOnly: true,
          value: "",
        },
        to_branch_no: {
          fieldType: "input",
          type: "number",
          label: "to",
          validation: {
            length: 30,
          },
          validity: {
            valid: true,
            touched: false,
            message: null,
          },
          writability: true,
          controlField: true,
          value: "",
          fillFields: [
            { recordName: "branch_no", stateName: "to_branch_no" },
            { recordName: "branch_f_name", stateName: "to_branch_no_f_name" },
            { recordName: "branch_d_name", stateName: "to_branch_no_d_name" },
          ],
        },
        to_branch_no_name: {
          fieldType: "input",
          label: "name",
          readOnly: true,
          value: "",
        },
        from_user_id: {
          fieldType: "input",
          type: "number",
          label: "from_user_id",
          validation: {
            length: 30,
          },
          validity: {
            valid: true,
            touched: false,
            message: null,
          },
          writability: true,
          controlField: true,
          value: "",
          fillFields: [
            { recordName: "user_id", stateName: "from_user_id" },
            { recordName: "user_f_name", stateName: "from_user_id_f_name" },
            { recordName: "user_d_name", stateName: "from_user_id_d_name" },
          ],
        },
        from_user_id_name: {
          fieldType: "input",
          label: "name",
          readOnly: true,
          value: "",
        },
        to_user_id: {
          fieldType: "input",
          type: "number",
          label: "to",
          validation: {
            length: 30,
          },
          validity: {
            valid: true,
            touched: false,
            message: null,
          },
          writability: true,
          controlField: true,
          value: "",
          fillFields: [
            { recordName: "user_id", stateName: "to_user_id" },
            { recordName: "user_f_name", stateName: "to_user_id_f_name" },
            { recordName: "user_d_name", stateName: "to_user_id_d_name" },
          ],
        },
        to_user_id_name: {
          fieldType: "input",
          label: "name",
          readOnly: true,
          value: "",
        },
        group_no: {
          fieldType: "input",
          type: "number",
          label: "group_no",
          validation: {
            length: 30,
          },
          validity: {
            valid: true,
            touched: false,
            message: null,
          },
          writability: true,
          controlField: true,
          value: "",
          fillFields: [
            { recordName: "group_no", stateName: "group_no" },
            { recordName: "group_f_name", stateName: "group_no_f_name" },
            { recordName: "group_d_name", stateName: "group_no_d_name" },
          ],
        },
        group_no_name: {
          fieldType: "input",
          label: "name",
          readOnly: true,
          value: "",
        },
      },
      pks: [],
      urls: {
        add: "public/labels",
        modify: "public/labels",
        search: "public/labels",
        pages: "public/labels/pages",
        page: "public/labels/page",
        lastPage: "public/labels/lastPage",
        filter: "public/labels/filteredPages",
        pageNo: "public/labels/pageNo",
        delete: "public/labels",
      },
      fks: [
        "from_branch_no",
        "to_branch_no",
        "from_user_id",
        "to_user_id",
        "group_no",
      ],
      fkList: {
        from_branch_no: {
          mainFields: [
            "branch_no",
            "branch_d_name",
            {
              propName: { d: "shortcut_d", f: "shortcut_f" },
              label: "shortcut",
            },
          ],
          urls: {
            add: "branches",
            modify: "branches",
            search: "branches",
            pages: "branches/pages",
            page: "branches/page",
            lastPage: "branches/lastPage",
            filter: "branches/filteredPages",
            pageNo: "branches/pageNo",
            delete: "branches",
          },
        },
        to_branch_no: {
          mainFields: [
            "branch_no",
            "branch_d_name",
            {
              propName: { d: "shortcut_d", f: "shortcut_f" },
              label: "shortcut",
            },
          ],
          urls: {
            add: "branches",
            modify: "branches",
            search: "branches",
            pages: "branches/pages",
            page: "branches/page",
            lastPage: "branches/lastPage",
            filter: "branches/filteredPages",
            pageNo: "branches/pageNo",
            delete: "branches",
          },
        },
        from_user_id: {
          mainFields: [
            { label: "user_no", propName: "user_id" },
            { propName: "direct_mang", label: "direct_manager" },
            "group_no",
            { label: "name", propName: "user_d_name" },
          ],
          urls: {
            add: "users",
            modify: "users",
            search: "users",
            pages: "users/pages",
            page: "users/page",
            lastPage: "users/lastPage",
            filter: "users/filteredPages",
            pageNo: "users/pageNo",
            delete: "users",
          },
        },
        to_user_id: {
          mainFields: [
            { label: "user_no", propName: "user_id" },
            { propName: "direct_mang", label: "direct_manager" },
            "group_no",
            { label: "name", propName: "user_d_name" },
          ],
          urls: {
            add: "users",
            modify: "users",
            search: "users",
            pages: "users/pages",
            page: "users/page",
            lastPage: "users/lastPage",
            filter: "users/filteredPages",
            pageNo: "users/pageNo",
            delete: "users",
          },
        },
        group_no: {
          mainFields: [
            "group_no",
            { label: "name", propName: "group_d_name" },
            "admin_group",
          ],
          urls: {
            add: "usersgroups",
            modify: "usersgroups",
            search: "usersgroups",
            pages: "usersgroups/pages",
            page: "usersgroups/page",
            lastPage: "usersgroups/lastPage",
            filter: "usersgroups/filteredPages",
            pageNo: "usersgroups/pageNo",
            delete: "usersgroups",
          },
        },
      },
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
    // changeLangSelectAcivity(true)
    setlastIndex(this);
    functionsListenrs(this, true);
    autoDisplay(this, "from_branch_no", "branches", {
      main: {
        d: { recordProp: "branch_d_name", stateProp: "from_branch_no_d_name" },
        f: { recordProp: "branch_f_name", stateProp: "from_branch_no_f_name" },
      },
    });
    autoDisplay(this, "to_branch_no", "branches", {
      main: {
        d: { recordProp: "branch_d_name", stateProp: "to_branch_no_d_name" },
        f: { recordProp: "branch_f_name", stateProp: "to_branch_no_f_name" },
      },
    });
    autoDisplay(this, "from_user_id", "users", {
      main: {
        d: { recordProp: "user_d_name", stateProp: "from_user_id_d_name" },
        f: { recordProp: "user_f_name", stateProp: "from_user_id_f_name" },
      },
    });
    autoDisplay(this, "to_user_id", "users", {
      main: {
        d: { recordProp: "user_d_name", stateProp: "to_user_id_d_name" },
        f: { recordProp: "user_f_name", stateProp: "to_user_id_f_name" },
      },
    });
    autoDisplay(this, "group_no", "usersgroups", {
      main: {
        d: { recordProp: "group_d_name", stateProp: "group_no_d_name" },
        f: { recordProp: "group_f_name", stateProp: "group_no_f_name" },
      },
    });
  }

  save = () => {
    const { input_privs } = this.state;
    const body = [];
    const propsNames = ["user_id", "branch_no", "add_priv", "view_priv"];
    Object.keys(input_privs).forEach((key) => {
      const item = input_privs[key];
      if (item.edited) {
        body.push(pickProps(propsNames, item));
      }
    });
    this.setState({ loading: true });
    axios({
      method: "put",
      url: "masterdataprivileges/branches",
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
      state: { fields },
    } = this;
    const body = {};
    Object.keys(fields).forEach((key) => {
      body[key] = fields[key].value;
    });
    this.setState({ loading: true });
    axios({
      url: "/masterdataprivileges/branches",
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
      state: { input_privs },
    } = this;
    const pks = ["user_id", "branch_no"];
    Object.keys(input_privs).forEach((i) => {
      const item = input_privs[i];
      if (item[pks[0]] === record[pks[0]] && item[pks[1]] === record[pks[1]]) {
        item[id] = value;
        item.edited = true;
      }
    });
    this.setState({ input_privs: input_privs });
  };

  static getDerivedStateFromProps(props, state) {
    let fieldsUpdate = changePropName(
      props,
      state.fields,
      "from_branch_no_name",
      "from_branch_no"
    );
    fieldsUpdate = changePropName(
      props,
      fieldsUpdate,
      "to_branch_no_name",
      "to_branch_no"
    );
    fieldsUpdate = changePropName(
      props,
      fieldsUpdate,
      "from_user_id_name",
      "from_user_id"
    );
    fieldsUpdate = changePropName(
      props,
      fieldsUpdate,
      "to_user_id_name",
      "to_user_id"
    );
    fieldsUpdate = changePropName(
      props,
      fieldsUpdate,
      "group_no_name",
      "group_no"
    );
    let { mode, input_privs } = state;
    if (mode === "start") {
      input_privs = null;
    }
    const { tools } = handleDrivedState(props, state);
    return {
      tools: tools,
      input_privs: input_privs,
      fields: fieldsUpdate,
    };
  }
  render() {
    const {
      props: { lanState, lanTable },
      state: { input_privs },
    } = this;
    const aditionalStyle = {
      margin: "2rem",
    };
    const content = {
      header: ["branch_no", "name", "user_no", "name", "add", "view"],
      propsName: [
        "branch_no",
        { d: "branch_d_name", f: "branch_f_name" },
        "user_id",
        { d: "user_d_name", f: "user_f_name" },
        "add_priv",
        "view_priv",
      ],
    };
    const additional = (
      <div style={aditionalStyle}>
        <Button
          onClick={this.viewInputPrivs}
          variant="contained"
          color="primary"
          style={{ marginBottom: "2rem" }}
        >
          {t("view", lanTable, lanState)}
        </Button>
        {input_privs ? InputPrivsTable(this, content, inputsControl) : null}
      </div>
    );
    return displayContent(this, this.props.location, additional);
  }
}

const mapStateToProps = (state) => {
  return {
    lanState: state.lang.lan,
    lanTable: state.lang.langTables,
    token: state.auth.authData.token,
    languages: state.lang.langInfo,
    rawTree_hash: state.auth.authData.raw_tree_hash,
    forms_privs_hash: state.auth.authData.forms_privs_hash,
    logged_user_id: state.auth.authData.user_id,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    changeLangSelectAcivity: (mode) => dispatch(langChangeActivity(mode)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Branches);

const pickProps = (propsList, obj) => {
  const newObj = {};
  propsList.forEach((prop) => {
    newObj[prop] = obj[prop];
  });
  return newObj;
};

const inputsControl = (
  disabled,
  i,
  propName,
  cursor,
  lanState,
  lanTable,
  logged_user_id
) => {
  let message = null;
  let newCursor = cursor;
  if (!i[`can_change_${propName}`]) {
    disabled = true;
    message = t("donot_have_privileges", lanTable, lanState, " ");
  }
  if (i.admin_group) {
    disabled = true;
    message = t("group_admin_cannot_change_privs", lanTable, lanState);
  }
  if (i.user_id === logged_user_id) {
    disabled = true;
    message = t("you_logged_user", lanTable, lanState);
  }
  if (message) {
    newCursor = "help";
  }
  return [disabled, message, newCursor];
};
