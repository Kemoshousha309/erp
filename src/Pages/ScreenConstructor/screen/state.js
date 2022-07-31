// @ts-check

/**
 * State
 * @typedef {Object} State
 * @property {null | Array} tools - list of tools that should be displays with its tool state
 * @property {null | string} mode - state the mode of action in the screen
 * @property {null | string} fkListShow - state the fk list that should be didplayed
 * @property {null | string} prevMode - state store the previus mode of screen
 * @property {null | number} recordIndex 
 * - state the index of the record(page)
 * - used it in the moves and other places
 * @property {null | number} lastIndex - state the last index
 * @property {null | Object} message - object that have the type and content of the message
 * @property {boolean} loading - state the loading that uses with functions
 * @property {boolean} listShow - show list
 * @property {boolean} deleteConfirm - show the confirmation dialog of delete
 * @property {boolean} ShortCutsList - show shortcut list
 * @property {null | Object} record - contain the record
 * @property {null | string} addDtlForeignList - control the show of the list that add the entire
 * detials row from another table(screen)
 * @property {Array} tapTools - indicate the tools to be deleted from the screen
 * @property {Array} searchFields - indicate the fields that should be used in search process
 * @property {Array} mainFields - indicate the fields that usesd in RecordDisplay filter and more places
 * @property {Array} pks - primary keys of the database tabel(screen)
 * @property {{open: boolean, render: null | Object}} custimizedList
 *  - object that have the type and content of the message
 *  - have open and render props
 * @property {boolean} excelSheetOpen - constrol show of excel page drop page
 * @property {{
 * excelLoading: boolean,
 * serverValidate: {
 *  validated: boolean,
 *  validatedResult: null | Object,
 *  validateRes: null | Object,
 *},
 * addMess: null | Object,
 * }} excelPage - holds excel page information
 */

/**
 * The initial state used to init the state of the screen constructor
 * @type {State}
 */
export const initialState = {
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
    render: null,
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
