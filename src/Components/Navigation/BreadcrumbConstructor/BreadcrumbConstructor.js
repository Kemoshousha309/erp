import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Breadcrumbs } from '@mui/material';
import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { getRelatedIcon, iconMap } from '../../../Helpers/tree';
import { getParam } from '../../../Helpers/utilities';
import style from './BreadcrumbConstructor.module.scss';

class BreadcrumbConstructor extends PureComponent {
  render() {
    const {
      location, tree, lanState, maxItems,
    } = this.props;
    const formNo = getParam(location.search, 'no');
    const path = getPath(tree, formNo);
    return (
      <div className={style.container}>
        <Breadcrumbs maxItems={maxItems}>
          {path.map((i, index) => {
            if (i) {
              return (
                <div key={index}>
                  <FontAwesomeIcon icon={getRelatedIcon(i.form_no, iconMap)} />
                  <span>
                    {' '}
                    {parseInt(lanState) === 1 ? i.form_d_name : i.form_f_name}
                  </span>
                </div>
              );
            }
            return null;
          })}
        </Breadcrumbs>
      </div>
    );
  }
}

function getPath(tree, formNo) {
  const path = [];
  const pointsNums = [formNo[0], formNo[0] + formNo[1], formNo];
  pointsNums.forEach((i) => {
    path.push(tree[i]);
  });
  return path;
}

const mapStateToProps = (state) => ({
  tree: state.auth.authData.raw_tree_hash,
  lanState: state.lang.lan,
});

export default connect(mapStateToProps, null)(BreadcrumbConstructor);
