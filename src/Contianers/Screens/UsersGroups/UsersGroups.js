import { Component } from "react";
import { connect } from "react-redux";
import { toolSelectHandler } from "../../../utilities/tools";
import {
  handleDelete,
  handleDeleteConfirmation,
} from "../../../utilities/tap/delete";
import { handleSearch } from "../../../utilities/tap/search";
import { handleMove, setlastIndex } from "../../../utilities/tap/moves";
import { functionsListenrs } from "../../../utilities/tap/listeners";
import {
  handleAdd,
  handleModify,
  handleList,
  handleCopy,
  handleCloseList,
  handleRecordClick,
  handleInputChange,
  handleCloseShortCuts,
  handleDrivedState,
} from "../../../utilities/tap/handlers";
import { displayContent } from "../../../utilities/tap/displayContent";
import { langChangeActivity } from "../../../store/actions/lang";
import { handleSave } from "../../../utilities/tap/save";
import { handleUndo } from "../../../utilities/tap/undo";


class UsersGroups extends Component {
  state = {
    fields: {
      group_no: {
        fieldType: "input",
        type: "number",
        label: "group_no",
        validation: {
          requiered: true,
          size: 2147483647,
        },
        validity: {
          valid: true,
          touched: false,
          message: null,
        },
        writability: false,
        value: "",
      },
      group_d_name: {
        fieldType: "input",
        type: "text",
        label: "name",
        validation: {
          requiered: true,
          length: 50,
        },
        validity: {
          valid: true,
          touched: false,
          message: null,
        },
        writability: false,
        value: "",
      },
      group_f_name: {
        fieldType: "input",
        type: "text",
        label: "foreign_name",
        validation: {
          requiered: true,
          length: 50,
        },
        validity: {
          valid: true,
          touched: false,
          message: null,
        },
        writability: false,
        value: "",
      },
      admin_group: {
        fieldType: "checkbox",
        type: "checkbox",
        label: "management",
        writability: false,
        value: false,
      },
    },
    pks: ["group_no"],
    tapTools: [], // to be deleted and view the others
    tools: null,
    mode: "start",
    prevMode: null,
    recordIndex: null,
    lastIndex: null,
    message: null,
    loading: false,
    listShow: false,
    tapName: "usersgroups",
    deleteConfirm: false,
    searchFields: ["group_no"],
    ShortCutsList: false,
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
  };

  // Tools Handle *********************************************
  toolsClickedHandler = (identifier) => toolSelectHandler(identifier, this);
  modify = () => handleModify(this);
  add = () => handleAdd(this);
  undo = () => handleUndo(this);
  save = () => handleSave(this);
  copy = () => handleCopy(this);
  list = () => handleList(this);
  delete = () => handleDelete(this);
  search = () => handleSearch(this);
  previous = () => handleMove("previous", this);
  next = () => handleMove("next", this);
  first = () => handleMove("first", this);
  last = () => handleMove("last", this);

  // Handlers ************************************************
  closeList = () => handleCloseList(this);
  recordClick = (record, i) => handleRecordClick(this, record, i);
  inputChange = (state, identifier) =>
    handleInputChange(this, state, identifier);
  deleteConfirmation = (res) => handleDeleteConfirmation(this, res);
  ShortCutsListCloseHandler = () => handleCloseShortCuts(this);

  // LifeCycle methods *******************************************
  componentDidMount() {
    setlastIndex(this);
    functionsListenrs(this, true);
  }
  componentWillUnmount() {
    functionsListenrs(this, false);
    this.props.changeLangSelectAcivity(true);
  }
  static getDerivedStateFromProps(props, state) {
    const { tools } = handleDrivedState(props, state);
    return {
      tools: tools,
    };
  }
  render() {
    return displayContent(this, this.props.location);
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
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    changeLangSelectAcivity: (mode) => dispatch(langChangeActivity(mode)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersGroups);
