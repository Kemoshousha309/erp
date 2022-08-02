/**
 * Handle languages functions  
 * @module language
 * @tutorial my-tutorial
 */




import {store} from "../index";


/**
 * Produce the translation for labels and messages
 * @param {string}  code - the code of the label or message
 * @param {string}  placeholder - a hash value to put in specific place in the description
 * @returns {string} - description of the code in a specific language
 */

export function t (code, placeholder)  {
  const {lan: langNo, langTables} = store.getState().lang;
  let description = null;
  let holder = null;
  langTables.forEach((element) => {
    if (element.label_code === code && parseInt(element.lang_no) === parseInt(langNo)) {
      description = element.label_desc;
    }
    if (element.message_code === code && parseInt(element.lang_no) === parseInt(langNo) && !description) {
      description = element.message_desc;
    }
    if (placeholder) {
      if (element.label_code === placeholder && parseInt(element.lang_no) === parseInt(langNo)) {
        holder = element.label_desc;
      }
    }
  });
  if (holder) {
    description = description.replace(/#[1-9]/g, holder);
  } else if (placeholder) {
    description = description.replace(/#[1-9]/g, placeholder);
  }
  return description;
};

export const selectMessage = (messages) => {
  const {lan: langNo} = store.getState().lang;
  if (messages) {
    if (parseInt(langNo) === 1) {
      return messages.ar;
    }
    return messages.en;
  }
  return '';
};
export const decideLanguageName = (languages, input) => {
  let name = '';
  languages.forEach((lan) => {
    if (parseInt(input) === parseInt(lan.lang_no)) {
      name = lan.lang_name;
    } else if (input === '') {
      name = '';
    }
  });
  return name;
};

export const getSelectLangDir = (langs) => {
  const {lan: langNo} = store.getState().lang;
  let lanDirection = null;
  langs.forEach((lang) => {
    if (parseInt(lang.lang_no) === parseInt(langNo)) {
      lanDirection = lang.lang_dir;
    }
  });
  return lanDirection;
};

export const decideName = (fieldName) => {
  const {lan: langNo} = store.getState().lang;
  let returnName = `${fieldName}_f_name`;
  if (parseInt(langNo) === 1) {
    returnName = `${fieldName}_d_name`;
  }
  return returnName;
};

export const getAvailableValue = (d_value, f_value) => {
  const {lan: langNo} = store.getState().lang;
  let currentValue = d_value;
  let otherValue = f_value;
  if (parseInt(langNo) === 2) {
    currentValue = f_value;
    otherValue = d_value;
  }
  return currentValue || otherValue;
};
