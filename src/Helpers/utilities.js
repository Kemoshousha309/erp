import { decideName } from '../Languages/languages';
import { extractName } from '../System/model/screen/functions/list';

export const getParam = (searchParam, paramName) => {
  const string = searchParam.replace(`?${paramName}=`, '');
  return string;
};

export const getF = (f, mode = null, lang_no) => {
  // get the correct name of a property based on the current language
  const outPut = typeof f === 'object' ? f[mode] : f;
  if (mode === 'propName' && scanNameLang(outPut)) {
    const nakedName = extractName(outPut);
    return decideName(nakedName);
  }
  if (outPut === 'name') {
    return parseInt(lang_no) === 1 ? 'name' : 'foreign_name';
  }

  if (typeof outPut === 'object') {
    if (parseInt(lang_no) === 1) {
      return outPut.d;
    }
    return outPut.f;
  }
  return outPut;
};

const scanNameLang = (string) => {
  let isFound = false;
  if (typeof string === 'string') {
    isFound = string.includes('d_name') || string.includes('f_name');
  }
  return isFound;
};

export const hash = (array, key1, key2) => {
  const obj = {};
  if (key2) {
    array.forEach((i) => {
      const key = i[key1] + i[key2];
      obj[key] = i;
    });
  } else {
    array.forEach((i) => {
      obj[i[key1]] = i;
    });
  }
  return obj;
};

export const hash_back = (hash_table) => {
  const arr = [];
  for (const key in hash_table) {
    arr.push(hash_table[key]);
  }
  return arr;
};

export const split_arr = (arr) => {
  const arr1 = arr.slice(0, arr.length / 2);
  const arr2 = arr.slice(arr.length / 2, arr.length);
  return [arr1, arr2];
};

export const check_exist = (props, obj) => {
  let contain = true;
  props.forEach((i) => {
    if (obj[i]) {
      contain = true && contain;
    } else {
      contain = false && contain;
    }
  });
  return contain;
};

