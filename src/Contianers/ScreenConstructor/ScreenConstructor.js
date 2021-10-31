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
  handleCloseFkList,
  handleCloseList,
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
  recordClick = (record, i) => handleRecordClick(this, record, i);
  recordFkClick = (record, i) => fkRecordClickHandler(this, record);
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
    return handleDrivedState(props, state);
  }
  render() {
    return false;
  }
}

export default ScreenConstructor;
