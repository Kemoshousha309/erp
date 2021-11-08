import React from "react";
import { toolSelectHandler } from "../../utilities/tools";
import {
  handleDelete,
  handleDeleteConfirmation,
} from "./screen/functions/delete";
import { handleSearch } from "./screen/functions/search";
import { handleSave } from "./screen/functions/save";
import { handleMove, setlastIndex } from "./screen/functions/moves";
import { functionsListenrs } from "./screen/listeners";
import {
  fkRecordClickHandler,
  handleCloseDetailsFkList,
  handleCloseFkList,
  handleCloseList,
  handleDetailsRecordClick,
  handleList,
  handleRecordClick,
} from "./screen/functions/list";
import { handleAdd } from "./screen/functions/add";
import { handleModify } from "./screen/functions/modify";
import { handleCopy } from "./screen/functions/copy";
import {
  handleCloseShortCuts,
  handleDrivedState,
  handleInputChange,
} from "./screen/handlers";
import { handleUndo } from "./screen/functions/undo";
import {
  tabsChangeHandler,
  addHandler,
  removeHandler,
  detailsInputChangeHandler,
} from "./screen/Details/handlers";

class ScreenConstructor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tools: null,
      mode: "start",
      fkListShow: null,
      prevMode: null,
      recordIndex: null,
      lastIndex: null,
      message: null,
      loading: false,
      listShow: false,
      deleteConfirm: false,
      ShortCutsList: false,
      record: null,
      detailsForeignList: null,
      tapTools: [],
      searchFields: [],
      mainFields: [],
    };
  }

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
  closeFkList = () => handleCloseFkList(this);
  closeDetailsFkList = () => handleCloseDetailsFkList.call(this)
  recordClick = (record, i) => handleRecordClick(this, record, i);
  recordFkClick = (record, i) => fkRecordClickHandler(this, record);
  recordDetailsClick = (record, i) => handleDetailsRecordClick.call(this, record, i)
  inputChange = (state, identifier) =>
    handleInputChange(this, state, identifier);
  deleteConfirmation = (res) => handleDeleteConfirmation(this, res);
  ShortCutsListCloseHandler = () => handleCloseShortCuts(this);

  // DETAILS HANDLERS
  navigateTabsHandler = (value) => tabsChangeHandler.call(this, value);

  detailsAddHandler = (e) => addHandler.call(this, e);

  detailsRemoveHandler = (index, e) => removeHandler.call(this, index, e);

  detailsInputChangeHandler = (event, index, serverValue, validationRules) =>
    detailsInputChangeHandler.call(
      this,
      event,
      index,
      serverValue,
      validationRules
    );

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
    return handleDrivedState(props, state);
  }
  render() {
    return false;
  }
}

export default ScreenConstructor;
