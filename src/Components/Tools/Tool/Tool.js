import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { connect } from 'react-redux';
import { Tooltip } from '@mui/material';
import style from './Tool.module.scss';
import { getSelectLangDir } from '../../../Helpers/lang';
import { getRelatedIcon } from '../../../Helpers/tools';

function Tool(props) {
  // console.log("Tool render")
  const [icon, toolTip] = getRelatedIcon(props.type, props.lanTable, props.lanState, getSelectLangDir(props.languages, props.lanState));
  let onMode = null;
  if (props.onMode) {
    onMode = style.onMode;
  }
  const state = props.state ? [style.active, style[props.type], onMode].join(' ') : style.inactive;
  let tool = null;
  if (!props.state) {
    tool = (
      <button disabled={!props.state} onClick={() => props.clicked(props.type)}>
        <FontAwesomeIcon icon={icon} />
      </button>
    );
  } else {
    tool = (
      <Tooltip title={toolTip} arrow placement="bottom" enterDelay={800}>
        <button disabled={!props.state} onClick={() => props.clicked(props.type)}>
          <FontAwesomeIcon icon={icon} />
        </button>
      </Tooltip>
    );
  }
  return (
    <li className={[style.Tool, state].join(' ')}>
      {tool}
    </li>
  );
}

const mapStateToProps = (state) => ({
  lanState: state.lang.lan,
  lanTable: state.lang.langTables,
  languages: state.lang.langInfo,
});

export default connect(mapStateToProps, null)(Tool);
