import { CircularProgress } from '@mui/material';
import _ from 'lodash';
import { PureComponent } from 'react';
import style from './style.module.scss';
import { addIcon, tableBody, tableHead } from './Utilities';
import TabPanel  from '../../../Components/UI/TabPanel/TabPanel';

class DetailsPanel extends PureComponent {
  render() {
    const {
      props: {
        lanState,
        lanTable,
        navigateTabsHandler,
        current_tab,
        details: { loading, tabs, type },
        mode,
        record,
        detailsAddHandler,
        detailsRemoveHandler,
        detailsInputChangeHandler,
      },
    } = this;

    const tab = tabs[current_tab];
    const { headers, viewOnly, addState } = tab;
    const properties = Object.keys(tabs).map(
      (key) => tabs[key].recordDetailPropName,
    );
    let details_exist = false;
    if (record) {
      details_exist = properties.reduce(
        (accum, cur) => record[cur] || accum,
        false,
      );
    }


    let output = null;

    output = loading ? (
      <div className={style.loaderContainer}>
        <CircularProgress />
      </div>
    ) : null;

    if (details_exist || mode === 'add') {
      output = (
        <div className={style.container}>
          <div className={style.header}>
            {addIcon(viewOnly, mode, detailsAddHandler, addState)}
          </div>
          <div id="detailsTableContainer" className={style.tableContainer}>
            <table className="table">
              {tableHead(headers, lanTable, lanState)}
              {tableBody(
                type,
                tabs,
                current_tab,
                record,
                lanState,
                mode,
                detailsRemoveHandler,
                detailsInputChangeHandler,
              )}
            </table>
          </div>
        </div>
      );
    }
    return (
      <TabPanel
        lanState={lanState}
        lanTable={lanTable}
        tabs={tabs}
        current_tab={current_tab}
        changeHandler={(value) => navigateTabsHandler(value)}
      >
        {output}
      </TabPanel>
    );
  }
}


export const RenderDetails = ({screen}) => {
  const {
    state: { details, record, mode },
    props: { lanState, lanTable },
    navigateTabsHandler,
    detailsRemoveHandler,
    detailsAddHandler,
    detailsInputChangeHandler,
  } = screen;
  if(!details) return null;
  return (details.show
    ? (
      <DetailsPanel
        lanState={lanState}
        lanTable={lanTable}
        current_tab={details.current_tab}
        details={details}
        record={_.clone(record)}
        mode={mode}
        navigateTabsHandler={navigateTabsHandler}
        detailsAddHandler={detailsAddHandler}
        detailsRemoveHandler={detailsRemoveHandler}
        detailsInputChangeHandler={detailsInputChangeHandler}
      />
    ) : null
  );
}

export function initDetails() {
  const {
    state: { details, record, mode },
    props: { lanState, lanTable },
    navigateTabsHandler,
    detailsRemoveHandler,
    detailsAddHandler,
    detailsInputChangeHandler,
  } = this;

  return (details.show
    ? (
      <DetailsPanel
        lanState={lanState}
        lanTable={lanTable}
        current_tab={details.current_tab}
        details={details}
        record={_.clone(record)}
        mode={mode}
        navigateTabsHandler={navigateTabsHandler}
        detailsAddHandler={detailsAddHandler}
        detailsRemoveHandler={detailsRemoveHandler}
        detailsInputChangeHandler={detailsInputChangeHandler}
      />
    ) : null
  );
}
