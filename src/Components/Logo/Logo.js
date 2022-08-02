import React from 'react';
import style from './Logo.module.scss';
import logo from '../../Assets/logo.png';
import Aux from '../../hoc/Aux';

function Logo(props) {
  // console.log("Logo render")
  return (
    <Aux>
      <div className={style.Logo}>
        <img src={logo} alt="logo" />
        <p>Experts Vision</p>
      </div>

    </Aux>
  );
}

export default Logo;
