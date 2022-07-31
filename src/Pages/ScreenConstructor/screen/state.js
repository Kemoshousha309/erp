// @ts-check

/**

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


