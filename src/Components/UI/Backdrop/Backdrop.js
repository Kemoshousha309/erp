import React from 'react';
import style from './Backdrop.module.scss';

function Backdrop(props) {
  return props.show ? (
    <div
      style={{ opacity: props.opacity }}
      className={style.Backdrop}
      onClick={props.click}
    />
  ) : null;
}

export default Backdrop;
