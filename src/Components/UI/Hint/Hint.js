import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { faLightbulb } from '@fortawesome/free-regular-svg-icons';
import style from './Hint.module.scss';

function Hint(props) {
  return (
    <div className={style.container}>
      <div className={style.hint}>
        <span>
          <FontAwesomeIcon icon={faLightbulb} />
          {' '}
        </span>
        <p>{props.message}</p>
      </div>
    </div>
  );
}

export default Hint;
