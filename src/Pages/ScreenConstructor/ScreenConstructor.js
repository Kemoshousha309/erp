import { PureComponent } from "react";
import { toolSelectHandler } from "../../Helpers/tools";
import { Deleter, handleDeleteConfirmModel } from "./screen/functions/delete";
import { handleSearchModel, Searcher } from "./screen/functions/search";
import { handleSaveModel, Saver } from "./screen/functions/save";
import { handleMoveModel, Mover, setlastIndex } from "./screen/functions/moves";
import { functionsListenrs } from "./screen/listeners";
import {
  handleClearListsModel,
  handleRecordClickModel,
} from "./screen/functions/list";
import { Adder, handleAddModel } from "./screen/functions/add";
import { handleModifyModel, Modifier } from "./screen/functions/modify";
import { Copyer, handleCopyModel } from "./screen/functions/copy";
import {
  handleChipsAdd,
  handleChipsListClose,
  handleChipsRecordClick,
  handleChipsRemove,
  handleCloseShortCuts,
  handleInputChange,
} from "./screen/handlers";
import { detailsInputChangeHandler } from "./screen/Details/handlers/handlers";
import { ExcelServerSender } from "./screen/functions/excelSheet/serverSender";
import {
  excelPageCloseModal,
  resetExcelPageModal,
} from "./screen/functions/excelSheet/handlers";
import { XlsxValidator } from "./screen/functions/excelSheet/XlsxValidator";
import { XlsxPreparer } from "./screen/functions/excelSheet/XlsxPreparer";
import { DetialsAdder, handleDtlAddModel } from "./screen/Details/handlers/add";
import {
  DetailsRemover,
  handleDtlRemoveModel,
} from "./screen/Details/handlers/remove";
import {
  DetailsUndoHandler,
  handleUndoModel,
  UndoHandler,
} from "./screen/functions/undo";
import {
  DetailsList,
  DetailsList_ADD,
  handelDtlFkListClickADDModel,
  handleDtlFkListCloseModel,
  handleDtlFkListRecordClickModel,
  handleOpenFkListModel,
} from "./screen/Details/handlers/list";
import { List } from "./screen/functions/list";
import { FkList } from "./screen/functions/fkList";
import { updateMode } from "./screen/mode";
import _ from "lodash";
import { initialState } from "./screen/state";

/**
 * This is a screen constructor 
 * - used to contian all the sharabe functionalitiy of the screens
 */

class ScreenConstructor extends PureComponent {
  /**
   * construct the screenContructor component
   * - used to set the mount and state
   * - set the funcion classes 
   * @param {any} props Props of react
   */
  constructor(props) {
    super(props);
    /** contian the mount info used in component will unmount */
    this.mounted = true;
    /**@type {Object} - used contian all the info about the screen */
    this.state = _.cloneDeep(initialState);

    // functions init
    /** list object see the class {@link List} */
    this.listHandler = new List(this);
    this.saveHandler = new Saver(this);
    this.addHandler = new Adder(this);
    this.copyHandler = new Copyer(this);
    this.searchHandler = new Searcher(this);
    this.fkListHandler = new FkList(this);
    this.modifyHandler = new Modifier(this);
    this.deleteHandler = new Deleter(this);
    this.undoHandler = new UndoHandler(this);
    this.dtlUndoHandler = new DetailsUndoHandler(this);
    this.moveHandler = new Mover(this);

    // Detials init
    this.dtlAdder = new DetialsAdder(this);
    this.dtlRemover = new DetailsRemover(this);
    this.detailsList = new DetailsList(this);
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
  ShortCutsListCloseHandler = () => handleCloseShortCuts(this);

  // custimized list
  closeCustmizedList = () =>
    this.setState({ custimizedList: { render: null, open: false } });

  clearLists = () => handleClearListsModel.call(this);

  // DETAILS HANDLEING **********************************************
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
  // retrun a new validator specific to this screen
  excelPageValidator = (sheet, sheetColumnsNum) => {
    return new XlsxValidator(sheet, sheetColumnsNum);
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
    setlastIndex(this);
    functionsListenrs(this, true);
    const { tools } = updateMode("start", this.state, this.props);
    this.setState({ tools });
  }
  componentWillUnmount() {
    this.mounted = false;
    this.setState = (state, callback) => {
      return;
    };
    functionsListenrs(this, false);
    this.props.changeLangSelectAcivity(true);
  }

  render() {
    return false;
  }
}

export default ScreenConstructor;
