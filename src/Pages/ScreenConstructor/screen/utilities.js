import { hash, hash_back } from '../../../Helpers/utilities';

let lastTimer = null;
export const timer = (thisK) => {
  const timerId = setTimeout(() => {
    thisK.setState({ message: false });
  }, 3000);

  if (!(lastTimer === timerId)) {
    if (lastTimer) {
      clearTimeout(lastTimer);
    }
  }
  lastTimer = timerId;
};

export const trigerEnterButton = (id, func) => {
  const input = document.getElementById(id);
  input.addEventListener('keyup', (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      input.blur();
      func();
    }
  });
};

export const toolsPriv = (formPrivs, tools) => {
  const tools_hash = hash(tools, 'name');
  for (const key in formPrivs) {
    if (key === 'add_priv' && !formPrivs[key]) {
      delete tools_hash.add;
      delete tools_hash.copy;
    }
    if (key === 'modify_priv' && !formPrivs[key]) {
      delete tools_hash.modify;
    }
    if (key === 'view_priv' && !formPrivs[key]) {
      delete tools_hash.list;
      delete tools_hash.previous;
      delete tools_hash.next;
      delete tools_hash.first;
      delete tools_hash.last;
      delete tools_hash.search;
    }
    if (key === 'delete_priv' && !formPrivs[key]) {
      delete tools_hash.delete;
    }
  }
  return hash_back(tools_hash);
};

export const getDtailsPropnams = (tabs, headers) => {
  // this funcion give you props names of record that is not viewOnly
  const properties = Object.keys(tabs).map((key) => {
    const tab = tabs[key];
    if (!tab.viewOnly) {
      if (headers) {
        return {
          recordDetailPropName: tab.recordDetailPropName,
          headers: tab.headers,
        };
      }
      return tab.recordDetailPropName;
    }
    return null;
  });
  return properties;
};
