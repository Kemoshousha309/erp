import { hash, hash_back } from "../../../../Helpers/utilities";

let lastTimer = null;
export const timer = (time=3000) => {
  return new Promise((resolve, reject) => {
    const timerId = setTimeout(() => {
      resolve(true)
    }, time);
    if (!(lastTimer === timerId)) {
      if (lastTimer) {
        clearTimeout(lastTimer);
      }
    }
    lastTimer = timerId;
  });
};

export const triggerEnterButton = (id, func) => {
  const input = document.getElementById(id);
  input.addEventListener("keyup", (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      input.blur();
      func();
    }
  });
};

export const toolsPriv = (formPrivs, tools) => {
  const tools_hash = hash(tools, "name");
  for (const key in formPrivs) {
    if (key === "add_priv" && !formPrivs[key]) {
      delete tools_hash.add;
      delete tools_hash.copy;
    }
    if (key === "modify_priv" && !formPrivs[key]) {
      delete tools_hash.modify;
    }
    if (key === "view_priv" && !formPrivs[key]) {
      delete tools_hash.list;
      delete tools_hash.previous;
      delete tools_hash.next;
      delete tools_hash.first;
      delete tools_hash.last;
      delete tools_hash.search;
    }
    if (key === "delete_priv" && !formPrivs[key]) {
      delete tools_hash.delete;
    }
  }
  return hash_back(tools_hash);
};

export const getDetailsPropanes = (tabs, headers) => {
  // this function give you props names of record that is not viewOnly
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


export function isLangChanged(prevProps, currentProps) {
  return parseInt(prevProps.lanState) !== parseInt(currentProps.lanState)
}