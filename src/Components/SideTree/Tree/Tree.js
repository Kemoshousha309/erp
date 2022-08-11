import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { CircularProgress } from '@mui/material';
import style from './Tree.module.scss';
import ParentNode from './ParentNode/ParentNode';
import { treeRequest } from '../../../Context';
import { getRelatedIcon, getRelatedRoute } from '../../../System/model/screen/handlers/tree';
import { ICON_MAP, ROUTE_MAP } from '../../../Constants/TREE';

class Tree extends PureComponent {
  render() {
    const padding = this.props.sideNavActivity
      ? { padding: '2rem' }
      : { padding: '1rem' };
    let treeContent = this.props.sideNavActivity ? (
      <CircularProgress className="m-5" />
    ) : (
      <CircularProgress className="mt-5" />
    );
    if (this.props.tree) {
      const tree = this.props.tree.map((ele) => {
        const icon = getRelatedIcon(ele.form_no, ICON_MAP);
        const route = getRelatedRoute(ele.form_no, ROUTE_MAP);
        if (ele.children && ele.children.length > 0) {
          return (
            <ParentNode
              {...this.props}
              route={route}
              lang={this.props.lanState}
              sideNavClick={this.props.sideNavClick}
              sideNavActivity={this.props.sideNavActivity}
              key={ele.form_no}
              icon={icon}
              config={ele}
              children={ele.children}
            />
          );
        }
        return null;
      });
      treeContent = (
        <ul style={padding} className={style.tree}>
          {tree}
        </ul>
      );
    }
    return <div className={style.treeContainer}>{treeContent}</div>;
  }
}

const mapStateToProps = (state) => ({
  lanState: state.lang.lan,
  isAuthed: !(state.auth.authData == null),
  tree: state.auth.authData.main_tree,
});

const mapDispatchToProps = (dispatch) => ({
  getTree: () => dispatch(treeRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Tree);
