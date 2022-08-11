
import _ from 'lodash';
import { startMode, toolsNameMap } from './tools';
import { getParam } from '../../../../Helpers/utilities';
import { getSelectLangDir } from '../../../../Languages/languages';
import { toolsPriv } from './utilities';

// mode processes *******************************************************
export const handleMode = (mode, langs, tools, changeLangSelectActivity) => {
  let activeList = null;
  const lang_dir = getSelectLangDir(langs);
  const toolsName = toolsNameMap(lang_dir);
  switch (mode) {
    case 'start':
      changeLangSelectActivity(true);
      return startMode(lang_dir, tools);
    case 'add':
      changeLangSelectActivity(false);
      return activate([toolsName.undo.name, toolsName.save.name], null, lang_dir, tools);
    case 'copy':
      changeLangSelectActivity(false);
      return activate([toolsName.undo.name, toolsName.save.name], null, lang_dir, tools);
    case 'd_record':
      changeLangSelectActivity(false);
      activeList = [
        toolsName.add.name, toolsName.excel.name, toolsName.list.name,
        toolsName.modify.name, toolsName.first.name, toolsName.last.name,
        toolsName.next.name, toolsName.previous.name, toolsName.first.name,
        toolsName.search.name, toolsName.delete.name, toolsName.copy.name,
        toolsName.undo.name,
      ];
      return activate(activeList, null, lang_dir, tools);
    case 'modify':
      changeLangSelectActivity(false);
      activeList = [toolsName.save.name, toolsName.undo.name];
      return activate(activeList, null, lang_dir, tools);
    case 'search':
      changeLangSelectActivity(false);
      activeList = [toolsName.search.name, toolsName.undo.name];
      return activate(activeList, 'search', lang_dir, tools);
    case 'list':
      changeLangSelectActivity(true);
      activeList = [];
      return activate(activeList, null, lang_dir, tools);
    default:
      break;
  }
};

const activate = (activeList, mode = null, lang_dir, tools) => {
  const modeClone = _.cloneDeep(startMode(lang_dir, tools))
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
    props.changeLangSelectActivity,
  );
  const formPrivs = props.forms_privs_hash[getParam(props.location.search, 'no')];
  tools = toolsPriv(formPrivs, tools);
  return { tools };
}


