import { startMode, toolsNameMap } from '../../../Helpers/tools';
import { deepClone } from '../../../Validation/validation';
import { getParam } from '../../../Helpers/utilities';
import { toolsPriv } from './utilities';
import { getSelectLangDir } from '../../../Languages/languages';

// mode processes *******************************************************
export const handleMode = (mode, langs, tools, changeLangSelectAcivity) => {
  let activeList = null;
  const lang_dir = getSelectLangDir(langs);
  const toolsName = toolsNameMap(lang_dir);
  switch (mode) {
    case 'start':
      changeLangSelectAcivity(true);
      return startMode(lang_dir, tools);
    case 'add':
      changeLangSelectAcivity(false);
      return activate([toolsName.undo.name, toolsName.save.name], null, lang_dir, tools);
    case 'copy':
      changeLangSelectAcivity(false);
      return activate([toolsName.undo.name, toolsName.save.name], null, lang_dir, tools);
    case 'd_record':
      changeLangSelectAcivity(false);
      activeList = [
        toolsName.add.name, toolsName.excel.name, toolsName.list.name,
        toolsName.modify.name, toolsName.first.name, toolsName.last.name,
        toolsName.next.name, toolsName.previous.name, toolsName.first.name,
        toolsName.search.name, toolsName.delete.name, toolsName.copy.name,
        toolsName.undo.name,
      ];
      return activate(activeList, null, lang_dir, tools);
    case 'modify':
      changeLangSelectAcivity(false);
      activeList = [toolsName.save.name, toolsName.undo.name];
      return activate(activeList, null, lang_dir, tools);
    case 'search':
      changeLangSelectAcivity(false);
      activeList = [toolsName.search.name, toolsName.undo.name];
      return activate(activeList, 'search', lang_dir, tools);
    case 'list':
      changeLangSelectAcivity(true);
      activeList = [];
      return activate(activeList, null, lang_dir, tools);
    default:
      break;
  }
};

const activate = (activeList, mode = null, lang_dir, tools) => {
  const modeClone = deepClone(startMode(lang_dir, tools));
  modeClone.forEach((tool) => tool.state = false);
  activeList.forEach((toolName) => {
    modeClone.forEach((tool) => {
      if (toolName === tool.name) {
        tool.state = true;
      }
    });
  });
  if (mode) {
    modeClone.forEach((tool) => {
      if (tool.name === mode) {
        tool.onMode = true;
      }
    });
  }
  return modeClone;
};



export const updateMode = (mode, state, props) => {
  let tools = handleMode(
    mode,
    props.languages,
    state.tapTools,
    props.changeLangSelectAcivity,
  );
  const formPrivs = props.forms_privs_hash[getParam(props.location.search, 'no')];
  tools = toolsPriv(formPrivs, tools);
  return { tools };
}


