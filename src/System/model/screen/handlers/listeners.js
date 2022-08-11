/**
 * @module listeners 
 */

import $ from "jquery";
import { getSelectLangDir } from "../../../../Languages/languages";
import { checkActiveList } from "../functions/list";

// function listeners *******************************************
const getToolState = (tools, name) => {
  let state = null;
  tools.forEach((t) => {
    if (t.name === name) {
      state = t.state;
    }
  });
  return state;
};

const isFk = (fks) => {
  // is the focus field foreign key or not
  let fk = null;
  if (fks) {
    fks.forEach((f) => {
      if (f === document.activeElement.id) {
        fk = f;
      }
    });
  }
  return fk;
};

const handleListenerClick = (event, tools, name, func) => {
  const state = getToolState(tools, name);
  if (name === "next" || name === "previous") {
    // no blur
  } else {
    const inputs = document
      .getElementById("tap")
      .querySelectorAll("input, select");
    inputs.forEach((ele) => ele.blur());
  }
  if (state) {
    event.preventDefault();
    func();
  }
};

const handleF4 = (event, thisK) => {
  // know the tool is disabled or not
  const {
    state: { tools, fks, details },
  } = thisK;
  let currentDetailsFks = null;
  if (details) {
    currentDetailsFks = details.tabs[details.current_tab].foreignKeys;
  }
  const state = getToolState(tools, "list");
  const activeFk = isFk(fks);
  const activeDtlFk = isFk(currentDetailsFks);

  if (activeFk) {
    event.preventDefault();
    thisK.openFkList(activeFk);
  } else if (activeDtlFk) {
    event.preventDefault();
    thisK.openDtlFkList(activeDtlFk);
  } else if (state) {
    event.preventDefault();
    thisK.list();
  }
};

const setListeners = (event, thisK) => {
  const dir = getSelectLangDir(thisK.props.languages);
  const { tools } = thisK.state;
  switch (event.key) {
    case "Delete":
      handleListenerClick(event, tools, "delete", thisK.delete);
      break;
    case "F12":
      handleListenerClick(event, tools, "delete", thisK.delete);
      break;
    case "F2":
      handleListenerClick(event, tools, "add", thisK.add);
      break;
    case "Insert":
      handleListenerClick(event, tools, "add", thisK.add);
      break;
    case "F3":
      handleListenerClick(event, tools, "copy", thisK.copy);
      break;
    case "F5":
      handleListenerClick(event, tools, "search", thisK.search);
      break;
    case "F7":
      handleListenerClick(event, tools, "modify", thisK.modify);
      break;
    case "Home":
      handleListenerClick(event, tools, "first", thisK.first);
      break;
    case "End":
      handleListenerClick(event, tools, "last", thisK.last);
      break;
    case "Escape":
      if(checkActiveList(thisK)) return thisK.clearLists();
      handleListenerClick(event, tools, "undo", thisK.undo);
      break;
    case "F10":
      handleListenerClick(event, tools, "save", thisK.save);
      break;
    case "ArrowRight":
      if (parseInt(dir) === 2) {
        handleListenerClick(event, tools, "next", thisK.next);
      } else {
        handleListenerClick(event, tools, "previous", thisK.previous);
      }
      break;
    case "ArrowLeft":
      if (parseInt(dir) === 2) {
        handleListenerClick(event, tools, "previous", thisK.previous);
      } else {
        handleListenerClick(event, tools, "next", thisK.next);
      }
      break;
    case "F8": // should be f1
      event.preventDefault();
      thisK.ShortCutsListCloseHandler();
      break;
    case "F4":
      handleF4(event, thisK);
      break;
    default:
      break;
  }
};

export const functionsListeners = (thisK, mode) => {
  function callbackFunc(e) {
    if (e.key === "Enter") {
      const self = $(this);
      const form = self.parents("form:eq(0)");
      let focusable;
      let next;
      focusable = form
        .find("input,a,select,button,textarea")
        .filter(":visible");
      next = focusable.eq(focusable.index(this) + 1);
      if (next.length) {
        next.focus();
      }
      return false;
    }
  }
  if (mode) {
    $("body").on("keydown", "input, select", callbackFunc);
    document.onkeydown = (e) => setListeners(e, thisK);
  } else {
    $("body").off("keydown", "input, select", callbackFunc);
    document.onkeydown = null;
  }
};

/**
 * set a keyboard listeners to a field
 * - set time out to sure that the process is done after the state is updated
 * - get all the fields with that id then go through them
 * - if it has not a listener set one 
 * - execute the callback function if the matched key is clicked 
 * @param {string} id the id of the field 
 * @param {string} key the key code that should be listened to
 * @param {Function} callback the callback function that should be called when the event trigger
 * @returns {undefined} 
 *  */
export function setFieldKeyListener (id, key, callback) {
  setTimeout(() => {
    const presentAccCurrFields = document.querySelectorAll(`#${id}`);
    presentAccCurrFields.forEach((element) => {
      if (element.dataset.hasListener === "true") return;
      element.addEventListener("keydown", (event) => {
        element.dataset.hasListener = true;
        event.preventDefault();
        if (event.key !== key) return;
        callback(event)
      });
    });
  });
}