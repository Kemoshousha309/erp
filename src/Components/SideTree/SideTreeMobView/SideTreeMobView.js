import React from 'react';
import style from './SideTreeMobView.module.scss';
import logo from '../../../Assets/logo.png';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Tree from '../Tree/Tree';

function SideTreeMobView(props) {
  // console.log("SideTreeMobView render")
  let display;
  display = props.SideTreeMobView ? 'block' : 'none';
  return (
    <>
      <Backdrop show={props.SideTreeMobView} click={props.clicked} />
      <div style={{ display }} className={style.SideTreeMobView}>
        <div>
          <span>
            <img className={style.sideImgLogo} alt="logo" src={logo} />
            Experts Vision
          </span>
          <Tree sideNavActivity={props.SideTreeMobView} />
        </div>
      </div>
    </>
  );
}

export default SideTreeMobView;
