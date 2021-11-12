import React from "react";
import style from "./TreeNode.module.scss";
import {
  getRelatedIcon,
  iconMap,
  treehandler,
  getRelatedRoute,
  routeMap,
} from "../../../utilities/tree";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Aux from "../../../hoc/wrap";
import { getAvialableValue, t } from "../../../utilities/lang";

const TreeNode = (props) => {
  let children = null;
  if (props.children) {
    children = props.children.map((ele) => {
      let key = ele.form_no;
      if (props.thisK.state.treeInfo) {
        key = ele[props.thisK.state.treeInfo.nodeIdentifier];
      }
      const icon = getRelatedIcon(ele.form_no, iconMap);
      const route = getRelatedRoute(ele.form_no, routeMap);
      if (ele.children && ele.children.length > 0) {
        return (
          <TreeNode
            thisK={props.thisK}
            history={props.history}
            route={route}
            lang={props.lang}
            lanTable={props.lanTable}
            sideNavClick={props.sideNavClick}
            sideNavActivity={props.sideNavActivity}
            key={key}
            icon={icon}
            config={ele}
            children={ele.children}
          />
        );
      } else {
        return (
          <TreeNode
            thisK={props.thisK}
            history={props.history}
            route={route}
            lang={props.lang}
            lanTable={props.lanTable}
            sideNavClick={props.sideNavClick}
            sideNavActivity={props.sideNavActivity}
            key={key}
            icon={icon}
            config={ele}
          />
        );
      }
    });
  }

  let output = null;
  if (props.thisK.state.treeInfo) {
    const {
      treeLables: { d, f },
      propToAddToLabel,
      delimiter,
      contain
    } = props.thisK.state.treeInfo;
    
    output = getAvialableValue(props.config[d], props.config[f], props.lang)
    if(propToAddToLabel){
      output = output + delimiter + contain(props.config[propToAddToLabel])
    }
  } else {
    output =
      parseInt(props.lang) === 1
        ? props.config.form_d_name
        : props.config.form_f_name;
    if (!props.config.form_d_name) {
      output = t(props.config.label_code, props.lanTable, props.lang);
    }
  }
  const itemContent = (
    <i>
      <FontAwesomeIcon icon={props.icon} /> {output}{" "}
    </i>
  );
  const itemClick = (e) => {
    props.thisK.treeNodeClick(props.config);
    treehandler(e);
  };
  return (
    <Aux>
      <li className={style.itemNode} onClick={itemClick}>
        {itemContent}
      </li>
      <ul className="d-none">{children}</ul>
    </Aux>
  );
};

export default TreeNode;
