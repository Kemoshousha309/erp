import * as actionTypes from './actionTypes';
import axios from '../../axios';
import { storeLocally, isExpire } from '../../Helpers/reducre';

export const changeLnaguage = (langValue) => ({ type: actionTypes.CHANGE_LANGUAGE, langValue });
export const storeLanguagesTable = (langTable) => ({ type: actionTypes.GET_LANG_TABLE, langTable });
export const storeMessages = (messages) => ({ type: actionTypes.STORE_MESSAGES, messages });
export const langRequestFailure = () => ({ type: actionTypes.LANG_REQUEST_FAILURE });
export const langChangeActivity = (mode) => ({ type: actionTypes.LANG_CHANGE_ACTIVITY, mode });
const langData = (data) => ({ type: actionTypes.LANG_INFO, info: data });
export const clearlangData = () => ({ type: actionTypes.CLEAR_LANG_DATA });

export const langRequest = () => (dispatch) => {
  axios.get('/public/labels')
    .then((res) => {
      storeLocally('labels', res.data);
      dispatch(storeLanguagesTable(res.data));
    })
    .catch((err) => {
      dispatch(langRequestFailure());
    });
  axios.get('/public/messages')
    .then((res) => {
      storeLocally('messages', res.data);
      dispatch(storeMessages(res.data));
    })
    .catch((err) => {
      dispatch(langRequestFailure());
    });
};

const checkLabels = (dispatch) => {
  const labels = localStorage.getItem('labels');
  if (labels) {
    if (isExpire('labels', 3600 * 1000 * 24)) {
      localStorage.removeItem('labels');
      localStorage.removeItem('labels_storeTime');
    }
    dispatch(storeLanguagesTable(JSON.parse(labels)));
  } else {
    dispatch(langRequest());
  }
};

const checkMessages = (dispatch) => {
  const messages = localStorage.getItem('messages');
  if (messages) {
    if (isExpire('messages', 3600 * 1000 * 24)) {
      localStorage.removeItem('messages');
      localStorage.removeItem('messages_storeTime');
    }
    dispatch(storeMessages(JSON.parse(messages)));
  } else {
    dispatch(langRequest());
  }
};

const checkLang = (dispatch) => {
  const lang_num = localStorage.getItem('lang_num');
  if (lang_num) {
    if (isExpire('lang_num', 3600 * 1000 * 24)) {
      localStorage.removeItem('lang_num');
      localStorage.removeItem('lang_num_storeTime');
    }
    dispatch(changeLnaguage(lang_num));
  }
};

const getLanguages = (dispatch) => {
  axios.get('public/language')
    .then((res) => {
      storeLocally('lang_info', res.data);
      dispatch(langData(res.data));
    })
    .catch((err) => console.log(err));
};

const checklangInfo = (dispatch) => {
  const lang_info = localStorage.getItem('lang_info');
  if (lang_info) {
    if (isExpire('lang_info', 3600 * 1000 * 24)) {
      localStorage.removeItem('lang_info');
      localStorage.removeItem('lang_info_storeTime');
    }
    dispatch(langData(JSON.parse(lang_info)));
  } else {
    getLanguages(dispatch);
  }
};

export const checkLabelesLocalStorage = () => (dispatch) => {
  checklangInfo(dispatch);
  checkLabels(dispatch);
  checkLang(dispatch);
  checkMessages(dispatch);
};
