import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import { Tooltip } from '@mui/material';
import style from './ParentNode.module.scss';
import {
  getRelatedIcon,
  getRelatedRoute,
  iconMap,
  routeMap,
  treeHandler,
} from '../../../../Helpers/tree';

function ParentNode(props) {
  // console.log("ParentNode render")
  let children = null;
  if (props.children) {
    children = props.children.map((ele) => {
      const icon = getRelatedIcon(ele.form_no, iconMap);
      const route = getRelatedRoute(ele.form_no, routeMap);
      if (ele.children && ele.children.length > 0) {
        return (
          <ParentNode
            history={props.history}
            route={route}
            lang={props.lang}
            sideNavClick={props.sideNavClick}
            sideNavActivity={props.sideNavActivity}
            key={ele.form_no}
            icon={icon}
            config={ele}
            children={ele.children}
          />
        );
      }
      return (
        <ParentNode
          history={props.history}
          route={route}
          lang={props.lang}
          sideNavClick={props.sideNavClick}
          sideNavActivity={props.sideNavActivity}
          key={ele.form_no}
          icon={icon}
          config={ele}
        />
      );
    });
  }

  const iconClick = props.sideNavActivity ? null : props.sideNavClick;
  const output = parseInt(props.lang) === 1
    ? props.config.form_d_name
    : props.config.form_f_name;
  let itemContent = null;
  const rootUrl = '/erp';
  if (props.route) {
    itemContent = (
      <NavLink className="d-flex" to={`${rootUrl}/${props.route}`}>
        <Tooltip
          enterDelay={800}
          title={props.sideNavActivity ? '' : output}
          arrow
          placement="right"
        >
          <i>
            <FontAwesomeIcon onClick={iconClick} icon={props.icon} />
            {' '}
          </i>
        </Tooltip>
        {props.sideNavActivity ? (
          <div title={output} className={style.output}>
            {' '}
            &nbsp;
            {output}
          </div>
        ) : null}
      </NavLink>
    );
  } else {
    itemContent = (
      <>
        <Tooltip
          enterDelay={800}
          title={props.sideNavActivity ? '' : output}
          arrow
          placement="right"
        >
          <i>
            <FontAwesomeIcon onClick={iconClick} icon={props.icon} />
            {' '}
          </i>
        </Tooltip>
        {props.sideNavActivity ? (
          <div title={output} className={style.output}>
            {' '}
            &nbsp;
            {output}
          </div>
        ) : null}
      </>
    );
  }

  return (
    <>
      <li className={style.itemNode} onClick={(e) => treeHandler(e, iconClick)}>
        {itemContent}
      </li>
      <ul className="d-none">{children}</ul>
    </>
  );
}

export default ParentNode;
