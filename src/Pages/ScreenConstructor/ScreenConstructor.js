import { PureComponent } from "react";
import { toolSelectHandler } from "../../Helpers/tools";
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
  handleChipsAdd,
  handleChipsListClose,
  handleChipsRecordClick,
  handleChipsRemove,
  handleCloseShortCuts,
  handleDrivedState,
  handleInputChange,
} from "./screen/handlers";
import {
  tabsChangeHandler,
  detailsInputChangeHandler,
} from "./screen/Details/handlers/handlers";
import { ExcelServerSender } from "./screen/functions/excelSheet/serverSender";
import {
  excelPageClose,
  resetExcelPage,
} from "./screen/functions/excelSheet/handlers";
import { XlsxValidator } from "./screen/functions/excelSheet/XlsxValidator";
import { XlsxPreparer } from "./screen/functions/excelSheet/XlsxPreparer";
import { DetialsAdder } from "./screen/Details/handlers/add";
import { DetailsRemover } from "./screen/Details/handlers/remove";
import { UndoHandler } from "./screen/functions/undo";
import { DetailsList, DetailsList_ADD } from "./screen/Details/handlers/list";

class ScreenConstructor extends PureComponent {
  constructor(props) {
    super(props);
    // props.updateCurrentScreen(this)
    this.mounted = true;
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
      addDtlForeignList: null,
      tapTools: ["excel"], // to be deleted and view the others
      searchFields: [],
      mainFields: [],
      pks: [],
      custimizedList: {
        open: false,
        render: null
      },
      excelSheetOpen: false,
      excelPage: {
        excelLoading: false,
        serverValidate: {
          validated: false,
          validatedResult: null,
          validateRes: null,
        },
        addMess: null,
      },
    };
    // Detials objects
    this.detailsList = new DetailsList(this);
    this.detailsList_ADD = new DetailsList_ADD(this);
  }

  // Tools Handle *********************************************
  toolsClickedHandler = (identifier) => toolSelectHandler(identifier, this);
  modify = () => handleModify(this);
  add = () => handleAdd(this);
  undo = () => {
    const undoHandler = new UndoHandler(this);
    undoHandler.handleUndo();
  };
  save = () => handleSave(this);
  copy = () => handleCopy.call(this);
  list = () => handleList(this);
  delete = () => handleDelete(this);
  search = () => handleSearch(this);
  previous = () => handleMove("previous", this);
  next = () => handleMove("next", this);
  first = () => handleMove("first", this);
  last = () => handleMove("last", this);
  excel = () => this.setState({ excelSheetOpen: !this.state.excelSheetOpen });

  // Handlers ************************************************
  closeCustmizedList = () => this.setState({custimizedList: {render: null, open: false}})
  closeList = () => handleCloseList(this);
  closeFkList = () => handleCloseFkList(this);
  // close the list opened from add button in details
  closeDetailsFkList_ADD = () =>
    this.detailsList_ADD.handleCloseDetailsFkList_ADD();
  recordClick = (record, i) => handleRecordClick(this, record, i);
  recordFkClick = (record, i) => fkRecordClickHandler(this, record);
  // record clicked on the list opened from add button in details
  recordDetailsClick_ADD = (record, i) => {
    this.detailsList_ADD.handleDetailsRecordClick_ADD(record);
  };
  closeDetailsFkList = () => this.detailsList.handleCloseDtlFkList();
  recordDetailsClick = (record) => this.detailsList.handleRecordClick(record);


  inputChange = (state, identifier) =>
    handleInputChange(this, state, identifier);
  deleteConfirmation = (res) => handleDeleteConfirmation(this, res);
  ShortCutsListCloseHandler = () => handleCloseShortCuts(this);

  // Chips Handling **********************************************
  chipsAddHandler = (id, index) => handleChipsAdd.call(this, id, index);
  chipsRemoveHandler = (id, index) => handleChipsRemove.call(this, id, index);
  closeChipsList = () => handleChipsListClose.call(this);
  chipsRecordClick = (record) => handleChipsRecordClick.call(this, record);

  // DETAILS HANDLERS*************************************************
  navigateTabsHandler = (value) => tabsChangeHandler.call(this, value);
  detailsAddHandler = (e) => {
    const adder = new DetialsAdder(this);
    adder.addHandler(e);
  };
  detailsRemoveHandler = (index, e) => {
    const remover = new DetailsRemover(this);
    remover.removeHandler(index, e);
  };
  detailsInputChangeHandler = (event, index, serverValue, validationRules) =>
    detailsInputChangeHandler.call(
      this,
      event,
      index,
      serverValue,
      validationRules
    );

  // Excel sheet ******************************************************
  excelPageClose = () => excelPageClose(this);
  resetExcelPage = () => resetExcelPage(this);
  excelSheetServerSender = (sheet) => new ExcelServerSender(this, sheet);
  // retrun a new validator specific to this screen
  excelPageValidator = (sheet, sheetColumnsNum) => {
    return new XlsxValidator(sheet, sheetColumnsNum);
  };

  // return a new preparer specific to this screen
  excelPagePreparer = (recordPropNames, sheet) => {
    return new XlsxPreparer(recordPropNames, sheet);
  };

  // LifeCycle methods *******************************************
  componentDidMount() {
    setlastIndex(this);
    functionsListenrs(this, true);
  }
  componentWillUnmount() {
    this.mounted = false;
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
