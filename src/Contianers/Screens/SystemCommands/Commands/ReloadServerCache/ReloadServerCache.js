import React from "react";
import { connect } from "react-redux";
import { t } from "../../../../../utilities/lang";
import Command from "../../Command";


const ReloadServerCache = (props) => {
    const {
        lanTable,
        lanState,
        reloadServerCache
    } = props
  return (
    <Command excute={reloadServerCache}>
      <p>{t("reload_server_cash", lanTable, lanState)}</p>
    </Command>
  );
};

const mapStateToProps = (state) => {
  return {
    lanState: state.lang.lan,
    lanTable: state.lang.langTables,
  };
};

export default connect(mapStateToProps, null)(ReloadServerCache);
