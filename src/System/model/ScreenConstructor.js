import { PureComponent } from "react";
import { toolSelectHandler } from "./screen/handlers/tools";
import { Deleter, handleDeleteConfirmModel } from "./screen/functions/delete";
import { handleSearchModel, Searcher } from "./screen/functions/search";
import { handleSaveModel, Saver } from "./screen/functions/save";
import { handleMoveModel, Mover, setLastIndex } from "./screen/functions/moves";
import {
  handleClearListsModel,
  handleRecordClickModel,
} from "./screen/functions/list";
import { Adder, handleAddModel } from "./screen/functions/add";
import { handleModifyModel, Modifier } from "./screen/functions/modify";
import { Copier, handleCopyModel } from "./screen/functions/copy";

import { ExcelServerSender } from "./screen/functions/excelSheet/serverSender";
import {
  excelPageCloseModal,
  resetExcelPageModal,
} from "./screen/functions/excelSheet/handlers";
import { XlsxValidator } from "./screen/functions/excelSheet/XlsxValidator";
import { XlsxPreparer } from "./screen/functions/excelSheet/XlsxPreparer";
import { DetailsRemover, handleDtlRemoveModel } from "./screen/Details/remove";
import {
  DetailsUndoHandler,
  handleUndoModel,
  UndoHandler,
} from "./screen/functions/undo";

import { List } from "./screen/functions/list";
import { FkList } from "./screen/functions/fkList";
import _ from "lodash";
import {
  handleChipsRecordClick,
  handleChipsAdd,
  handleChipsRemove,
  handleChipsListClose,
} from "./screen/handlers/chipsHandlers";
import {handleInputChange} from "./screen/handlers/inputsHandlers"
import { DetailsAdder, handleDtlAddModel } from "./screen/Details/add";
import { updateMode } from "./screen/handlers/mode";
import { functionsListeners } from "./screen/handlers/listeners";
import {initialState} from "./screen/handlers/state"
import {DetailsList, DetailsList_ADD, handelDtlFkListClickADDModel, handleDtlFkListCloseModel, handleDtlFkListRecordClickModel, handleOpenFkListModel} from "./screen/Details/list"
import {detailsInputChangeHandler} from "./screen/Details/handlers"

/**
 * This is a screen constructor
 * - used to contain all the sharable functionality of the screens
 * - the screen should have all the methods that update the state
 * - as its methods responsible for updating the state it we call a model to do this for us
 *
 * The model is function called with (this) of the screen manage the logic of set the state
 */

class ScreenConstructor extends PureComponent {
  /**
   * construct the screenConstructor component
   * - used to set the mount and state
   * - set the function classes
   * @param {Object} props Props of react
   */
  constructor(props) {
    super(props);
    /** @type {boolean}  */
    this.mounted = true;
    /** @type {Object} */
    this.state = _.cloneDeep(initialState);

    // INIT FUNCTIONS

    /** list object see the class {@link List} */
    this.listHandler = new List(this);
    /** save object see the class {@link Saver} */
    this.saveHandler = new Saver(this);
    /** Adder object see the constructor class {@link Adder} */
    this.addHandler = new Adder(this);
    /** Copier object see the constructor class {@link Copier} */
    this.copyHandler = new Copier(this);
    /** Searcher object see the constructor class {@link Searcher} */
    this.searchHandler = new Searcher(this);
    /** FkList object see the constructor class {@link FkList} */
    this.fkListHandler = new FkList(this);
    /** Modifier object see the constructor class {@link Modifier} */
    this.modifyHandler = new Modifier(this);
    /** Deleter object see the constructor class {@link Deleter} */
    this.deleteHandler = new Deleter(this);
    /** UndoHandler object see the constructor class {@link UndoHandler} */
    this.undoHandler = new UndoHandler(this);
    /** DetailsUndoHandler object see the constructor class {@link DetailsUndoHandler} */
    this.dtlUndoHandler = new DetailsUndoHandler(this);
    /** Mover object see the constructor class {@link Mover} */
    this.moveHandler = new Mover(this);
    /** DetailsAdder object see the constructor class {@link DetailsAdder} */
    this.dtlAdder = new DetailsAdder(this);
    /** DetailsRemover object see the constructor class {@link DetailsRemover} */
    this.dtlRemover = new DetailsRemover(this);
    /** DetailsList object see the constructor class {@link DetailsList} */
    this.detailsList = new DetailsList(this);
    /** DetailsList_ADD object see the constructor class {@link DetailsList_ADD} */
    this.detailsList_ADD = new DetailsList_ADD(this);
  }

  // BASIC FUNCTIONS *********************************************
  toolsClickedHandler = (identifier) => toolSelectHandler(identifier, this);
  add = () => handleAddModel.call(this);
  copy = () => handleCopyModel.call(this);
  search = () => handleSearchModel.call(this);
  modify = () => handleModifyModel.call(this);
  save = () => handleSaveModel.call(this);
  undo = () => handleUndoModel.call(this);

  // delete
  delete = () => this.setState({ deleteConfirm: true });
  deleteConfirmation = (res) => handleDeleteConfirmModel.call(this, res);

  // moves
  previous = () => handleMoveModel.call(this, "previous");
  next = () => handleMoveModel.call(this, "next");
  first = () => handleMoveModel.call(this, "first");
  last = () => handleMoveModel.call(this, "last");

  // list
  list = () => {
    const { currentMode, listShow, mode } = this.listHandler.open();
    const { tools } = updateMode(mode, this.state, this.props);
    this.setState({ prevMode: currentMode, listShow, mode, tools });
  };
  closeList = () => {
    const { listShow, prevMode } = this.listHandler.close();
    const { tools } = updateMode(prevMode, this.state, this.props);
    this.setState({ listShow, mode: prevMode, tools });
  };
  recordClick = (record, i) => handleRecordClickModel.call(this, record, i);

  // fk list
  openFkList = (activeFk) => this.setState({ fkListShow: activeFk });
  closeFkList = () => this.setState({ fkListShow: null });
  recordFkClick = (record) => {
    const fieldsClone = this.fkListHandler.recordClick(record);
    this.setState({
      fkListShow: null,
      fields: fieldsClone,
      fkRecord: record,
    });
  };

  // shortcut list
  ShortCutsListCloseHandler = () => this.setState({ ShortCutsList: false });

  // customized list
  closeCustomizedList = () =>
    this.setState({ customizedList: { render: null, open: false } });

  clearLists = () => handleClearListsModel.call(this);

  // DETAILS HANDLING **********************************************
  navigateTabsHandler = (value) => {
    const { details } = this.state;
    const detailsUpdate = _.cloneDeep(details);
    detailsUpdate.current_tab = value;
    this.setState({ details: detailsUpdate });
  };
  detailsInputChangeHandler = (event, index, serverValue, validationRules) => {
    const recordUpdate = detailsInputChangeHandler.call(
      this,
      event,
      index,
      serverValue,
      validationRules
    );
    this.setState({ record: recordUpdate });
  };

  detailsAddHandler = (e) => handleDtlAddModel.call(this, e);
  detailsRemoveHandler = (index, e) =>
    handleDtlRemoveModel.call(this, index, e);

  // dtl add list
  closeDetailsFkList_ADD = () => this.setState({ addDtlForeignList: null });
  recordDetailsClick_ADD = (record) =>
    handelDtlFkListClickADDModel.call(this, record);

  // dtl fk list using F4
  openDtlFkList = (activeDtlFk) =>
    handleOpenFkListModel.call(this, activeDtlFk);
  closeDetailsFkList = () => handleDtlFkListCloseModel.call(this);
  recordDetailsClick = (record) =>
    handleDtlFkListRecordClickModel.call(this, record);

  // TREE HANDLING *******************************************************
  treeNodeClick = (record) => handleRecordClickModel.call(this, record);

  // CHIPS HANDLING ******************************************************
  // these methods is consider models
  chipsAddHandler = (id, index) => handleChipsAdd.call(this, id, index);
  chipsRemoveHandler = (id, index) => handleChipsRemove.call(this, id, index);
  closeChipsList = () => handleChipsListClose.call(this);
  chipsRecordClick = (record) => handleChipsRecordClick.call(this, record);

  // EXCEL HANDLING ******************************************************
  excel = () => this.setState({ excelSheetOpen: !this.state.excelSheetOpen });
  excelPageClose = () => excelPageCloseModal.call(this);
  resetExcelPage = () => resetExcelPageModal.call(this);
  excelSheetServerSender = (sheet) => new ExcelServerSender(this, sheet);
  // return a new validator specific to this screen
  excelPageValidator = (sheet, sheetColumnsNum) => {
    return new XlsxValidator(sheetColumnsNum);
  };
  // return a new preparer specific to this screen
  excelPagePreparer = (recordPropNames, sheet) => {
    return new XlsxPreparer(recordPropNames, sheet);
  };

  // Handlers ************************************************
  inputChange = (state, identifier) =>
    handleInputChange(this, state, identifier);

  // LifeCycle methods *******************************************
  componentDidMount() {
    setLastIndex(this);
    functionsListeners(this, true);
    const { tools } = updateMode("start", this.state, this.props);
    this.setState({ tools });
  }
  componentWillUnmount() {
    this.mounted = false;
    this.setState = (state, callback) => {
      return;
    };
    functionsListeners(this, false);
    this.props.changeLangSelectActivity(true);
  }

  render() {
    return false;
  }
}

export default ScreenConstructor;
