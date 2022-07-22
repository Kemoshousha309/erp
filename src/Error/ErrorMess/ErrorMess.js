import React from 'react';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from './ErrorMess.module.scss';
import warning from '../../Assets/warning.png';

function ErrorMess(props) {
  return (
    <div className={style.container}>
      <h1>
        {props.message.toUpperCase()}
        {' '}
        <FontAwesomeIcon icon={faExclamationCircle} />
        {' '}
      </h1>
      <img src={warning} className="img-fluid" alt="warning" />
    </div>
  );
}

export default ErrorMess;
