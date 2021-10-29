import React from "react";
import { connect } from "react-redux";
import { t } from "../../../../../utilities/lang";
import Command from "../../Command";


const ReloadClientCache = (props) => {
    const {
        lanTable,
        lanState,
        reloadClientCache
    } = props
  return (
    <Command excute={reloadClientCache}>
      <p>{t("reload_client_cache", lanTable, lanState)}</p>
    </Command>
  );
};

const mapStateToProps = (state) => {
  return {
    lanState: state.lang.lan,
    lanTable: state.lang.langTables,
  };
};

export default connect(mapStateToProps, null)(ReloadClientCache);
