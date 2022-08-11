import React, { memo } from 'react';
import { connect } from 'react-redux';
import Tool from './Tool/Tool';
import style from './Tools.module.scss';

function Tools(props) {
//   console.log(props.tools);
  let tools = null;
  if (props.tools) {
    tools = props.tools.map((tool) => (
      <Tool
        clicked={props.clicked}
        key={tool.name}
        state={tool.state}
        type={tool.name}
        onMode={tool.onMode}
      />
    ));
  }
  return <ul className={[style.Tools].join(' ')}>{tools}</ul>;
}

const mapStateToProps = (state) => ({
  lanState: state.lang.lan,
});

export default connect(mapStateToProps, null)(memo(Tools));
