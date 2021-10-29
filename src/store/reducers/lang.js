import { storeLocally, updateState } from "../../utilities/reducre";
import * as actionTypes from "../actions/actionTypes";

const initState = {
  lan: 2,
  langTables: [],
  langLoading: false,
  langInfo: null,
  langChangeActive: true,
};

const changeLang = (state, action) => {
  storeLocally("lang_num", action.langValue);
  return updateState(state, {
    lan: action.langValue,
  });
};
const getLangTable = (state, action) => {
  const langTable = [...state.langTables];
  const labels = Object.values(action.langTable);
  labels.forEach((ele) => langTable.push(ele));
  return updateState(state, {
    ...state,
    langTables: langTable,
    langLoading: true,
  });
};

const langRequestFail = (state, action) => {
  return updateState(state, {
    ...state,
    langLoading: true,
  });
};

const storeMessageTable = (state, action) => {
  const langTable = [...state.langTables];
  const messages = Object.values(action.messages);
  messages.forEach((ele) => langTable.push(ele));
  return updateState(state, {
    ...state,
    langTables: langTable,
  });
};

const setlangInfo = (state, action) => {
  return updateState(state, {
    ...state,
    langInfo: action.info,
  });
};

const handleLangChangeAcivity = (state, action) => {
  return updateState(state, {
    ...state,
    langChangeActive: action.mode,
  });
};

const handleClearLangData = (state) => {
  const itemsToRemove = [
    "labels",
    "labels_storeTime",
    "messages",
    "messages_storeTime",
  ];
  itemsToRemove.forEach((i) => localStorage.removeItem(i));
  window.location.reload();
  return updateState(state, {
    ...state,
  });
};

export const languageReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_LANGUAGE:
      return changeLang(state, action);
    case actionTypes.GET_LANG_TABLE:
      return getLangTable(state, action);
    case actionTypes.LANG_REQUEST_FAILURE:
      return langRequestFail(state, action);
    case actionTypes.STORE_MESSAGES:
      return storeMessageTable(state, action);
    case actionTypes.LANG_INFO:
      return setlangInfo(state, action);
    case actionTypes.LANG_CHANGE_ACTIVITY:
      return handleLangChangeAcivity(state, action);
    case actionTypes.CLEAR_LANG_DATA:
      return handleClearLangData(state);
    default:
      return state;
  }
};
