import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./TreeNode.module.scss";
import { getAvailableValue, t } from "../../../Languages/languages";
import { getRelatedIcon, getRelatedRoute, treeHandler } from "../../../System/model/screen/handlers/tree";
import { ICON_MAP, ROUTE_MAP } from "../../../Constants/TREE";

function TreeNode(props) {
  let children = null;
  if (props.children) {
    children = props.children.map((ele) => {
      let key = ele.form_no;
      if (props.thisK.state.treeInfo) {
        key = ele[props.thisK.state.treeInfo.nodeIdentifier];
      }
      const icon = getRelatedIcon(ele.form_no, ICON_MAP);
      const route = getRelatedRoute(ele.form_no, ROUTE_MAP);
      if (ele.children && ele.children.length > 0) {
        return (
          <TreeNode
            thisK={props.thisK}
            history={props.history}
            route={route}
            lang={props.lang}
            lanTable={props.lanTable}
            key={key}
            icon={icon}
            config={ele}
            children={ele.children}
          />
        );
      }
      return (
        <TreeNode
          thisK={props.thisK}
          history={props.history}
          route={route}
          lang={props.lang}
          lanTable={props.lanTable}
          key={key}
          icon={icon}
          config={ele}
        />
      );
    });
  }

  let output = null;
  if (props.thisK.state.treeInfo) {
    const {
      treeLabels: { d, f },
      propToAddToLabel,
      delimiter,
      contain,
    } = props.thisK.state.treeInfo;

    output = getAvailableValue(props.config[d], props.config[f]);
    if (propToAddToLabel) {
      output = output + delimiter + contain(props.config[propToAddToLabel]);
    }
  } else {
    output =
      parseInt(props.lang) === 1
        ? props.config.form_d_name
        : props.config.form_f_name;
    if (!props.config.form_d_name) {
      output = t(props.config.label_code);
    }
  }
  const itemContent = (
    <i>
      <FontAwesomeIcon icon={props.icon} /> {output}{" "}
    </i>
  );
  const itemClick = (e) => {
    props.thisK.treeNodeClick(props.config);
    treeHandler(e);
  };
  return (
    <>
      <li className={style.itemNode} onClick={itemClick}>
        {itemContent}
      </li>
      <ul className="d-none">{children}</ul>
    </>
  );
}

export default TreeNode;
