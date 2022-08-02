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
  tapTools: ["excel"], 
  searchFields: [],
  mainFields: [],
  pks: [],
  customizedList: {
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


// STATE DOCUMENTATION *****************************************************************

/**
 * ConstructorState - contains the sharable structure of the all screen states
 * @typedef {Object} ConstructorState
 * @property {null | Array} tools 
 * - list of tools objects each one has the state(display or not) and the name(type)
 * @property {null | string} mode
 *  - state the mode of action in the screen and can be ("start", "d_record", "modify", "add", copy)
 * @property {null | string} fkListShow 
 * - state the foreign key list: 
 * * display it or not
 * * the name of property that used to know the info about the fk list
 * @property {null | string} prevMode - store the previous mode of screen
 * @property {null | number} recordIndex
 * - state the index of the record(page)
 * - used it in the moves and other places
 * @property {null | number} lastIndex 
 * - state the last index
 * - used it in the moves and other places
 * @property {null | Object} message - object that have the type and content of the message
 * @property {boolean} loading - state the loading that uses with functions
 * @property {boolean} listShow - control the show list
 * @property {boolean} deleteConfirm - control the show the confirmation dialog of delete
 * @property {boolean} ShortCutsList - control the show shortcut list
 * @property {null | Object} record 
 * - contain the record:
 * * to use it throughout the screen
 * * keep track of details values, validity, and modification 
 * @property {null | string} addDtlForeignList - control the show of the list that add the entire
 * details row from another table(screen)
 * @property {Array} tapTools - indicate the tools to be deleted from the screen
 * @property {Array} searchFields - indicate the fields that should be used in search process
 * @property {Array} mainFields - indicate the fields that used in RecordDisplay filter and more places
 * @property {Array} pks - primary keys of the database table(screen)
 * @property {{open: boolean, render: null | Object}} customizedList
 *  - object that have the type and content of the message
 *  - have open and render props
 * @property {boolean} excelSheetOpen - control show of excel page drop page
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
 * ScreenState - all the properties here is unique for the screen or over write the constructor state
 * @typedef ScreenState 
 * @property {Object} fields - object contains each field data {@link Field} 
 * @property {Object} uls contains all the actions end points 
 * @property {Array} fks contains all the available fks for this screen
 * @property {Object} preAdd contains:
 * - state => to declare if we have done the preAdd process or not 
 * - content => holds the pre add content info that used in many wheres else
 * @property {Object} preModify contains:
 * - state => to declare if we have done the preModify process or not 
 * - content => holds the pre Modify content info that used in many wheres else
 * @property {FkList} fkList contains the required data for rendering the fk list
 * @property {Object} mainFields 
 * - mainFields => a list contain of objects (label code for language process, prop name to match with the record) 
 * @property {string} tabName the screen name it's useful to store this piece of information
 * @property {Details} details manage all the details data
 */

/**
 * @typedef Field 
 * @property {string} fieldType that can be: 
 * (input | checkbox | select | asyncSelect | textarea | file | chips | button | holder)
 * @property {string} type that can be: (number | text )
 * @property {string} label label code
 * @property {Object} validation define the validation rules such as: 
 * {required | int | length | size | point6Format}
 * @property {boolean} writability can be write to it or not
 * @property {string | any} value the current value of the field
 * @property {Object} options Object of options each one has: 
 * - template => the value that render to the screen
 * - value => the actual value of server and logic 
 * @property {Array} fillFields list of objects each one could have: 
 * - recordName: the name of property in the record
 * - stateName: the name of the property in the state 
 * 
 * 
 */

/**
 * @typedef FkList used in the state
 * @property {Object} fk prop name contains:
 * - mainFields => a list contain of objects (label code for language process, prop name to match with the record)
 * - uls => contain all end points for api requests 
 * - filterBody => used to send with each request as default to control the records that is showed to the user
 */

/**
 * @typedef Header define the main structure and the data for the field in dtl row
 * @property {string} propName the property name that: 
 * - match with the server record
 * - used as id
 * - mandatory
 * @property {string} label the label code of the filed   (mandatory)
 * @property {boolean} disable control the disable state of field (mandatory)
 * @property {string} type state the type of the input (mandatory)
 * @property {Object} validationRules define the rules of validation (mandatory)
 * @property {boolean} fk 
 * - tell that this field is a foreign key and have a fk list
 * - used in add to prevent add duplicated rows
 * @property {Array} fillFields define the fields prop names to be used 
  in record click to fill the row field inputs sea more about it in {@link Field}
 * @property {string} foreignPropName hold the name of the property in the the foreign table 
 * @property {Object} foreignURLs store the end points used in the dtl fk list 
 * @property {Array} foreignMainFields the main fields of the details
 * @property {Object} filterBody used to send with each request as default to 
  control the records that is showed to the user 
 * @property {string | any} defaultValue to set a default value to the field
 * 
 * */


/**
 * @typedef Tabs used in the details and each tab have the following
 * @property {string} label to define the label code of the tab
 * @property {Object} headers contain the headers each one has the type {@link Header}
 */


/**
 * @typedef Details used in the state to define the behavior of the dtl
 * @property {string} current_tab declare the current tab of the details 
 * @property {boolean} loading declare the loading state of the details
 * @property {boolean} show declare the show state of the details to show it or not
 * @property {Tabs} tabs object contain all tabs information
 * @property {string} type To define the type of details (optional)
 * - PRIMARY => primary from the same screen when Add: add an empty row to the details
 * - FOREIGN => from foreign screen when Add: open a modal from another screen
 * @property {boolean} viewOnly some details just for only display purposes (mandatory)
 * @property {string} recordDetailPropName the name of dtl property in the record usually 
  is the same as the tab name
 * @property {string | null} activeForeignList 
 * @property {string | number | null} detailsRowIndex define the index of the row 
  which has an action to easily track it 
 * @property {Array} foreignKeys list of foreign keys
 * @property {Object} pageURL pageURL contain information used in getDetails in add mode
 * - add mode => when save a details in a add mode we should display the added (saved)
 * - we need to receive the details from the server after save add
 * - to form a url to get the record details we need to know the following
 * - master =>  knowing the name of the primary key of the master enable us to access its value form the
     record (we should know the value to send the request and receive the details of that record)
 * - temp =>  is the url of getting record (note: record contain the details that we want)
 * @property {boolean} addState  to define the add state enabled or disabled:
 *  needed in limit record numb (optional) 
 * @property {number} recordsNum  to define the max number of records
 *  allowed to be added used in limitAddHandlers (optional)
 *  
*/ 
