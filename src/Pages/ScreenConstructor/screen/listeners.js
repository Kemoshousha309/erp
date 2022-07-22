import $ from 'jquery';
import { getSelectLangDir } from '../../../Helpers/lang';

// function listners *******************************************
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
  // is the focus field foriegn key or not
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

const handleListenrClick = (event, tools, name, func) => {
  const state = getToolState(tools, name);
  if (name === 'next' || name === 'previous') {
    // no blur
  } else {
    const inputs = document
      .getElementById('tap')
      .querySelectorAll('input, select');
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
    state: {
      tools,
      fks,
      details,
      details: { current_tab },
    },
  } = thisK;
  const state = getToolState(tools, 'list');
  const activeFk = isFk(fks);
  const currentDetailsFks = details.tabs[current_tab].foreignKeys;
  const activeDtlFk = isFk(currentDetailsFks);

  if (activeFk) {
    event.preventDefault();
    thisK.setState({ fkListShow: activeFk });
  } else if (activeDtlFk) {
    event.preventDefault();
    let currentElement = document.activeElement;
    while (currentElement.tagName !== 'TR') {
      currentElement = currentElement.parentElement;
    }
    const detailsRowIndex = currentElement.dataset.rowindex;
    details.tabs[current_tab].activeForeignList = activeDtlFk;
    details.tabs[current_tab].detailsRowIndex = detailsRowIndex;
    thisK.setState({ details });
  } else if (state) {
    event.preventDefault();
    thisK.list();
  }
};

const setListenrs = (event, thisK) => {
  const dir = getSelectLangDir(thisK.props.languages, thisK.props.lanState);
  const { tools } = thisK.state;
  switch (event.key) {
    case 'Delete':
      handleListenrClick(event, tools, 'delete', thisK.delete);
      break;
    case 'F12':
      handleListenrClick(event, tools, 'delete', thisK.delete);
      break;
    case 'F2':
      handleListenrClick(event, tools, 'add', thisK.add);
      break;
    case 'Insert':
      handleListenrClick(event, tools, 'add', thisK.add);
      break;
    case 'F3':
      handleListenrClick(event, tools, 'copy', thisK.copy);
      break;
    case 'F5':
      handleListenrClick(event, tools, 'search', thisK.search);
      break;
    case 'F7':
      handleListenrClick(event, tools, 'modify', thisK.modify);
      break;
    case 'Home':
      handleListenrClick(event, tools, 'first', thisK.first);
      break;
    case 'End':
      handleListenrClick(event, tools, 'last', thisK.last);
      break;
    case 'Escape':
      handleListenrClick(event, tools, 'undo', thisK.undo);
      const {
        state: {
          prevMode, fkListShow, listShow, ShortCutsList, mode,
        },
      } = thisK;
      if (fkListShow || listShow || ShortCutsList) {
        if (ShortCutsList) {
          thisK.setState({ ShortCutsList: false });
        } else {
          thisK.setState({ fkListShow: null, listShow: false, mode: prevMode || mode });
        }
      }
      break;
    case 'F10':
      handleListenrClick(event, tools, 'save', thisK.save);
      break;
    case 'ArrowRight':
      if (parseInt(dir) === 2) {
        handleListenrClick(event, tools, 'next', thisK.next);
      } else {
        handleListenrClick(event, tools, 'previous', thisK.previous);
      }
      break;
    case 'ArrowLeft':
      if (parseInt(dir) === 2) {
        handleListenrClick(event, tools, 'previous', thisK.previous);
      } else {
        handleListenrClick(event, tools, 'next', thisK.next);
      }
      break;
    case 'F8': // should be f1
      event.preventDefault();
      thisK.ShortCutsListCloseHandler();
      break;
    case 'F4':
      handleF4(event, thisK);
      break;
    default:
      break;
  }
};

export const functionsListenrs = (thisK, mode) => {
  function callbackFunc(e) {
    if (e.key === 'Enter') {
      const self = $(this);
      const form = self.parents('form:eq(0)');
      let focusable;
      let next;
      focusable = form
        .find('input,a,select,button,textarea')
        .filter(':visible');
      next = focusable.eq(focusable.index(this) + 1);
      if (next.length) {
        next.focus();
      }
      return false;
    }
  }
  if (mode) {
    $('body').on('keydown', 'input, select', callbackFunc);
    document.onkeydown = (e) => setListenrs(e, thisK);
  } else {
    $('body').off('keydown', 'input, select', callbackFunc);
    document.onkeydown = null;
  }
};
