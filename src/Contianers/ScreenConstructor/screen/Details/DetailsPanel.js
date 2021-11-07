import { CircularProgress, createTheme } from "@material-ui/core";
import { Component } from "react";
import { connect } from "react-redux";
import TabPanel from "../../../../Components/UI/TabPanel/TabPanel";
import style from "./style.module.scss";
import { addIcon, tableBody, tableHead } from "./Utilities";


class DetailsPanel extends Component {
  render() {
    const {
      props: {
        lanState,
        lanTable,
        navigateTabsHandler,
        current_tab,
        details: { loading, tabs },
        mode,
        record,
        detailsAddHandler,
        detailsRemoveHandler,
        detailsInputChangeHandler,
      },
    } = this;

    const tab = tabs[current_tab];
    const { headers, viewOnly } = tab;
    const theme = createTheme({
      direction: parseInt(lanState) === 1 ? "rtl" : "ltr",
      typography: {
        fontSize: 20,
      },
    });

    const properties = Object.keys(tabs).map(
      (key) => tabs[key].recordDetailPropName
    );
    let details_exist = false;
    if (record) {
      details_exist = properties.reduce(
        (accum, cur) => record[cur] && accum,
        true
      );
    }

    let output = null;

    output = loading ? (
      <div className={style.loaderContainer}>
        <CircularProgress />
      </div>
    ) : null;

    if (details_exist || mode === "add") {
      output = (
        <div className={style.container}>
          <div className={style.header}>
            {addIcon(viewOnly, mode, detailsAddHandler)}
          </div>
          <div id="tableContainer" className={style.tableContainer}>
            <table className="table">
              {tableHead(headers, lanTable, lanState)}
              {tableBody(
                tab,
                theme,
                tabs,
                current_tab,
                record,
                lanState,
                mode,
                detailsRemoveHandler,
                detailsInputChangeHandler
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

const mapStateToProps = (state) => {
  return {
    lanState: state.lang.lan,
    lanTable: state.lang.langTables,
  };
};

export default connect(mapStateToProps, null)(DetailsPanel);