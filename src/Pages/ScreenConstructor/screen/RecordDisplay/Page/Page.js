import React, { PureComponent } from 'react';
import { getF } from '../../../../../Helpers/utilities';
import { t } from '../../../../../Languages/languages';
import style from './Page.module.scss';

class Page extends PureComponent {
  render() {
    const {
      props: {
        page, fields, recordClick, lanState, lanTable,
      },
    } = this;
    // page => is a list of records
    // fields => list of str or object{label, propName} to define the displayed fields
    // recordClick => is a record clicker handler
    const body = displayBody(page, fields, recordClick, lanState);
    const noMatch = (
      <div className={style.noMatch}>
        {t('no_match')}
      </div>
    );
    return (
      <div id="pageContianer" className={style.container}>
        <table className="table table-bordered text-center  table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              {displayHead(fields, lanTable, lanState)}
            </tr>
          </thead>
          <tbody>{body || noMatch}</tbody>
        </table>
      </div>
    );
  }
}


export default Page;

const displayHead = (fields, lanTable, lanState) => {
  const head = fields.map((fName, i) => {
    let output = t(getF(fName, 'label', lanState), lanTable, lanState);
    if (typeof output === 'string') {
      output = output.toUpperCase();
    }
    return (
      <th key={i} scope="col">
        {output}
      </th>
    );
  });
  return head;
};

const displayBody = (page, fields, recordClick, lang_no) => {
  let body = null;
  if (page) {
    body = page.map((ele, i) => (
      <tr key={i} onClick={(e) => recordClick(e, i, ele)}>
        <th scope="row">{i + 1}</th>
        {fields.map((f, i) => <td key={i}>{ele[getF(f, 'propName', lang_no)]}</td>)}
      </tr>
    ));
  }
  return body;
};
