import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import style from './TreeView.module.scss';
import {
  getRelatedIcon,
  iconMap,
  getRelatedRoute,
  routeMap,
} from '../../Helpers/tree';
import TreeNode from './TreeNode/TreeNode';

class TreeView extends PureComponent {
  render() {
    const {
      tree, loading, thisK, lanState, lanTable, sideNavClick, sideNavActivity,
    } = this.props;
    let treeContent = loading;
    if (tree) {
      const content = tree.map((ele) => {
        let key = ele.form_no;
        if (thisK.state.treeInfo) {
          key = ele[thisK.state.treeInfo.nodeIdentifier];
        }
        const icon = getRelatedIcon(ele.form_no, iconMap);
        const route = getRelatedRoute(ele.form_no, routeMap);
        return (
          <TreeNode
            thisK={thisK}
            {...this.props}
            route={route}
            lang={lanState}
            lanTable={lanTable}
            sideNavClick={sideNavClick}
            sideNavActivity={sideNavActivity}
            key={key}
            icon={icon}
            config={ele}
            children={ele.children}
          />
        );
      });
      treeContent = <ul className={style.tree}>{content}</ul>;
    }

    return <div className={style.treeContainer}>{treeContent}</div>;
  }
}

const mapStateToProps = (state) => ({
  lanState: state.lang.lan,
  lanTable: state.lang.langTables,
  isAuthed: !(state.auth.authData == null),
});

export default connect(mapStateToProps, null)(TreeView);